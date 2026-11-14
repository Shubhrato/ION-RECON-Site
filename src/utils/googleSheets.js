// Utility to send lead form submissions directly to Google Sheet with Security & Anti-Spam Guards

// Default Google Apps Script URL
export const getSheetUrl = () => {
  return localStorage.getItem('CUSTOM_SHEET_URL') || "https://script.google.com/macros/s/AKfycbxwIjIV4D0OFmHVbLmla3iGFdJ1UDRoOrFu9_7JWksZ1C1h3uvIaPXsxquo-YBxOASN/exec";
};

export const setCustomSheetUrl = (url) => {
  if (url && url.trim()) {
    localStorage.setItem('CUSTOM_SHEET_URL', url.trim());
  }
};

/**
 * Sanitizes input to prevent Spreadsheet Formula Injection (=, +, -, @, etc.)
 */
export function sanitizeForSpreadsheet(val) {
  if (typeof val !== 'string') return '';
  const trimmed = val.trim();
  // If string starts with formula triggers (=, +, -, @, \t, \r), prepend an apostrophe ' so Sheets treats it as plain text
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return "'" + trimmed;
  }
  // Strip non-printable control characters
  return trimmed.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
}

/**
 * Validates Indian 10-digit mobile number
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  const digits = String(phone).replace(/\D/g, '');
  return /[6-9]\d{9}$/.test(digits);
}

/**
 * Client-Side Rate Limiter: 15 seconds cooldown per submission to stop form flooding
 */
const RATE_LIMIT_KEY = 'IONRECON_LAST_SUBMIT_TS';
const RATE_LIMIT_WINDOW_MS = 15000;

export function isRateLimited() {
  try {
    const last = sessionStorage.getItem(RATE_LIMIT_KEY);
    if (!last) return false;
    const diff = Date.now() - parseInt(last, 10);
    return diff < RATE_LIMIT_WINDOW_MS;
  } catch {
    return false;
  }
}

export function recordSubmission() {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
  } catch {}
}

/**
 * Sends lead data to Google Sheet endpoint with security guards
 */
export async function sendLeadToGoogleSheet(leadData) {
  // 1. Anti-Bot Honeypot Guard:
  // If hidden honeypot field is filled, silently ignore bot without consuming quotas
  if (leadData.company_website && String(leadData.company_website).trim() !== '') {
    console.warn('Bot submission blocked via Honeypot.');
    return { success: true, botBlocked: true };
  }

  // 2. Client-side Rate Limit Check:
  if (isRateLimited()) {
    return { success: false, rateLimited: true, error: 'Please wait a few seconds before submitting again.' };
  }

  const endpoint = getSheetUrl();

  // 3. Formula Injection Sanitization
  const payload = {
    timestamp: new Date().toLocaleString('en-IN'),
    name: sanitizeForSpreadsheet(leadData.name || ''),
    phone: sanitizeForSpreadsheet(leadData.phone || ''),
    email: sanitizeForSpreadsheet(leadData.email || ''),
    state: sanitizeForSpreadsheet(leadData.state || ''),
    capacity: sanitizeForSpreadsheet(leadData.capacity || ''),
    businessStage: sanitizeForSpreadsheet(leadData.businessStage || 'Planning New Setup'),
    budget: sanitizeForSpreadsheet(leadData.budget || ''),
    message: sanitizeForSpreadsheet(leadData.message || ''),
    source: sanitizeForSpreadsheet(leadData.source || 'Hero Lead Form')
  };

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    recordSubmission();
    return { success: true, payload, endpoint };
  } catch (error) {
    console.error('Google Sheets POST Error:', error);
    return { success: false, payload, error };
  }
}

/**
 * Google Apps Script snippet to paste inside Google Sheets (Extensions > Apps Script)
 */
export const GOOGLE_APPS_SCRIPT_CODE = `
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp || new Date(),
    data.name,
    data.phone,
    data.email,
    data.state,
    data.capacity,
    data.businessStage,
    data.budget,
    data.message,
    data.source
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
