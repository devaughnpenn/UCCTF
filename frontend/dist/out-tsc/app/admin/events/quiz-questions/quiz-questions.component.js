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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var wo_breadcrumbs_service_1 = require("@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service");
var meta_page_service_1 = require("@app/core/meta-page.service");
var api_admin_service_1 = require("@app/share/api-admin.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var wo_dialog_confirm_component_1 = require("@app/wo-module/wo-dialog/wo-dialog-confirm/wo-dialog-confirm.component");
var wo_dialog_service_1 = require("@app/wo-module/wo-dialog/wo-dialog.service");
var ng2_scroll_to_el_1 = require("ng2-scroll-to-el");
var QuizQuestionsComponent = /** @class */ (function () {
    function QuizQuestionsComponent(router, activeRoute, breadcrumbs, metaPage, api, woFlash, dialog, scrollService) {
        var _this = this;
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.metaPage = metaPage;
        this.api = api;
        this.woFlash = woFlash;
        this.dialog = dialog;
        this.scrollService = scrollService;
        this.loading = true;
        this.id = 0;
        this.quiz = [];
        this.questions = [];
        this.questionsBeforeChanges = [];
        this.newQuestion = {
            'show_description': 0,
            'description': null,
            'type': 0,
            'points': 0,
            'level': 1,
            'hover': false,
            'show': true,
            'add_to_library': false
        };
        this._newQuestionShow = false;
        this._newQuestionFromLibraryShow = false;
        this.newQuestionError = {};
        this.criteria = {
            defSort: '',
            sort: '',
        };
        this.STATUS_LABELS = [
            'Active',
            'Blocked',
            'Deleted',
        ];
        this.TYPES = [
            'Multiple choice',
            'Checkboxes',
            'Dropdown',
            'Open answer',
        ];
        this.onImageChanged = function (event, question, key) {
            if (event.result && event.result.file.id) {
                question['file_id'] = event.result.file.id;
            }
            else if (event.remove === true) {
                question['file_id'] = null;
            }
            if (key !== null) {
                _this.checkQuestionNeedUpdate(key);
            }
        };
        this.metaPage.setTitle('Questions');
    }
    Object.defineProperty(QuizQuestionsComponent.prototype, "newQuestionShow", {
        get: function () {
            return this._newQuestionShow;
        },
        set: function (value) {
            this._newQuestionShow = value;
            this._newQuestionFromLibraryShow = value ? false : this._newQuestionFromLibraryShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuizQuestionsComponent.prototype, "newQuestionFromLibraryShow", {
        get: function () {
            return this._newQuestionFromLibraryShow;
        },
        set: function (value) {
            this._newQuestionFromLibraryShow = value;
            this._newQuestionShow = value ? false : this._newQuestionShow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuizQuestionsComponent.prototype, "uploadImageSrc", {
        get: function () {
            return this.api.baseUrl + '/files/image?r=150x150&type=adaptive';
        },
        enumerable: true,
        configurable: true
    });
    QuizQuestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.parent.params.subscribe(function (parentParams) {
            _this.id = parseInt(parentParams['id'], 10) || 0;
            _this.getQuiz();
        });
    };
    QuizQuestionsComponent.prototype.getQuiz = function () {
        var _this = this;
        this.api.send('events/event-quizzes', { 'event_id': this.id }).then(function (res) {
            _this.quiz = res['row'];
            if (_this.quiz !== null) {
                _this.getQuestions();
            }
            else {
                _this.loading = false;
            }
        });
    };
    QuizQuestionsComponent.prototype.getQuestions = function () {
        var _this = this;
        this.api.send('quizzes/quiz-questions', { 'quiz_id': this.quiz['id'] }).then(function (res) {
            _this.questions = res['rows'];
            _this.questionsBeforeChanges = JSON.parse(JSON.stringify(_this.questions));
            _this.questions.forEach(function (el) {
                el['hover'] = false;
                el['need_update'] = false;
                el['show'] = true;
                el['answers'] = [];
            });
            _this.loading = false;
        });
    };
    QuizQuestionsComponent.prototype.addQuestion = function () {
        var _this = this;
        this.woFlash.hide();
        this.newQuestion['quiz_id'] = this.quiz['id'];
        this.api.send('quizzes/question', { 'id': 0 }, this.newQuestion).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    _this.newQuestionError = res['errors'];
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show('newQuestion');
                }, 100);
            }
            else {
                _this.newQuestionShow = false;
                _this.newQuestionError = {};
                _this.woFlash.addMessage('The operation was successfully done!');
                _this.woFlash.show();
                res['data']['show'] = true;
                res['data']['need_update'] = false;
                res['data']['answers'] = [];
                _this.questions.push(res['data']);
                _this.newQuestion = {
                    'show_description': 0,
                    'description': null,
                    'type': 0,
                    'points': 0,
                    'level': 1,
                    'hover': false,
                    'show': true,
                    'add_to_library': false,
                };
            }
        });
    };
    QuizQuestionsComponent.prototype.doUpdate = function (question) {
        var _this = this;
        this.woFlash.hide();
        this.api.send('questions/item', { 'id': question['id'] }, question).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    question['errors'] = res['errors'];
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show();
                }, 100);
            }
            else {
                question['errors'] = {};
                _this.woFlash.addMessage('The operation was successfully done!');
                _this.woFlash.show();
            }
        });
    };
    QuizQuestionsComponent.prototype.doUpdateAll = function () {
        var _this = this;
        this.woFlash.hide();
        this.api.send('questions/update-list', { 'quiz_id': this.quiz['id'] }, this.questions).then(function (res) {
            _this.questions.forEach(function (question) {
                question['errors'] = {};
                question['answers'].forEach(function (answer) {
                    answer['errors'] = {};
                });
            });
            var questionsWithError = [];
            if (res['errors']) {
                res['errors'].forEach(function (error) {
                    if (questionsWithError.indexOf(error['question_key']) == -1) {
                        questionsWithError.push(error['question_key']);
                        _this.woFlash.addError('Question #' + (error['question_key'] + 1));
                    }
                    if (error['answer_key'] !== undefined) {
                        _this.questions[error['question_key']]['answers'][error['answer_key']]['errors'] = error['answer_errors'];
                        _this.woFlash.addError(error['answer_errors']);
                    }
                    else {
                        _this.questions[error['question_key']]['errors'] = error['question_errors'];
                        _this.woFlash.addError(error['question_errors']);
                    }
                });
                _this.woFlash.show();
                var element = document.getElementById('question_' + questionsWithError[0]);
                _this.scrollService.scrollTo(element);
            }
            else {
                _this.woFlash.addMessage('The operation was successfully done!');
                _this.woFlash.show();
                _this.ngOnInit();
            }
            _this.questions.forEach(function (question, key) {
                if (questionsWithError.indexOf(key) == -1) {
                    question['need_update'] = false;
                }
            });
        });
    };
    QuizQuestionsComponent.prototype.doDeleteQuestion = function (i) {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to delete question?' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.api.send('questions/delete', { id: _this.questions[i]['id'] }, {}).then(function (res) {
                    //this.questions.splice(i, 1);
                    _this.questions = __spreadArrays(_this.questions.slice(0, i), _this.questions.slice(i + 1));
                });
            }
        });
    };
    QuizQuestionsComponent.prototype.checkPoints = function (question, key) {
        question['points'] = Math.round(question['points'] * 10) / 10;
        if (key !== null) {
            this.checkQuestionNeedUpdate(key);
        }
    };
    QuizQuestionsComponent.prototype.checkLevel = function (question, key) {
        question['level'] = parseInt(question['level'], 10);
        if (key !== null) {
            this.checkQuestionNeedUpdate(key);
        }
    };
    QuizQuestionsComponent.prototype.setQuestionAnswers = function (answers, question) {
        question['answers'] = answers;
    };
    QuizQuestionsComponent.prototype.checkQuestionNeedUpdate = function (key) {
        if (this.questionsBeforeChanges[key]['title'] != this.questions[key]['title'] ||
            this.questionsBeforeChanges[key]['show_description'] != this.questions[key]['show_description'] ||
            this.questionsBeforeChanges[key]['description'] != this.questions[key]['description'] ||
            this.questionsBeforeChanges[key]['type'] != this.questions[key]['type'] ||
            this.questionsBeforeChanges[key]['points'] != this.questions[key]['points'] ||
            this.questionsBeforeChanges[key]['level'] != this.questions[key]['level'] ||
            this.questionsBeforeChanges[key]['sequence'] != this.questions[key]['sequence']) {
            this.setQuestionNeedUpdate(true, this.questions[key], false);
        }
        else {
            this.setQuestionNeedUpdate(false, this.questions[key], false);
        }
    };
    QuizQuestionsComponent.prototype.setQuestionNeedUpdate = function (needUpdate, question, answersModified) {
        question['need_update'] = needUpdate;
        if (answersModified === true) {
            question['need_update_by_answers'] = needUpdate;
        }
        if (answersModified === false) {
            question['need_update_by_question'] = needUpdate;
        }
        if (question['need_update_by_answers'] === true || question['need_update_by_question'] === true) {
            question['need_update'] = true;
        }
    };
    QuizQuestionsComponent.prototype.moveDown = function (key) {
        var q = this.questions[key];
        var sequenceTemp = this.questions[key + 1]['sequence'];
        this.questions[key + 1]['sequence'] = q['sequence'];
        this.questions[key] = this.questions[key + 1];
        q['sequence'] = sequenceTemp;
        this.questions[key + 1] = q;
        this.checkQuestionNeedUpdate(key);
        this.checkQuestionNeedUpdate(key + 1);
    };
    QuizQuestionsComponent.prototype.moveUp = function (key) {
        var q = this.questions[key];
        var sequenceTemp = this.questions[key - 1]['sequence'];
        this.questions[key - 1]['sequence'] = q['sequence'];
        this.questions[key] = this.questions[key - 1];
        q['sequence'] = sequenceTemp;
        this.questions[key - 1] = q;
        this.checkQuestionNeedUpdate(key - 1);
        this.checkQuestionNeedUpdate(key);
    };
    QuizQuestionsComponent.prototype.addQuestionFromLibrary = function (data) {
        var _this = this;
        var q = data['question'];
        q['quiz_id'] = this.quiz['id'];
        q['library_question_id'] = data['question']['id'];
        q['is_library_question'] = 0;
        q['id'] = 0;
        q['answers'] = data['answers'];
        this.api.send('quizzes/question', { 'id': 0 }, q).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show();
                }, 100);
            }
            else {
                _this.woFlash.addMessage('The operation was successfully done!');
                _this.woFlash.show();
                res['data']['show'] = true;
                res['data']['need_update'] = false;
                res['data']['answers'] = [];
                var currentScrollTop_1 = document.documentElement.scrollTop;
                var currentScrollHeight_1 = document.documentElement.scrollHeight;
                _this.questions = __spreadArrays(_this.questions, [res['data']]);
                setTimeout(function () {
                    window.scrollTo(0, document.documentElement.scrollHeight - currentScrollHeight_1 + currentScrollTop_1);
                }, 100);
            }
        });
    };
    QuizQuestionsComponent = __decorate([
        core_1.Component({
            templateUrl: 'quiz-questions.component.html',
            styleUrls: ['quiz-questions.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            meta_page_service_1.MetaPageService,
            api_admin_service_1.ApiAdminService,
            wo_flash_service_1.WoFlashService,
            wo_dialog_service_1.WoDialogService,
            ng2_scroll_to_el_1.ScrollToService])
    ], QuizQuestionsComponent);
    return QuizQuestionsComponent;
}());
exports.QuizQuestionsComponent = QuizQuestionsComponent;
//# sourceMappingURL=quiz-questions.component.js.map