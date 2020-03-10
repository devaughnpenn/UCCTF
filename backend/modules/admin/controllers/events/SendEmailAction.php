<?php

namespace app\modules\admin\controllers\events;

use Yii;
use yii\base\Action;
use app\models\Teams;
use app\models\EventTeams;
use app\models\Users;
use app\models\TeamUsers;
use app\models\Events;
use yii\swiftmailer\Mailer;

class SendEmailAction extends Action
{
    /**
     * @inheritdoc
     */
    public function run()
    {
	$users = $this->getAllUsers();

            foreach ($users as $user) {
                if ($user['status'] === 'active') {
                    $emails[] = $user['email'];
                }
            }

            if (count($emails) > 0) {
                $host_info = parse_url(Yii::$app->getUrlManager()->getHostInfo());
                Yii::$app->mailer->compose()
                ->setFrom('no-reply@' . $host_info['host'])
                ->setTo($emails)
                ->setSubject('Welcome to the Ohio Cyber Range CTF')
		        ->setTextBody('Welcome to the Ohio Cyber Range Capture-the-Flag, also known as CTF! We are glad you are here.')
                ->setHtmlBody('Welcome to the <b>Ohio Cyber Range</b> Capture-the-Flag, also known as CTF! We are glad you are here.')
		        ->send();
            }

            return [
                'code'     => 200,
                'users'    => $users,
                'emails'   => $emails,
            ];
    }

    private function getAllUsers()
    {
	$query = Users::find()
			->select([
				'email' => 'users.email',
				'status' => 'users.status',
				'user' => 'users.username',
			])
			->asArray();

	return $query->asArray()->all();

    }
}
