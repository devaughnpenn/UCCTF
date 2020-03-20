<?php

namespace app\modules\admin\controllers\mail;

use Yii;
use yii\base\Action;
use app\models\Users;
use yii\swiftmailer\Mailer;


class SendEmailAction extends Action
{
     public function run()
     {
      $user_id = Yii::$app->request->post('users');
      $subject = Yii::$app->request->post('subject');
      $message = Yii::$app->request->post('message');
      $emails = '';

        $user = Users::findOne(['id' => $user_id]);
          if ($user['status'] === 'active')
           {
             $emails = $user['email'];
             $host_info = parse_url(Yii::$app->getUrlManager()->getHostInfo());
             Yii::$app->mailer->compose()
             ->setFrom('no-reply@' . $host_info['host'])
             ->setTo($emails)
             ->setSubject($subject)
             ->setTextBody($message)
             ->send();
           }
        return [
            'code'     => 200,
           'user'    => $user,
        ];

     return [
         'code' => 200,
     ];

     }
}