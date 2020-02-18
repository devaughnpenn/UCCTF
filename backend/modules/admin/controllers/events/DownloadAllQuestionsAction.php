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
class DownloadAllQuestionsAction extends Action
{
    /**
     * @inheritdoc
     */
    public function run()
    {
        $questions = $this->getAllQuestions();

        $data = [
            [
                ['value' => 'Challenges', 'colspan' => 10, 'style' => ['font-size' => 16, 'font-weight' => 'bold', 'color' => '#2196f3', 'height' => 20]],
            ]
        ];

        $data[] = [];

        $data[] = [
            ['value' => 'Title',  'style' => ['font-weight' => 'bold', 'width' => 10]],
            ['value' => 'Description',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Status',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'User ID',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Updater ID',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Created At',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Updated At',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Show Description',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Points',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Type',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'File ID',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Level',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Library Question ID',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Library Created From ID',  'style' => ['font-weight' => 'bold', 'width' => 25]],
            ['value' => 'Is Library Question?',  'style' => ['font-weight' => 'bold', 'width' => 25]],

        ];

        foreach ($questions as $question){
            $data[] = [
                ['value' => $question['title']],
                ['value' => $question['description']],
                ['value' => $question['status']],
                ['value' => $question['user_id']],
                ['value' => $question['updater_id']],
                ['value' => $question['created_at']],
                ['value' => $question['updated_at']],
                ['value' => $question['show_description']],
                ['value' => $question['points']],
                ['value' => $question['type']],
                ['value' => $question['file_id']],
                ['value' => $question['level']],
                ['value' => $question['library_question_id']],
                ['value' => $question['library_created_from_id']],
                ['value' => $question['is_library_question']],
            ];
        }


        (new Array2Xslsx(['Challenges' => $data]))->toDownload('AllCTFChallenges.xlsx');
    }

    private function getAllQuestions()
    {
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

        return $query->asArray()->all();
    }
}