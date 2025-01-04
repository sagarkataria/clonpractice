import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.RESEND_API_KEY) {
    console.log("Please provide a Resend API key");
    throw new Error('Please provide a Resend API key');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({sendTo,subject,html})=>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'Sagar <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
          });
          if (error) {
            return console.error({ error });
          }
          return data;
    } catch (error) {
        
    }
}
export default sendEmail;
