<?php

namespace app\modules\admin\controllers\events;

use Yii;
use yii\base\Action;
use app\models\EventTeams;
use app\models\TeamUsers;
use app\models\Teams;
use app\models\Events;
use app\models\Questions;
use app\models\Users;

use app\components\media\Array2Xslsx;

/**
 * @inheritdoc
 */
class DownloadAllUsersAction extends Action
{
    /**
     * @inheritdoc
     */
    public function run()
    {
        $users = $this->getAllUsers();

        $data = [
            [
                ['value' => 'Users', 'colspan' => 10, 'style' => ['font-size' => 16, 'font-weight' => 'bold', 'color' => '#2196f3', 'height' => 20]],
            ]
        ];

        $data[] = [];

        $data[] = [
            ['value' => 'ID',  'style' => ['font-weight' => 'bold', 'width' => 10]],
            ['value' => 'Username',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'First Name',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Last Name',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Email',  'style' => ['font-weight' => 'bold', 'width' => 30]],
            ['value' => 'Hashed Password',  'style' => ['font-weight' => 'bold', 'width' => 100]],
        ];

       foreach ($users as $user){
            $data[] = [
                ['value' => $user['id']],
                ['value' => $user['username']],
                ['value' => $user['first_name']],
                ['value' => $user['last_name']],
                ['value' => $user['email']],
                ['value' => $user['password']],
            ];
        }
        (new Array2Xslsx(['Users' => $data]))->toDownload('AllCTFUsers.xlsx');
    }

    private function getAllUsers()
    {
        
        $query = Users::find()
                    ->select([
                        'id'            => 'users.id',
                        'username'      => 'users.username',
                        'first_name'    => 'users.first_name',
                        'last_name'     => 'users.last_name',
                        'email'         => 'users.email',
                        'password'      => 'users.password',
                    ])
                    ->asArray();

        return $query->asArray()->all();

    }
}
