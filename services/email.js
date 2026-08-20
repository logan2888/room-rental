const axios = require('axios');

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const sendEmail = async ({ to, subject, html }) => {
  await axios.post(
    BREVO_API_URL,
    {
      sender: { name: 'Room Rental', email: 'rijankhatri536@gmail.com' },
      to: [{ email: to }],
      subject,
      htmlContent: html
    },
    {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    }
  );
};

const sendBookingConfirmation = async (toEmail, booking, room) => {
  const moveIn = new Date(booking.moveInDate).toLocaleDateString();
  const moveOut = new Date(booking.moveOutDate).toLocaleDateString();

  await sendEmail({
    to: toEmail,
    subject: `Booking Confirmed - ${room.title}`,
    html: `
      <h2>Your booking is confirmed!</h2>
      <p><strong>Room:</strong> ${room.title}</p>
      <p><strong>Address:</strong> ${room.location.address}, ${room.location.city}</p>
      <p><strong>Move-in:</strong> ${moveIn}</p>
      <p><strong>Move-out:</strong> ${moveOut}</p>
      <p><strong>Full Rent (monthly):</strong> Rs. ${booking.totalPrice}</p>
      <p><strong>Advance Paid:</strong> Rs. ${Math.round(room.pricePerMonth * (process.env.ADVANCE_PERCENT || 24) / 100)}</p>
      <p>Remaining rent to be paid directly to the owner upon move-in.</p>
      <p>Thank you for using Room Rental!</p>
    `
  });
};

const sendOwnerBookingNotification = async (ownerEmail, tenant, booking, room) => {
  const moveIn = new Date(booking.moveInDate).toLocaleDateString();
  const moveOut = new Date(booking.moveOutDate).toLocaleDateString();

  await sendEmail({
    to: ownerEmail,
    subject: `New Booking - ${room.title}`,
    html: `
      <h2>Your room has been booked!</h2>
      <p><strong>Room:</strong> ${room.title}</p>
      <p><strong>Move-in:</strong> ${moveIn}</p>
      <p><strong>Move-out:</strong> ${moveOut}</p>
      <hr>
      <h3>Tenant Details</h3>
      <p><strong>Name:</strong> ${tenant.name}</p>
      <p><strong>Email:</strong> ${tenant.email}</p>
      <p><strong>Phone:</strong> ${tenant.phone || 'Not provided'}</p>
      <p>Please contact the tenant to coordinate move-in details.</p>
    `
  });
};

const sendPasswordResetEmail = async (toEmail, resetLink) => {
  await sendEmail({
    to: toEmail,
    subject: 'Reset your Room Rental password',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `
  });
};

const sendInquiryEmail = async (ownerEmail, sender, room, message) => {
  await sendEmail({
    to: ownerEmail,
    subject: `New inquiry about "${room.title}"`,
    html: `
      <h2>You have a new inquiry!</h2>
      <p><strong>Room:</strong> ${room.title}</p>
      <hr>
      <p><strong>From:</strong> ${sender.name}</p>
      <p><strong>Email:</strong> ${sender.email}</p>
      <p><strong>Phone:</strong> ${sender.phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  });
};

module.exports = { sendBookingConfirmation, sendPasswordResetEmail, sendOwnerBookingNotification, sendInquiryEmail };