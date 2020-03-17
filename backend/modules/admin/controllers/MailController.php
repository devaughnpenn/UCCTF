<?php

namespace app\modules\admin\controllers;

use yii\filters\AccessControl;

class MailController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['access'] = [
            'class' => AccessControl::class,
            'rules' => [
                [
                    'allow' => true,
                    'roles' => ['admin'],
                ],
            ],
        ];

        return $behaviors;
    }

    public function actions()
    {
        return [
            'send-mail'         => 'app\modules\admin\controllers\mail\SendEmailAction',
            'find-email'        => 'app\modules\admin\controllers\mail\FindEmailAction',
        ];
    }
}