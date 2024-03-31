import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_SITE_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your Email',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          padding: 20px;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #17a2b8;
          color: #ffffff;
          padding: 10px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .content {
          padding: 20px;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #17a2b8;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #1391a8;
        }
        .footer {
          margin-top: 20px;
          padding: 10px;
          background-color: #f4f4f4;
          color: #888888;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Welcome to RoamerRadar!</h1>
        </div>
        <div class="content">
          <p>Thank you for signing up with us. Please confirm your email address to start exploring.</p>
          <a href="${confirmLink}" class="button">Confirm Email</a>
        </div>
        <div class="footer">
          If you did not request this email, please ignore it.
        </div>
      </div>
    </body>
    </html>
    `,
  });
};
