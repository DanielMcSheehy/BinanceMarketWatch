
var fetch = require("isomorphic-fetch");
const fs = require('fs');

module.exports = {
    /** 
     * @param {string} subject subject of email
     * @param {string} message email message
     */
    sendEmail: async (subject, message) => {
        let rawdata = fs.readFileSync('config.json');  
        let email_api_key = JSON.parse(rawdata).email_api_key;  
        var payload = {
            access_token: email_api_key,
            subject: subject, 
            text: message, 
        };

        try {
            const rawResponse = await fetch('https://postmail.invotes.com/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (rawResponse.status === 200) {
                console.log('Email Sent');
                return true 
            } else { 
                console.log('Email not sent!');
                return false
            }; 
        } catch (error) {
            console.log(error);
        }
    }
}