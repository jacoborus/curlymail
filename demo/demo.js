'use strict';

var account = require('./account.json'),
    curlymail = require('..');

// add an email account and connect it to its SMTP server
curlymail.addAccount( 'main', account );


// you can write doT templates in template fields
var template = {
    from:    '{{appname}}',
    to:      '{{username}} <' + account.to + '>',
    subject: 'testing curlymail',
    html:    '<html>You have <strong>{{messages.length}} messages</strong></html>',
    attachments: [
      {path:'./demo/file.zip', name:'renamed.zip'}
   ]
};

// add an email template with its key
curlymail.addTemplate('weekly', template );


// data to render the template
var data = {
    username: 'Neo',
    appname: 'curlymail co.',
    messages: [
        'New features next month',
        'Download from npm'
    ],
    _attachments: [
      {path:'./demo/file.zip', name:'renamed2.zip'}
   ]
};

curlymail.send( 'main', 'weekly', data, function (err, msg) {
    console.log( err || msg );
});
