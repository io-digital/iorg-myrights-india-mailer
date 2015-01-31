MyRights India Mandrill Mailer
==============================

> Please note that this is a temporary solution only meant for the prototype Beta. There are *no* anti-spam features.

Overview
--------

To send mail you have to do an `HTTP POST` (the only supported method) to one of the defined routes. 
The mailer will accept your posted params, email them and then redirect back to your app using an HTTP redirect.

The /ask route
--------------
This route has 3 required parameters (POSTed form-data):

* question - the question that is being asked
* redirect_success - the URL that we need to HTTP redirect back to when successfull
* redirect_error - used in case of validation errors

The /help route
---------------
This route accepts 4 paramaters:

* redirect_success - same as above and is required
* redurect_error - same as above and is required
* phone_number - required if there is no email
* email - required if there is no phone_number

