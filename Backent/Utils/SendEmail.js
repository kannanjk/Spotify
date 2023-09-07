"use strict";
import nodemailer from 'nodemailer'
import mailgen from 'mailgen';

export const sendEmail = async ({email}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'jishnukumbadam@gmail.com',
      pass: 'ompnbugufjopbwuw'
    }
  })
  const mailgenerator = new mailgen({
    theme: "default",
    product: {
      name: 'Mailgen',
      link: "https://mailgen.js/"
    }
  })

  const mail = mailgenerator.generate({
    body: {
      name: "tution",
      info: "your bill has arrived",
      table: {
        data: [
          {
            item: 'nodemailer stack book',
            description: "A backent app",
            price: "$10"
          }
        ]
      },
      outer: "lokking forword to busines"
    }
  })

  const a = await transporter.sendMail({
    from: "jishnukumbadam@gmail.com",
    to: email,
    subject: 'Place order',
    html: mail
  })
}

