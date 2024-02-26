const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY});
const fs = require("fs");
const Handlebars = require('handlebars');
const path = require('path');

exports.sendWelcomeEmail = async (user) => {
    console.log("preparing email");
    const testEmailTemplate = fs.readFileSync(path.resolve(__dirname, "templates/welcome.handlebars"), "utf-8");
    const template = Handlebars.compile(testEmailTemplate);
    console.log("template ready");

    try {
        await mg.messages.create('sandboxbba2338f871f463baafcee1bb5762c1f.mailgun.org', {
            from: 'Meower <meower@sandboxbba2338f871f463baafcee1bb5762c1f.mailgun.org>',
            to: user.email,
            subject:"Welcome to Meower",
            html: template({user})
        });
        console.log("email sent");
    }catch (e) {
        console.log(e.message)
    }
}