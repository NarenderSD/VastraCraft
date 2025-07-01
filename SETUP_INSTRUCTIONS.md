# Premium Tailoring Website Setup Instructions

## Google Sheets Integration Setup

### Step 1: Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the code from `scripts/google-sheets-setup.js`
4. Save the project with name "Silai Center Forms"

### Step 2: Deploy as Web App
1. Click "Deploy" > "New Deployment"
2. Choose "Web app" as type
3. Set execute as "Me"
4. Set access to "Anyone"
5. Click "Deploy"
6. Copy the Web App URL

### Step 3: Update Website Code
Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` in the following files with your Web App URL:
- `app/contact/page.tsx` (line 25)
- `app/booking/page.tsx` (line 95)
- `components/Newsletter.tsx` (line 20)

### Step 4: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Silai Center - Form Submissions"
3. The script will automatically create sheets for different form types

## WhatsApp Integration Setup

### Update WhatsApp Number
In `components/FloatingWhatsApp.tsx`, replace the phone number:
\`\`\`tsx
const whatsappNumber = "+919876543210" // Replace with actual number
\`\`\`

## Contact Information Setup

Update the following files with your actual business information:

### `components/Footer.tsx`
- Address
- Phone numbers
- Email addresses
- Business hours

### `app/contact/page.tsx`
- Business address
- Phone numbers
- Email addresses
- Google Maps embed URL

## Social Media Integration

### Update Social Media Links
In `components/Footer.tsx`, update the social media links:
\`\`\`tsx
<a href="https://facebook.com/yourpage" className="...">
<a href="https://instagram.com/yourhandle" className="...">
<a href="https://youtube.com/yourchannel" className="...">
\`\`\`

## Email Configuration

### Update Email Addresses
In `scripts/google-sheets-setup.js`, update:
\`\`\`javascript
const emailAddress = 'your-email@example.com'; // Replace with your email
\`\`\`

## SEO Configuration

### Update Metadata
In `app/layout.tsx`, update:
- Title
- Description
- Keywords
- Open Graph data

## Deployment Instructions

### Option 1: Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Option 2: Netlify
1. Push code to GitHub repository
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `out`

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload the `out` folder to your hosting provider

## Environment Variables (if needed)

Create `.env.local` file for sensitive data:
\`\`\`
GOOGLE_SCRIPT_URL=your_google_script_url
WHATSAPP_NUMBER=your_whatsapp_number
BUSINESS_EMAIL=your_business_email
\`\`\`

## Testing Checklist

- [ ] Contact form submissions go to Google Sheets
- [ ] Booking form submissions go to Google Sheets
- [ ] Newsletter signup works
- [ ] WhatsApp button opens correct number
- [ ] All contact information is correct
- [ ] Social media links work
- [ ] Website is responsive on all devices
- [ ] All images load properly
- [ ] Navigation works on all pages

## Maintenance

### Regular Tasks
1. Check Google Sheets for new submissions
2. Respond to contact forms within 24 hours
3. Update portfolio with new work
4. Add new blog posts regularly
5. Update pricing if needed

### Monthly Tasks
1. Review and respond to all inquiries
2. Update testimonials
3. Check website performance
4. Update business information if changed

## Support

For technical support or customization requests, contact the development team.

## Security Notes

1. Never share your Google Apps Script URL publicly
2. Regularly review form submissions for spam
3. Keep contact information updated
4. Monitor website performance and security

# Premium Tailoring Website – Setup Instructions

Welcome! Follow these steps to set up the project locally or for deployment.

## 1. Clone the Repository
```bash
git clone https://github.com/your-username/premium-tailoring-website.git
cd premium-tailoring-website
```

## 2. Install Dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```

## 3. Configure Environment Variables
- Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```
- Edit `.env` with your MongoDB, JWT, and Cloudinary details.

## 4. Run the Project Locally
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

## 5. Deploy
- Deploy to Vercel, Netlify, or your preferred platform.
- Set the same environment variables in your deployment dashboard.

## 6. Admin Access
- Register a new admin at `/admin/register`.
- Login at `/admin/login`.

---

For any issues, open an issue or contact the maintainer.
