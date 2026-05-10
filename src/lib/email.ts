import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVaultOtp = async (
  toEmail: string,
  otpCode: string,
  operatorHandle?: string,
) => {
  // A dark-mode, industrial HTML template for MonteLock
  const htmlContent = `
    <div style="font-family: 'Courier New', Courier, monospace; background-color: #03050d; color: #94A3B8; padding: 40px; text-align: center; border: 1px solid #1a1a1e;">
      <div style="max-w-md margin: 0 auto; background-color: #0B1020; padding: 30px; border: 1px solid rgba(16, 185, 129, 0.2);">
        <h2 style="color: #F8FAFC; text-transform: uppercase; letter-spacing: 2px; font-size: 14px; margin-bottom: 20px;">
          <span style="color: #10B981;">//</span> MonteLock
        </h2>

        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8;">
          Operator ${operatorHandle || "Identified"},
        </p>
        <p style="font-size: 12px; margin-bottom: 30px;">
          An authorization request was made to unlock your vault. Enter the cipher code below to proceed.
        </p>

        <div style="background-color: #050812; border: 1px solid rgba(255, 255, 255, 0.1); padding: 20px; font-size: 32px; color: #10B981; letter-spacing: 10px; font-weight: bold;">
          ${otpCode}
        </div>

        <p style="font-size: 10px; color: #64748B; margin-top: 30px; text-transform: uppercase;">
          If you did not request this, secure your perimeter immediately.<br/>
          Code expires in 15 minutes.
        </p>
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: "MonteLock <onboarding@resend.dev>",
      to: [toEmail],
      subject: "[MonteLock] Authorization Code",
      html: htmlContent,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to dispatch comm vector:", error);
    return { success: false, error };
  }
};
