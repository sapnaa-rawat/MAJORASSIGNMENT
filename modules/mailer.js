var nodemailer = require("nodemailer"); 
function sendingMail(email,pass){
var sender = nodemailer.createTransport({ 
service: 'gmail', 
auth: { 
	user: 'ankitprasad073@gmail.com', 
	pass: 'lowkeypseudo'
} 
}); 

var mail = { 
from: "ankitprasad073@gmail.com", 
to: email, 
subject: "Enrolled!", 
text: "Hello There! You have been enrolled in a Course, here's your password to login : "+pass,
/*attachments: [
    {
      filename: 'course.pdf',
      path:  'http://localhost:3000/public/uploads/final.pdf',
      cid: 'uniq-mailtrap.pdf' 
    }
  ]*/
}; 

sender.sendMail(mail, function(error, info) { 
if (error) { 
	console.log(error); 
} else { 
	console.log("Email sent successfully: "
				+ info.response); 
} 
}); 
}
module.exports={sendingMail};