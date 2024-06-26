const express = require("express");
const nodemailer = require("nodemailer");



// gmail setting for setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "mdaejazahmed0123@gmail.com",
      pass: "rxmruedevhepxifs",
    },
  });

// const transporter = nodemailer.createTransport({
//         host: "localhost",
//         port: 1025,
//         secure: false, // Use `true` for port 465, `false` for all other ports
//         // auth: {
//         //   user: "mdaejazahmed0123@gmail.com",
//         //   pass: "Aejaz@123",
//         // },
//       });


//   const mailOptions =  {
//     from: 'your_email@example.com',
//     to:"aejaz@gmail.com",
//     subject: "sending email using nodemailer",
//     // text: "next import mail from aejaz"
//     html : `
//     <style>
//       .email-container {
//         display: flex;
//         flex-direction: column;
//         width: 500px;
//         background-color: #f2f2f2;
//         padding: 20px;
//         border: 1px solid #ccc;
//         border-radius: 5px;
//       }
      
//       .email-subject {
//         font-size: 24px;
//         font-weight: bold;
//         margin-bottom: 10px;
//       }
      
//       .email-message {
//         font-size: 16px;
//         line-height: 1.5;
//         margin-bottom: 20px;
//       }
      
//       .email-sender {
//         font-size: 14px;
//         color: #777;
//         margin-top: 10px;
//       }
//     </style>
    
//     <div class="email-container">
//       <div class="email-subject">Today is Saturday, May 25, 2024</div>
//       <div class="email-message">
//         Hello there, this is a simple email message with CSS styles using React.
//       </div>
//       <div class="email-sender">Best, Your Name</div>
//     </div>
//   `
//   };


//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent:', info.response);
//       res.send('Email sent successfully');
//     }
//   });


  const app = express();
  app.use(express.urlencoded());

  app.get("/get-form",(req,res)=>{
    res.send(
        `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Form</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    form {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      width: 400px;
    }
    label {
      font-weight: bold;
    }
    input[type="email"],
    input[type="text"],
    textarea {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    textarea {
      height: 100px;
    }
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
  </head>
  <body>
  
  <form action="/send-email" method="post">
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" required><br>
    <label for="subject">Subject:</label><br>
    <input type="text" id="subject" name="subject" required><br>
    <label for="message">Message:</label><br>
    <textarea id="message" name="message" rows="4" required></textarea><br><br>
    <button type="submit">Send Email</button>
  </form>
  
  </body>
  </html>  
  `
    )
  })

 

  app.post("/send-email",(req,res)=>{
    const date = new Date();
    const mailOptions =  {
        from: 'your_email@example.com',
        to:req.body.email,
        subject: req.body.subject,
        // text: "next import mail from aejaz"
        html : `
        <style>
          .email-container {
            display: flex;
            flex-direction: column;
            width: 500px;
            background-color: #f2f2f2;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          
          .email-subject {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .email-message {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
          }
          
          .email-sender {
            font-size: 14px;
            color: #777;
            margin-top: 10px;
          }
        </style>
        
        <div class="email-container">
          <div class="email-subject">${date}</div>
          <div class="email-message">
           <h3> Hello there, this is a simple email message to learn how to used nodemailer in node js.</h3>
          </div>
          <div>
          <p>${req.body.message}</p></div>
          <div class="email-sender">Best, ${req.body.email}</div>
        </div>
      `
      };
    //   res.json({
    //     status :'success',
    //     Message :'mail is sent'
    //   })
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent:', info.response);
          res.json({
            status :'SUCCESS',
            message : 'Email sent successfully'
          });
        }
      });
  })



app.listen(8090,()=>{
    console.log("server is connected at the port 8090");
})