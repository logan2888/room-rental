const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingConfirmation = async (toEmail, booking, room) => {
  const moveIn = new Date(booking.moveInDate).toLocaleDateString();
  const moveOut = new Date(booking.moveOutDate).toLocaleDateString();

  await transporter.sendMail({
    from: `"Room Rental" <${process.env.EMAIL_USER}>`,
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

  await transporter.sendMail({
    from: `"Room Rental" <${process.env.EMAIL_USER}>`,
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
  await transporter.sendMail({
    from: `"Room Rental" <${process.env.EMAIL_USER}>`,
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

module.exports = { sendBookingConfirmation, sendPasswordResetEmail, sendOwnerBookingNotification };