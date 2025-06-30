// Google Apps Script code for handling form submissions
// This code should be deployed as a Google Apps Script Web App

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents)

    // Get the active spreadsheet (create one if it doesn't exist)
    let spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create("Silai Center - Form Submissions")
    }

    // Handle different types of form submissions
    if (data.type === "contact") {
      handleContactForm(spreadsheet, data)
    } else if (data.type === "booking") {
      handleBookingForm(spreadsheet, data)
    } else if (data.type === "newsletter") {
      handleNewsletterForm(spreadsheet, data)
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    console.error("Error:", error)
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
}

function handleContactForm(spreadsheet, data) {
  let sheet = spreadsheet.getSheetByName("Contact Forms")
  if (!sheet) {
    sheet = spreadsheet.insertSheet("Contact Forms")
    // Add headers
    sheet.getRange(1, 1, 1, 6).setValues([["Timestamp", "Name", "Phone", "Email", "Service", "Message"]])
  }

  // Add the data
  sheet.appendRow([data.timestamp, data.name, data.phone, data.email, data.service, data.message])

  // Send email notification (optional)
  sendEmailNotification("contact", data)
}

function handleBookingForm(spreadsheet, data) {
  let sheet = spreadsheet.getSheetByName("Bookings")
  if (!sheet) {
    sheet = spreadsheet.insertSheet("Bookings")
    // Add headers
    sheet
      .getRange(1, 1, 1, 15)
      .setValues([
        [
          "Timestamp",
          "Name",
          "Phone",
          "Email",
          "Address",
          "Service",
          "Sub-Service",
          "Urgency",
          "Appointment Type",
          "Preferred Date",
          "Preferred Time",
          "Alternate Date",
          "Alternate Time",
          "Special Requirements",
          "Estimated Price",
        ],
      ])
  }

  // Add the data
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.phone,
    data.email,
    data.address,
    data.service,
    data.subService,
    data.urgency,
    data.appointmentType,
    data.preferredDate,
    data.preferredTime,
    data.alternateDate,
    data.alternateTime,
    data.specialRequirements,
    data.estimatedPrice,
  ])

  // Send email notification
  sendEmailNotification("booking", data)
}

function handleNewsletterForm(spreadsheet, data) {
  let sheet = spreadsheet.getSheetByName("Newsletter")
  if (!sheet) {
    sheet = spreadsheet.insertSheet("Newsletter")
    // Add headers
    sheet.getRange(1, 1, 1, 2).setValues([["Timestamp", "Email"]])
  }

  // Check if email already exists
  const emails = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues()
  const emailExists = emails.some((row) => row[0] === data.email)

  if (!emailExists) {
    sheet.appendRow([data.timestamp, data.email])
  }
}

function sendEmailNotification(type, data) {
  const emailAddress = "your-email@example.com" // Replace with your email

  let subject, body

  if (type === "contact") {
    subject = "New Contact Form Submission - Silai Center"
    body = `
      New contact form submission:
      
      Name: ${data.name}
      Phone: ${data.phone}
      Email: ${data.email}
      Service: ${data.service}
      Message: ${data.message}
      
      Submitted at: ${data.timestamp}
    `
  } else if (type === "booking") {
    subject = "New Booking Request - Silai Center"
    body = `
      New booking request:
      
      Name: ${data.name}
      Phone: ${data.phone}
      Email: ${data.email}
      Service: ${data.service} - ${data.subService}
      Preferred Date: ${data.preferredDate}
      Preferred Time: ${data.preferredTime}
      Appointment Type: ${data.appointmentType}
      Estimated Price: ₹${data.estimatedPrice}
      
      Special Requirements: ${data.specialRequirements}
      
      Submitted at: ${data.timestamp}
    `
  }

  try {
    MailApp.sendEmail(emailAddress, subject, body)
  } catch (error) {
    console.error("Failed to send email:", error)
  }
}

// Function to get all bookings (for admin dashboard)
function getBookings() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName("Bookings")

  if (!sheet) return []

  const data = sheet.getDataRange().getValues()
  const headers = data[0]
  const rows = data.slice(1)

  return rows.map((row) => {
    const booking = {}
    headers.forEach((header, index) => {
      booking[header] = row[index]
    })
    return booking
  })
}

// Function to update booking status
function updateBookingStatus(timestamp, status) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName("Bookings")

  if (!sheet) return false

  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === timestamp) {
      // Add status column if it doesn't exist
      if (sheet.getLastColumn() < 16) {
        sheet.getRange(1, 16).setValue("Status")
      }
      sheet.getRange(i + 1, 16).setValue(status)
      return true
    }
  }

  return false
}
