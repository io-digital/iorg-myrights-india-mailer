MyRights India Mandrill Mailer
==============================

> Please note that this is a temporary solution only meant for the prototype Beta. There are *no* anti-spam features.

Overview
--------

To send mail you have to do an `HTTP POST` (the only supported method) to one of the defined routes. 
The mailer will accept your posted params, email them and then redirect back to your app using an HTTP redirect.

The /ask route
--------------
This route has 2 required parameters (POSTed form-data):

* question - the question that is being asked
* redirect_url - the URL that we need to HTTP redirect back to

The /help route
---------------
This route accepts 3 paramters:

* redirect_url - same as above and is required
* phone_number - not required
* email - not required