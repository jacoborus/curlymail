curlyMail
=========

Lightweight email server with mustache templates support for messages.

Rendering engine: **[Hogan.js](http://twitter.github.io/hogan.js/)**

Email driver: **[emailjs](https://github.com/eleith/emailjs#emailserverconnectoptions)**


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


Example:
--------

```js
var curlymail = require('curlymail');

// add a email account and connect it to its SMTP server
curlymail.addAccount( 'main', {
    user: 'username@domain.com',
    password: 'PA55W0RD'
});

// add an message template with mustaches
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

curlymail.send( 'main', 'weekly', data, function (err, msg) {
    console.log( err || msg );
});
```

