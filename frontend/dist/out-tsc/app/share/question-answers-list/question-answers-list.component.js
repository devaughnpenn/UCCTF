"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_admin_service_1 = require("@app/share/api-admin.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var wo_dialog_confirm_component_1 = require("@app/wo-module/wo-dialog/wo-dialog-confirm/wo-dialog-confirm.component");
var wo_dialog_service_1 = require("@app/wo-module/wo-dialog/wo-dialog.service");
var QuestionAnswersListComponent = /** @class */ (function () {
    function QuestionAnswersListComponent(woFlash, api, dialog) {
        var _this = this;
        this.woFlash = woFlash;
        this.api = api;
        this.dialog = dialog;
        this.answers = [];
        this.answersChanged = new core_1.EventEmitter();
        this.questionNeedUpdate = new core_1.EventEmitter();
        this.answersBeforeChanges = [];
        this.newAnswer = { is_correct: 0 };
        this.newAnswerShow = false;
        this.newAnswerError = {};
        this.criteria = {
            defSort: '',
            sort: '',
        };
        this.loadingAnswers = true;
        this.oldAnswersData = [];
        this.STATUS_LABELS = [
            'Active',
            'Blocked',
            'Deleted'
        ];
        this.onImageChanged = function (event, answer) {
            if (event.result && event.result.file.id) {
                answer['file_id'] = event.result.file.id;
            }
            else if (event.remove === true) {
                answer['file_id'] = null;
            }
            _this.setQuestionNeedUpdate();
        };
    }
    QuestionAnswersListComponent.prototype.ngOnInit = function () {
        this.getAnswers();
    };
    QuestionAnswersListComponent.prototype.getAnswers = function () {
        var _this = this;
        this.api.send('questions/answers', {
            question_id: this.questionId,
            sort: this.criteria.sort,
            defSort: this.criteria.defSort
        }).then(function (res) {
            if (res['data'] !== null) {
                _this.answers = res['rows'];
                _this.answersBeforeChanges = JSON.parse(JSON.stringify(_this.answers));
                _this.answersChanged.emit(_this.answers);
            }
            _this.loadingAnswers = false;
        });
    };
    QuestionAnswersListComponent.prototype.addAnswer = function () {
        var _this = this;
        this.woFlash.hide();
        this.newAnswer['question_id'] = this.questionId;
        console.log(this.newAnswer);
        this.api.send('questions/answer', { id: 0 }, this.newAnswer).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    _this.newAnswerError = res['errors'];
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show('question' + _this.questionId);
                }, 100);
            }
            else {
                _this.newAnswerShow = false;
                _this.newAnswerError = {};
                _this.woFlash.addMessage('The operation was successfully done!');
                _this.woFlash.show('question' + _this.questionId);
                _this.getAnswers();
                _this.newAnswer = { is_correct: 0 };
            }
        });
    };
    QuestionAnswersListComponent.prototype.doEditAnswer = function (answerKey) {
        this.oldAnswersData[answerKey] = Object.assign({}, this.answers[answerKey]);
        this.answers[answerKey]['edit'] = 1;
        this.answersChanged.emit(this.answers);
    };
    QuestionAnswersListComponent.prototype.doDeleteAnswer = function (row) {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to delete answer?' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.api.send('questions/delete-answer', { id: row.value['id'] }, {}).then(function (res) {
                    _this.answers.splice(row.key, 1);
                    _this.answersChanged.emit(_this.answers);
                });
            }
        });
    };
    QuestionAnswersListComponent.prototype.doUpdateAnswer = function (row) {
        var _this = this;
        this.woFlash.hide();
        this.api.send('questions/answer', { id: row.value['id'] }, row.value).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    row.value['errors'] = res['errors'];
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show('question' + _this.questionId);
                }, 100);
            }
            else {
                _this.answers[row.key]['edit'] = 0;
                _this.answersChanged.emit(_this.answers);
                _this.woFlash.addMessage('The operation was successfully done!');
                _this.woFlash.show('question' + _this.questionId);
            }
        });
    };
    QuestionAnswersListComponent.prototype.doCancelAnswer = function (answerKey) {
        this.answers[answerKey] = Object.assign({}, this.oldAnswersData[answerKey]);
        this.answers[answerKey]['edit'] = 0;
        this.answersChanged.emit(this.answers);
        this.oldAnswersData[answerKey] = {};
    };
    QuestionAnswersListComponent.prototype.sortByAnswer = function (event) {
        this.criteria.sort = event.current;
        this.getAnswers();
    };
    QuestionAnswersListComponent.prototype.setQuestionNeedUpdate = function () {
        if (JSON.stringify(this.answersBeforeChanges) == JSON.stringify(this.answers)) {
            this.questionNeedUpdate.emit(false);
        }
        else {
            this.questionNeedUpdate.emit(true);
        }
    };
    QuestionAnswersListComponent.prototype.moveDown = function (key) {
        var a = this.answers[key];
        var sequenceTemp = this.answers[key + 1]['sequence'];
        this.answers[key + 1]['sequence'] = a['sequence'];
        this.answers[key] = this.answers[key + 1];
        a['sequence'] = sequenceTemp;
        this.answers[key + 1] = a;
        this.setQuestionNeedUpdate();
    };
    QuestionAnswersListComponent.prototype.moveUp = function (key) {
        var a = this.answers[key];
        var sequenceTemp = this.answers[key - 1]['sequence'];
        this.answers[key - 1]['sequence'] = a['sequence'];
        this.answers[key] = this.answers[key - 1];
        a['sequence'] = sequenceTemp;
        this.answers[key - 1] = a;
        this.setQuestionNeedUpdate();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], QuestionAnswersListComponent.prototype, "questionId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], QuestionAnswersListComponent.prototype, "questionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuestionAnswersListComponent.prototype, "answers", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuestionAnswersListComponent.prototype, "answersChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuestionAnswersListComponent.prototype, "questionNeedUpdate", void 0);
    QuestionAnswersListComponent = __decorate([
        core_1.Component({
            selector: 'question-answers',
            templateUrl: 'question-answers-list.component.html',
            styleUrls: ['question-answers-list.component.css'],
        }),
        __metadata("design:paramtypes", [wo_flash_service_1.WoFlashService,
            api_admin_service_1.ApiAdminService,
            wo_dialog_service_1.WoDialogService])
    ], QuestionAnswersListComponent);
    return QuestionAnswersListComponent;
}());
exports.QuestionAnswersListComponent = QuestionAnswersListComponent;
//# sourceMappingURL=question-answers-list.component.js.map