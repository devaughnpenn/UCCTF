<?php

namespace app\modules\admin\controllers;

/**
 * @inheritdoc
 * this module is the controller for all mail api calls. this module 
 * routes different api calls to their respective backend folder.
 */
class MailController extends Controller
{
    public function actions()
    {
        return [
            'send-mail'         => 'app\modules\admin\controllers\mail\SendEmailAction',
            'find-email'        => 'app\modules\admin\controllers\mail\FindEmailAction',
        ];
    }
}