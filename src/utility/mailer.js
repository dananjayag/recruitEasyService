import nodemailer  from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import moment from 'moment';
import  uuid from 'uuid/v4';
import ical from  'ical-generator';
const  options = {
  service: 'SendGrid',
  auth: {
    api_key: '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'
  }
}

const cal = ical({
  domain: 'sebbo.net',
  prodId: {company: 'superman-industries.com', product: 'ical-generator'},
  name: 'My Testfeed',
  timezone: 'Europe/Berlin'
});

export const sendEmail = async ({cc, to, start, organizer,link, candidateName}) => {

  try {
    console.log({cc, to, start, organizer,link})
    let transporter = nodemailer.createTransport(sgTransport(options));

    var eventObj = {
      start: moment(start).format(),
      end: moment(start).add(1, 'hour').format(),
      summary: `Interview with ${cc}`,
      organizer: `${organizer} <${cc}>`,
      id : uuid(),
      method: 'request',
      location: `${link ? link : 'Call Organizer for exact location'}`,
    }
    
    const event = cal.createEvent(eventObj);
    const path = __dirname + '/uploads/'+ eventObj.id + '.ics';
    cal.saveSync(path);
    
  let mailOptions = {
    from: 'no-reply@recruitsimple.com', // sender address
    to: [to, cc], // list of receivers
    subject: `Interview Scheduled  with  ${candidateName}✔`, // Subject line
    text: "Looking forward to meeting you", // plain text body 
    attachments : [{path}]
};
    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch(err){
    return err;
  }
}