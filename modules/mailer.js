var nodemailer = require("nodemailer"); 
function sendingMail(email){
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
subject: "Sending Email using Node.js", 
text: "Hello There! You have been enrolled in a Course",
attachments: [
    {
      filename: 'course.pdf',
      path:  'public/uploads/course.pdf',
      cid: 'uniq-mailtrap.pdf' 
    }
  ]
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
