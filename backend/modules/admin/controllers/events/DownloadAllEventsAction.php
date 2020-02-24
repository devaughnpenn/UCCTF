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
class DownloadAllEventsAction extends Action
{
    /**
     * @inheritdoc
     */
    public function run()
    {
        $events = $this->getAllEvents();

        $data = [
            [
                ['value' => 'Events', 'colspan' => 10, 'style' => ['font-size' => 16, 'font-weight' => 'bold', 'color' => '#2196f3', 'height' => 20]],
            ]
        ];

        $data[] = [];

        $data[] = [
            ['value' => 'Name',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Created At',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Event Date',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Event Start Time',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Event End Time',  'style' => ['font-weight' => 'bold', 'width' => 30]],
            ['value' => 'Status',  'style' => ['font-weight' => 'bold', 'width' => 10]],
            ['value' => 'Description',  'style' => ['font-weight' => 'bold', 'width' => 50]],
            ['value' => 'Updated At',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'User ID',  'style' => ['font-weight' => 'bold', 'width' => 10]],
            ['value' => 'Updater ID',  'style' => ['font-weight' => 'bold', 'width' => 15]],
            ['value' => 'Created At',  'style' => ['font-weight' => 'bold', 'width' => 15]],
            ['value' => 'Group By Level',  'style' => ['font-weight' => 'bold', 'width' => 25]],

        ];


       foreach ($events as $event){
            $data[] = [
                ['value' => $event['name']],
                ['value' => $event['created_at']],
                ['value' => $event['event_date']],
                ['value' => $event['event_time_start']],
                ['value' => $event['event_time_end']],
                ['value' => $event['status']],
                ['value' => $event['description']],
                ['value' => $event['updated_at']],
                ['value' => $event['user_id']],
                ['value' => $event['updater_id']],
                ['value' => $event['group_by_level']],

            ];
        }

        (new Array2Xslsx(['Events' => $data]))->toDownload('AllCTFEvents.xlsx');
    }

    private function getAllEvents()
    {   
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

        return $query->asArray()->all();
    }
}