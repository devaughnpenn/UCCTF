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
class DownloadAllDataAction extends Action
{
    /**
     * @inheritdoc
     */
    public function run()
    {
        $users = $this->getAllData(1);
        $teams = Teams::findAll(1);
        $events = Events::findAll(1);
        $questions = Questions::findAll(1);

        $data = [
            [
                ['value' => 'CTF Data', 'colspan' => 10, 'style' => ['font-size' => 16, 'font-weight' => 'bold', 'color' => '#2196f3', 'height' => 20]],
            ]
        ];

        $data[] = [];

        $data[] = [
            ['value' => 'Users',  'style' => ['font-weight' => 'bold', 'width' => 11]],
            ['value' => 'Teams', 'style' => ['font-weight' => 'bold', 'width' => 11]],
            ['value' => 'Events', 'style' => ['font-weight' => 'bold', 'width' => 12]],
            ['value' => 'Challenges', 'style' => ['font-weight' => 'bold', 'width' => 14]],
        ];

       /* foreach ($users as $user){
            $data[] = [
                ['value' => $user['username']],
            ];
        }
        foreach ($teams as $team) {
            $data[] = [
                ['value' => $team['name']],
            ];
        }
        foreach ($events as $event){
            $data[] = [
                ['value' => $event['name']],
            ];
        }
        foreach ($questions as $question){
            $data[] = [
                ['value' => $question['title']],
            ];
        }*/


        (new Array2Xslsx(['AllCTFData' => $data]))->toDownload('AllCtfData.xlsx');
    }

    private function getAllData()
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
        
        $query = Teams::find()
                    ->select([
                        'id'             => 'teams.id',
                        'name'           => 'teams.name',
                    ])
                    ->asArray();
        
        $query = Events::find()
                    ->select([
                        'name'              => 'events.name',
                        'created_at'        => 'events.created_at',
                        'event_date'        => 'events.event_date',
                        'event_time_start'  => 'events.event_time_start',
                        'event_time_end'    => 'events.event_time_end',
                        'status'            => 'events.status',
                        'description'       => 'events.description',
                        'updated_at'        => 'events.updated_at',
                        'user_id'           => 'events.user_id',
                        'updater_id'        => 'events.updater_id',
                        'group_by_level'    => 'events.group_by_level',

                    ])
                    ->asArray();

        $query = Questions::find()
                    ->select([
                        'title'                     => 'questions.title',
                        'description'               => 'questions.description',
                        'status'                    => 'questions.status',
                        'user_id'                   => 'questions.user_id',
                        'updater_id'                => 'questions.updater_id',
                        'created_at'                => 'questions.created_at',
                        'updated_at'                => 'questions.updated_at',
                        'show_description'          => 'questions.show_description',
                        'points'                    => 'questions.points',
                        'type'                      => 'questions.type',
                        'file_id'                   => 'questions.file_id',
                        'level'                     => 'questions.level',
                        'library_question_id'       => 'questions.library_question_id',
                        'library_created_from_id'   => 'questions.library_created_from_id',
                        'is_library_question'       => 'questions.is_library_question',
                    ])
                    ->asArray();

       // $query->orderBy(['users.username' => SORT_ASC]);

        return $query->asArray()->all();
    }
}
