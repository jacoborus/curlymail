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


