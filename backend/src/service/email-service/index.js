const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const Handlebars = require('handlebars');
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '784d521cc214c70bad54110ec82ba900-408f32f3-1158ccdd'});
const fs = require('fs');
const path = require('path');

exports.sendWelcomeEmail = async (user) => {
    console.log("Preparing email");
    const emailTemplate = fs.readFileSync(path.resolve(__dirname, "templates/welcome.handlebars"), "utf-8");
    const template = Handlebars.compile(emailTemplate);
    console.log("Template ready");

    try {
        await mg.messages.create('sandboxbba2338f871f463baafcee1bb5762c1f.mailgun.org', {
            from: 'Meower <mailgun@sandboxbba2338f871f463baafcee1bb5762c1f.mailgun.org>',
            to: user.email,
            subject: 'Welcome to Meower!',
            html: template({user})
        });
        console.log("email sent");
    } catch (e) {
        console.log(e.message)
    }

}