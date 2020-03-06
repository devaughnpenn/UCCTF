<?php

namespace app\modules\admin\controllers\events;

use Yii;
use yii\base\Action;
use yii\swiftmailer\Mailer;

class SendEmailAction extends Action
{

public function run()
{
 try {
    // Create the SMTP Transport
    $transport = \Swift_SmtpTransport::newInstance('smtp.mailtrap.io', 2525)
        ->setUsername('729c9d3d03791a')
        ->setPassword('656db6add69b88');
 
    // Create the Mailer using your created Transport
    $mailer = \Swift_Mailer::newInstance($transport);
 
    // Create a message
    $message = \Swift_Message::newInstance();
 
    // Set a "subject"
    $message->setSubject('Demo message using the SwiftMailer library.');
 
    // Set the "From address"
    $message->setFrom(['reillytr@mail.uc.edu' => 'sender name']);
 
    // Set the "To address" [Use setTo method for multiple recipients, argument should be array]
    $message->addTo('reillytr@mail.uc.edu','recipient name');
 
    // Add "CC" address [Use setCc method for multiple recipients, argument should be array]
    //$message->addCc('recipient@example.com', 'recipient name');
 
    // Add "BCC" address [Use setBcc method for multiple recipients, argument should be array]
    //$message->addBcc('recipient@example.com', 'recipient name');
 
    // Add an "Attachment" (Also, the dynamic data can be attached)
    //$attachment = Swift_Attachment::fromPath('example.xls');
    //$attachment->setFilename('report.xls');
    //$message->attach($attachment);
 
    // Add inline "Image"
    //$inline_attachment = Swift_Image::fromPath('nature.jpg');
    //$cid = $message->embed($inline_attachment);
 
    // Set the plain-text "Body"
    $message->setBody("This is the plain text body of the message.\nThanks,\nAdmin");
 
    // Set a "Body"
    //$message->addPart('This is the HTML version of the message.<br>Example of inline image:<br><img src="'.$cid.'" width="200" height="200"><br>Thanks,<br>Admin', 'text/html');
 
    // Send the message
    $result = $mailer->send($message);
   }
   catch (Exception $e) {
      echo $e->getMessage();
   }

}

}
