//importing node mailer
const nm = require('nodemailer')
//configuring dotenv file 
require('dotenv').config();
//creating transport as node mailer object
const transport_node_mailer = nm.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
})
//exporting module in order to use in the other components 
module.exports =(payload)=>{
   
    transport_node_mailer.sendMail(payload,(err,info)=>{

        if(!err){
            console.log('email has been sent..')
        }
        else{
            console.log('error happened while sending email',err)
            console.log('info of email',info);
            return ;
        }
    })
}
