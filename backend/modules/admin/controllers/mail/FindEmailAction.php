<?php

namespace app\modules\admin\controllers\user;

use Yii;
use yii\base\Action;
use app\models\Users;

/**
 * @inheritdoc
 * this module may not be needed. Originally this module was for retrieving user emails. 
 * I may have found a way to do this in the send email module.
 */
class FindEmailAction extends Action
{
    /**
     * @inheritdoc
     */
    public function run()
    {
        $users = Yii::$app->request->post('users');
        $email = Yii::$app->request->post('email');

        foreach ($users as $user_id) {
            $user = Users::findOne(['username' => $username]);
            $user->email = $email;
            $user->save();
        }

        return [
            'code' => 200,
        ];
    }
}
