curlymail API
============


- [addTemplate](#addTemplate)
- [addAccount](#addAccount)
- [send](#send)

<a name="addTemplate"></a>
addTemplate( key, template )
------------------------------------------------------------

Add or overwrite a message template.
Curlymail use Hogan.js for template rendering.
**Parameters:**
- **key** *String*: template keyname
- **template** *Object*: mail template

Example:
```js
curlymail.addTemplate( 'welcomeMail', {
from: "{{appname}}",
to: "{{username}} <{{email}}>",
cc: "aperson@domain.com, otherperson@domain.com",
bcc: "hideperson@domain.com",
subject: "testing emailjs",
html:    "<html>You have <strong>{{messages.length}} messages</strong></html>",
text:    "You have {{messages.length}} messages",
attachments: [
{path:"./file.zip", name:"renamed.zip"}
]
});
```

<a name="addAccount"></a>
addAccount( key, data )
------------------------------------------------------------

Add an email account and connect it to its SMTP server
**Parameters:**
- **key** *String*: keyname
- **data** *Object*: account credentials

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


