// Utility to send lead form submissions directly to your own Google Sheet

// Default URL or Custom URL saved by user in website
export const getSheetUrl = () => {
  return localStorage.getItem('CUSTOM_SHEET_URL') || "https://script.google.com/macros/s/AKfycbxwIjIV4D0OFmHVbLmla3iGFdJ1UDRoOrFu9_7JWksZ1C1h3uvIaPXsxquo-YBxOASN/exec";
};

export const setCustomSheetUrl = (url) => {
  if (url && url.trim()) {
    localStorage.setItem('CUSTOM_SHEET_URL', url.trim());
  }
};

/**
 * Sends lead data to Google Sheet endpoint.
 * Works seamlessly with Google Apps Script Web App (doPost).
 */
export async function sendLeadToGoogleSheet(leadData) {
  const endpoint = getSheetUrl();

  const payload = {
    timestamp: new Date().toLocaleString('en-IN'),
    name: leadData.name || '',
    phone: leadData.phone || '',
    email: leadData.email || '',
    state: leadData.state || '',
    capacity: leadData.capacity || '',
    businessStage: leadData.businessStage || 'Planning New Setup',
    budget: leadData.budget || '',
    message: leadData.message || '',
    source: leadData.source || 'Hero Lead Form'
  };

  try {
    // Send data using fetch with no-cors for Google Apps Script redirects
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

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
