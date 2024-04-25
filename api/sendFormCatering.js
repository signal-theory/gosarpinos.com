import postmark from 'postmark';

export default async (req, res) => {
  const { store, ...formData } = req.body;

  // Determine the email address based on the selected store
  const email = req.body.store_email || 'us@gosarpinos.com';

  // Create a Postmark client
  let client = new postmark.ServerClient(process.env.NEXT_CATERING_POSTMARK_TOKEN);

  // Send email
  let response = await client.sendEmail({
    From: 'apps@signaltheory.com',
    To: email,
    Subject: 'New Catering Request Form Submission',
    TextBody: JSON.stringify(formData, null, 2),
  });

  res.status(200).json({ message: 'Email sent' });
};