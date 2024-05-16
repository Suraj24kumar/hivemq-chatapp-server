import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const from = process.env.RESEND_FROM || 'onboarding@resend.dev';

export const sendOTPEmail = async (to, otp) => {
  if (!process.env.RESEND_API_KEY) {
    const err = new Error('Resend not configured (missing RESEND_API_KEY)');
    console.error('[Email]', err.message);
    throw err;
  }
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: 'Verify your email - MERN Chat',
      html: `<p>Your verification code is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
    });
    if (error) throw new Error(error.message);
    console.log('[Email] OTP sent to', to);
  } catch (err) {
    console.error('[Email] Send failed:', err.message);
    throw err;
  }
};

export const sendPasswordResetEmail = async (to, otp) => {
  if (!process.env.RESEND_API_KEY) {
    const err = new Error('Resend not configured (missing RESEND_API_KEY)');
    console.error('[Email]', err.message);
    throw err;
  }
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: 'Reset your password - MERN Chat',
      html: `<p>Your password reset code is: <strong>${otp}</strong></p><p>It expires in 15 minutes.</p>`,
    });
    if (error) throw new Error(error.message);
    console.log('[Email] Password reset OTP sent to', to);
  } catch (err) {
    console.error('[Email] Send failed:', err.message);
    throw err;
  }
};
