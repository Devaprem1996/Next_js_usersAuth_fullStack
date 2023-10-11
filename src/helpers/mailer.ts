import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';  
import User from '@/models/userModel';



export async function sendEmail({ email, emailType, userId }: any) {
    
    try {
        
        // create a  hash token
        const hashToken = await bcryptjs.hash(userId.toString(), 10);
          // update the token to the database
       
          if (emailType === "verified") {
            await User.findByIdAndUpdate(userId,
               { verifiedToken: hashToken, verifiedExpires: Date.now() + 3600000 });
           
          }
          else if (emailType ===  "reset") {
            await User.findByIdAndUpdate(userId,
                { forgotpasswordToken: hashToken, forgotpasswordExpires: Date.now() + 3600000 });
            
        };
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILUSER,
              pass: process.env.MAILPASSWORD
            }
        });
        
        
        const mailOptions = {
            from: 'devaprem10@gmail.com',
            to: email,
            subject: emailType === "verified" ? "verify your email":"reset your password",
            html: `<p>Click
                <a href="${process.env.DOMAIN}/${emailType === 'verified'? "verifyemail":"resetpassword" }?token=${hashToken}">here</a>
                to
                 ${emailType === "verified" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser.
                <br>
                ${process.env.DOMAIN}/${emailType === 'verified'? "verifyemail":"resetpassword" }?token=${hashToken}
                </p>`
        }

         const mailresponse = await transport.sendMail(mailOptions);

     
        return mailresponse;


    
    } catch (error: any) {
        throw new Error(error.message);
    }
}