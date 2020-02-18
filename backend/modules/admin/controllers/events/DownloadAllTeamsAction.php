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
class DownloadAllTeamsAction extends Action
{
    /**
     * @inheritdoc
     */
    public function run()
    {
        $teams = $this->getAllTeams();

        $data = [
            [
                ['value' => 'Teams', 'colspan' => 10, 'style' => ['font-size' => 16, 'font-weight' => 'bold', 'color' => '#2196f3', 'height' => 20]],
            ]
        ];

        $data[] = [];

        $data[] = [
            ['value' => 'ID', 'style' => ['font-weight' => 'bold', 'width' => 11]],
            ['value' => 'Teams', 'style' => ['font-weight' => 'bold', 'width' => 25]],
        ];

       foreach ($teams as $team) {
            $data[] = [
                ['value' => $team['id']],
                ['value' => $team['name']],
            ];
        }

        (new Array2Xslsx(['Teams' => $data]))->toDownload('AllCTFTeams.xlsx');
    }

    private function getAllTeams()
    {
        
       $query = Teams::find()
                    ->select([
                        'id'             => 'teams.id',
                        'name'           => 'teams.name',
                    ])
                    ->asArray();

        return $query->asArray()->all();
    }
}