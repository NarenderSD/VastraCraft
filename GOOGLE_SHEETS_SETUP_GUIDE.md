# Google Sheets Integration - Step by Step Guide

## 📋 Complete Setup Instructions

### Step 1: Create Google Apps Script Project

1. **Open Google Apps Script**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"

2. **Replace Default Code**
   - Delete the default `myFunction()` code
   - Copy and paste the code from `scripts/google-sheets-setup.js`

3. **Save the Project**
   - Click the save icon (💾)
   - Name your project: "Silai Center Form Handler"

### Step 2: Deploy as Web App

1. **Click Deploy Button**
   - Click "Deploy" → "New deployment"

2. **Configure Deployment**
   - Type: Select "Web app"
   - Execute as: "Me (your-email@gmail.com)"
   - Who has access: "Anyone"

3. **Deploy**
   - Click "Deploy"
   - **IMPORTANT**: Copy the Web App URL (it looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 3: Update Website Code

Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` in these files with your Web App URL:

**File: `app/contact/page.tsx`** (around line 25)
\`\`\`typescript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec"
\`\`\`

**File: `app/booking/page.tsx`** (around line 95)
\`\`\`typescript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec"
\`\`\`

**File: `components/Newsletter.tsx`** (around line 20)
\`\`\`typescript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec"
\`\`\`

### Step 4: Create Google Spreadsheet

1. **Create New Spreadsheet**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Click "Blank" to create new spreadsheet
   - Name it: "Silai Center - Form Submissions"

2. **Get Spreadsheet ID**
   - Copy the spreadsheet ID from URL
   - URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

3. **Update Apps Script**
   - Go back to your Apps Script project
   - Find this line: `SpreadsheetApp.create("Silai Center - Form Submissions")`
   - Replace with: `SpreadsheetApp.openById("YOUR_SPREADSHEET_ID")`

### Step 5: Set Up Email Notifications

1. **Update Email Address**
   - In Apps Script, find: `const emailAddress = "your-email@example.com"`
   - Replace with your actual email address

2. **Test Email Function**
   - In Apps Script, click "Run" to test
   - Grant necessary permissions when prompted

### Step 6: Test the Integration

1. **Test Contact Form**
   - Go to your website's contact page
   - Fill out and submit the form
   - Check your Google Sheet for new data
   - Check your email for notification

2. **Test Booking Form**
   - Go to booking page
   - Complete the booking process
   - Verify data appears in spreadsheet

3. **Test Newsletter**
   - Subscribe to newsletter
   - Check spreadsheet for email entry

## 🔧 Troubleshooting

### Common Issues:

**1. "Script function not found" Error**
- Make sure you've saved the Apps Script project
- Redeploy the web app

**2. "Permission denied" Error**
- Run the script manually once in Apps Script editor
- Grant all requested permissions

**3. Forms not submitting**
- Check browser console for errors
- Verify the Web App URL is correct
- Make sure deployment is set to "Anyone" access

**4. No email notifications**
- Check spam folder
- Verify email address in script is correct
- Test email function manually in Apps Script

### Testing Checklist:

- [ ] Apps Script project created and saved
- [ ] Web app deployed with correct permissions
- [ ] Website code updated with correct URL
- [ ] Google Spreadsheet created and linked
- [ ] Email address updated in script
- [ ] Contact form test successful
- [ ] Booking form test successful
- [ ] Newsletter signup test successful
- [ ] Email notifications working

## 📊 Spreadsheet Structure

The script will automatically create these sheets:

1. **Contact Forms**
   - Timestamp, Name, Phone, Email, Service, Message

2. **Bookings**
   - Timestamp, Name, Phone, Email, Address, Service, Sub-Service, etc.

3. **Newsletter**
   - Timestamp, Email

## 🔒 Security Notes

- Never share your Web App URL publicly
- Keep your Google Apps Script project private
- Regularly check form submissions for spam
- Consider adding reCAPTCHA for additional security

## 📈 Advanced Features

### Add Form Validation:
\`\`\`javascript
// Add this to your Apps Script for validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
\`\`\`

### Add Auto-Response:
\`\`\`javascript
// Send confirmation email to customer
function sendConfirmationEmail(customerEmail, name) {
  const subject = "Thank you for contacting Silai Center";
  const body = `Dear ${name},\n\nThank you for your inquiry. We'll get back to you within 24 hours.\n\nBest regards,\nSilai Center Team`;
  MailApp.sendEmail(customerEmail, subject, body);
}
\`\`\`

## 🎯 Success Indicators

When everything is working correctly:
- Forms submit without errors
- Data appears in Google Sheets immediately
- Email notifications are received
- No console errors in browser
- Customers receive confirmation (if implemented)

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all URLs and IDs are correct
3. Test each component individually
4. Check Google Apps Script execution logs

Remember: The integration may take a few minutes to become active after deployment!
