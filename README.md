![curlyMail](https://raw.githubusercontent.com/jacoborus/curlymail/master/brand/curlymail.png 'curlyMail logo')
===============================================================================================================

Lightweight SMTP email server with mustache templates support for messages, it's built on top of [Hogan.js](http://twitter.github.io/hogan.js/) and [Emailjs](https://github.com/eleith/emailjs), and runs on Node.js

[curlymail.micronube.com](http://curlymail.micronube.com)


Usage example:
--------------

```js
var curlymail = require('curlymail');

// add a email account and connect it to its SMTP server
curlymail.addAccount( 'main', {
    user: 'username@domain.com',
    password: 'PA55W0RD'
});

// add a message template with mustaches
curlymail.addTemplate('weekly', {
    from:    "{{appname}}",
    to:      "{{username}} <{{email}}>",
    subject: "Testing curlyMail",
    html:    "<html>{{filename}} is ready for download</html>",
    attachments: [
        {path:"path/to/photo.jpg", name:"renames.jpg"}
   ]
});

// data to render the template
var data = {
    username: 'Mr. Code',
    email: 'curlymail@domain.com',
    appname: 'curlymail co.',
    filename: 'Timetable',
    // _attachments in render data will be added to message without being rendering
    _attachments: [
        {path:"path/to/file.zip", name:"timetable.zip"}
   ]
};

// send a message
curlymail.send( 'main', 'weekly', data, function (err, msg) {
    console.log( err || msg );
});
```


Installation
------------

```sh
npm install curlymail
```


Demo
----

Copy `demo/accountSample.json` in `demo/account.json` and add your mail account config to the new file. Then run:

```sh
npm run demo
```


curlymail API
============


- [addTemplate](#addTemplate)
- [addAccount](#addAccount)
- [send](#send)

<a name="addTemplate"></a>
addTemplate( key, template )
------------------------------------------------------------

Add or overwrite a message template.

**Parameters:**
- **key** *String*: template keyname
- **template** *Object*: mail template

Curlymail use Hogan.js for template rendering. Uses the [same headers Emailjs](https://www.npmjs.com/package/emailjs#message), but this adds the html message properly as an attached document and will generate text message from HTML if text not passed.

Example:
```js
curlymail.addTemplate( 'welcomeMail', {
    from: "{{appname}}", // required
    to: "{{username}} <{{email}}>", // required
    cc: "aperson@domain.com, otherperson@domain.com",
    bcc: "hideperson@domain.com",
    subject: "testing emailjs",
    html:    "<html>Hello {{username}}!</html>",
    text:    "Hello {{username}}!",
    attachments: [
        {path:"./file.zip", name:"renamed.zip"}
    ]
});
```

<a name="addAccount"></a>
addAccount( key, options )
------------------------------------------------------------

Add an email account and connect it to its SMTP server.
Same options as [Emailjs](https://www.npmjs.com/package/emailjs#emailserverconnectoptions)

**Parameters:**
- **key** *String*: keyname
- **options** *Object*: account credentials

Connection options:

- user: username for logging into smtp
- password: password for logging into smtp
- host: smtp host
- port: smtp port (if null a standard port number will be used)
- ssl: boolean or object {key, ca, cert} (if true or object, ssl connection will be made)
- tls: boolean or object (if true or object, starttls will be initiated)
- timeout: max number of milliseconds to wait for smtp responses (defaults to 5000)
- domain: domain to greet smtp with (defaults to os.hostname)

Example:
```js
curlymail.addAccount( 'main', {
    user: 'username@domain.com',
    password: 'PA55W0RD',
    host: 'smtp.gmail.com',
    ssl: true
});
```

<a name="send"></a>
send( account, template, data, callback )
------------------------------------------------------------

Send message from a mail account

**Parameters:**
- **account** *String*: account key
- **template** *String|Object*: template key or template object
- **data** *Object*: data for template rendering
- **callback** *Function*: Signature: err, message

Example:
```js
curlymail.send( 'mainAccount', 'welcomeMail', {}, function (err) {
    console.log( err || msg );
});
```

Note: `_attachments` field in data object will be added to message




Template rendering
------------------
See **[mustache](https://mustache.github.io/mustache.5.html)**


Email server connection and attachments options
-----------------------------------------------

See **[emailjs](https://github.com/eleith/emailjs#emailserverconnectoptions)**


Build docs
----------

```sh
npm run build-docs
```



<br><br>
---

© 2015 Jacobo Tabernero - [jacoborus](https://github.com/jacoborus)

Released under [MIT License](https://raw.github.com/jacoborus/curlymail/master/LICENSE)
