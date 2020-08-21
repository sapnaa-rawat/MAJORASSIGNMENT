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
subject: "Course Enrollment", 
text: "Hello There! You have been enrolled in a Course, here's your password to login : "+pass,
/*attachments: [
    {
      filename: 'course.png',
      path:  'public/uploads/course.png',
      cid: 'uniq-mailtrap.png' 
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
