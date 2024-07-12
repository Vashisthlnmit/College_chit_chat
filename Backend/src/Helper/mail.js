import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "scottie.friesen@ethereal.email",
    pass: "uxFQgsRAnSnFT3mAdw",
  },
});
export async function emailverificationmail(email,code) {
    try{
        const info = await transporter.sendMail({
            from: 'Collge_chit-chat.email', // sender address
            to: email, // list of receivers
            subject: "User Verification", // Subject line
            html:`<div>To complete your registration and verify your email address, please use the following One-Time Password ${code}:</div>`, 
          });
        
          console.log("Message sent: %s", info.messageId);
    }
    catch(error){
        console.log(error);
    }
}
export async function forgotpasswordverificationmail(email,code) {
    try{
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: "User Verification", // Subject line
            html:`<div>We received a request to reset the password for your account associated with this email address. To proceed with resetting your password, please use the following One-Time Password ${code}:</div>`, 
          });
        
          console.log("Message sent: %s", info.messageId);
    }
    catch(error){
        console.log(error);
    }
}

