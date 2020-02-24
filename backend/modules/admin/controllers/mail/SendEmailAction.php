<?php

namespace app\modules\admin\controllers\mail;

use Yii;
use yii\base\Action;
use app\models\Users;

/**
 * @inheritdoc
 * this module is the send email module. Should read in users, load their emails into an array, then send email.
 * !!!!!THIS DOES NOT WORK CURRENTLY!!!!!!
 */
 require_once 'vendor/autoload.php';

class SendEmailAction extends Action
{
    /**
     * @inheritdoc
     */
    public function run()
    {
        // Create the Transport
        //$transport = (new Swift_SmtpTransport('smtp.googlemail.com', 465, 'ssl'))
            ->setUsername('ohiocyberrangectf@gmail.com')
            ->setPassword('OhioCyber!Range@2020')
        ;
 
        // Create the Mailer using your created Transport
        //$mailer = new Swift_Mailer($transport);
        
        // Create a message
        //$body = 'Hello, <p>Email sent through <span style="color:red;">Swift Mailer</span>.</p>';
        
        //$message = (new Swift_Message('Email Through Swift Mailer'))
            ->setFrom(['ohiocyberrangectf@gmail.com' => 'Ohio Cyber Range CTF'])
            ->setTo(['penndj@mail.uc.edu'])
        //  ->setCc(['RECEPIENT_2_EMAIL_ADDRESS'])
         // ->setBcc(['RECEPIENT_3_EMAIL_ADDRESS'])
            ->setBody($body)
            ->setContentType('text/html')
        ;
        
        // Send the message
        //$result = $mailer->send($message);

        Yii::$app->mailer->compose()
            ->setFrom('Ohiocyberrangectf@gmail.com')
            ->setTo('penndj@mail.uc.edu')
            ->setSubject('Email sent from Yii2-Swiftmailer')
            ->setBody('Test')
            ->send();
    }
}