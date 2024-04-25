import postmark from 'postmark';

export default async (req, res) => {
  const { store, ...formData } = req.body;

  // Determine the email address based on the selected store
  let email;
  switch (store) {
    case 'store1':
      email = 'store1@example.com';
      break;
    case 'store2':
      email = 'store2@example.com';
      break;
    // Add more cases as needed
    default:
      email = 'default@example.com';
  }

  // Create a Postmark client
  let client = new postmark.ServerClient(process.env.NEXT_FOOTER_POSTMARK_TOKEN);

  // Send email
  let response = await client.sendEmail({
    From: 'apps@signaltheory.com',
    To: 'us@gosarpinos.com',
    Subject: 'New Email Newsletter Signup',
    TextBody: JSON.stringify(formData, null, 2),
  });

  res.status(200).json({ message: 'Email sent' });
};