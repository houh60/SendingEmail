const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const Email = require('..');

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: 'AIzaSyD0CbEFBld05_OS9xgzl9NVlGMkaViCMqw'
  })
);

const email = new Email({
  message: {
    from: 'test@example.com'
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport
});

email.send({
  template: 'mars',
  message: {
    to: 'williamhou38@yahoo.com'
  },
  locals: {
    name: 'Elon'
  }
})
  .then(console.log)
  .catch(console.error);


/* SmtpJS.com - v3.0.0 */
let Email = {
  send: function(a) {
    return new Promise(function(n, e) {
      a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; let t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function(e) { n(e) })
    })
  },

  ajaxPost: function(e, n, t) {
    let a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function() { let e = a.responseText; null != t && t(e) }, a.send(n)
  },

  ajax: function(e, n) {
    let t = Email.createCORSRequest("GET", e); t.onload = function() { let e = t.responseText; null != n && n(e) }, t.send()
  },

  createCORSRequest: function(e, n) {
    let t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
  }
};
