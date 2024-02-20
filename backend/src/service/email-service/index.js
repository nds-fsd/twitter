const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: '01e3c106a85da6f49f14c2dc8526ca89-408f32f3-6add9783'});
const fs = require("fs");
const Handlebars = require('handlebars');
const path = require('path');

exports.sendWelcomeEmail = async (user) => {
    console.log("preparing email");
    const testEmailTemplate = fs.readFileSync(path.resolve(__dirname, "templates/welcome.handlebars"), "utf-8");
    const template = Handlebars.compile(testEmailTemplate);
    console.log("template ready");

    try {
        await mg.messages.create('sandbox0430825f35df4764800ea3959f45b47b.mailgun.org', {
            from: 'Meower <meower@sandbox0430825f35df4764800ea3959f45b47b.mailgun.org>',
            to: user.email,
            subject:"Welcome to Meower",
            html: template({user})
        });
        console.log("email sent");
    }catch (e) {
        console.log(e.message)
    }
}