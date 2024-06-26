import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

import * as Templates from '@/app/lib/emailTemplates';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Extract data from the request body
        const data = req.body;
        let emailContent, emailSubject, emailManagerContent, emailManagerSubject;
        if (data.form == 'feedback') {
            emailContent = Templates.feedbackThankYouEmail(data);
            emailSubject = Templates.feedbackThankYouSubject();
            emailManagerContent = Templates.feedbackManagerEmail(data);
            emailManagerSubject = Templates.feedbackManagerSubject();
        } else {
            emailContent = Templates.cateringThankYouEmail(data);
            emailSubject = Templates.cateringThankYouSubject();
            emailManagerContent = Templates.cateringManagerEmail(data);
            emailManagerSubject = Templates.cateringManagerSubject();
        }
        
        try {
            //   Send the emails
            await sendgrid.send({
                to: data.email,
                from: process.env.SENDGRID_SENDER_EMAIL,
                subject: emailSubject,
                text: emailContent,
                html: emailContent.replace(/\n/g, "<br>")
            });

            await sendgrid.send({
                to: data.managers_email,
                from: process.env.SENDGRID_SENDER_EMAIL,
                subject: emailManagerSubject,
                text: emailManagerContent,
                html: emailManagerContent.replace(/\n/g, "<br>")
            });
        
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Error sending email' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}