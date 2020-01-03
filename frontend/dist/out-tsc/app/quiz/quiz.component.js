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
var router_1 = require("@angular/router");
var environment_1 = require("@env/environment");
var http_service_1 = require("@app/core/http.service");
var auth_service_1 = require("@app/auth/auth.service");
var wo_dialog_service_1 = require("@app/wo-module/wo-dialog/wo-dialog.service");
var message_before_submit_quiz_component_1 = require("@app/modal/message-before-submit-quiz/message-before-submit-quiz.component");
var quiz_paused_component_1 = require("@app/modal/quiz-paused/quiz-paused.component");
var quiz_finished_component_1 = require("@app/modal/quiz-finished/quiz-finished.component");
var quiz_socket_refresh_component_1 = require("@app/modal/quiz-socket-refresh/quiz-socket-refresh.component");
var quiz_not_started_component_1 = require("@app/modal/quiz-not-started/quiz-not-started.component");
var MAX_ATTEMPTS_TO_CONNECT = 300;
var QuizComponent = /** @class */ (function () {
    function QuizComponent(render, activeRoute, http, auth, router, dialog) {
        this.render = render;
        this.activeRoute = activeRoute;
        this.http = http;
        this.auth = auth;
        this.router = router;
        this.dialog = dialog;
        this.sideBarToggleStorageKey = '__sideBarToggleStorageKey';
        this.team = {};
        this.event = {};
        this.questions = [];
        this.data = {};
        this.loading = true;
        this.wsMaxCountAttemptsConnect = MAX_ATTEMPTS_TO_CONNECT;
        this.eventQuizStatuses = {
            'STATUS_NOT_STARTED': 0,
            'STATUS_ACTIVE': 1,
            'STATUS_PAUSED': 2,
            'STATUS_FINISHED': 3,
        };
        this.title = environment_1.environment.APP_NAME;
        this.environment = environment_1.environment;
        this.render.addClass(document.body, 'quiz-module');
    }
    QuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.hash = params['hash'];
            _this.getPage();
        });
    };
    QuizComponent.prototype.getPage = function () {
        var _this = this;
        this.http.send(this.environment.API_BASE_URL + '/quiz/quiz', {
            'hash': this.hash,
        }).then(function (res) {
            if (res['code'] === 200) {
                _this.team = res['team'];
                _this.event = res['event'];
                if (res['questions']) {
                    _this.setQuestions(res['questions']);
                }
                if (res['answers']) {
                    res['answers'].forEach(function (item) {
                        _this.setAnswersForQuestion(item);
                    });
                }
                _this.checkStatusEventQuiz(res['status']);
                _this.loading = false;
                _this.initSocket();
            }
        });
    };
    QuizComponent.prototype.logOut = function () {
        this.auth.logout();
        this.router.navigate(['/login']);
    };
    QuizComponent.prototype.isCompactSidebar = function () {
        return !!parseInt(localStorage.getItem(this.sideBarToggleStorageKey), 10);
    };
    QuizComponent.prototype.sidebarToggle = function () {
        localStorage.setItem(this.sideBarToggleStorageKey, this.isCompactSidebar() ? '0' : '1');
    };
    QuizComponent.prototype.isLogged = function () {
        return !this.auth.isGuest;
    };
    QuizComponent.prototype.ngOnDestroy = function () {
        this.render.removeClass(document.body, 'admin-module');
    };
    QuizComponent.prototype.scroll = function (el) {
        el.scrollIntoView();
    };
    QuizComponent.prototype.sendQuizAnswers = function () {
        var dialogRef = this.dialog.open(message_before_submit_quiz_component_1.MessageBeforeSubmitQuizComponent, { questions: this.questions });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
        });
    };
    QuizComponent.prototype.checkStatusEventQuiz = function (status) {
        this.statusEventQuiz = status;
        if (this.dialogPausedOn) {
            this.dialogPausedOn.close();
            this.dialogPausedOn = null;
        }
        if (this.statusEventQuiz === this.eventQuizStatuses.STATUS_PAUSED) {
            this.dialogPausedOn = this.dialog.open(quiz_paused_component_1.QuizPausedComponent, {});
        }
        if (this.dialogFinishedOn) {
            this.dialogFinishedOn.close();
            this.dialogFinishedOn = null;
        }
        if (this.statusEventQuiz === this.eventQuizStatuses.STATUS_FINISHED) {
            this.dialogFinishedOn = this.dialog.open(quiz_finished_component_1.QuizFinishedComponent, {});
        }
        if (this.dialogNotStarted) {
            this.dialogNotStarted.close();
            this.dialogNotStarted = null;
        }
        if (this.statusEventQuiz === this.eventQuizStatuses.STATUS_NOT_STARTED) {
            this.dialogNotStarted = this.dialog.open(quiz_not_started_component_1.QuizNotStartedComponent, {});
        }
    };
    QuizComponent.prototype.setQuestions = function (questions) {
        var levels = [];
        questions.forEach(function (question) {
            levels.push(question.level);
        });
        var hasDiffrentLevels = levels.filter(function (x, i, a) { return a.indexOf(x) == i; }).length > 1;
        questions.forEach(function (question) {
            question.showLevel = hasDiffrentLevels;
        });
        this.questions = questions;
    };
    QuizComponent.prototype.setAnswersForQuestion = function (data) {
        this.questions.forEach(function (item) {
            console.log(data);
            if (item.id == data.question_id) {
                console.log(data);
                var setSelectedQuestion = false;
                if (data.answer_ids.length > 0 || data.answer_text !== '') {
                    if (item.type === "0" || item.type === "2") {
                        setSelectedQuestion = data.answer_ids[0];
                    }
                    else {
                        setSelectedQuestion = true;
                    }
                }
                if (data.answer_ids.length > 0) {
                    item.activeAnswers.forEach(function (answer) {
                        if (data.answer_ids.indexOf(answer.id) >= 0) {
                            answer.is_selected = answer.id;
                        }
                        else {
                            answer.is_selected = false;
                        }
                    });
                }
                else {
                    item.activeAnswers.forEach(function (answer) {
                        answer.is_selected = false;
                    });
                }
                if (data.answer_text !== '' && item.type === "3") {
                    item.answer = data.answer_text;
                }
                item.is_selected = setSelectedQuestion;
            }
        });
    };
    QuizComponent.prototype.initSocket = function () {
        var _this = this;
        this.ws = new WebSocket(this.environment.WS_URL + '/?hash=' + this.hash);
        this.ws.onopen = function (event) { _this.socketOnOpen(event); };
        this.ws.onclose = function (event) { _this.socketOnClose(event); };
        this.ws.onerror = function (event) { _this.socketOnError(event); };
        this.ws.onmessage = function (event) { _this.socketOnMessage(event); };
    };
    QuizComponent.prototype.socketOnOpen = function (event) {
        console.log(event);
        console.log('WebSocket opened!');
        this.socketSendHash();
        this.wsMaxCountAttemptsConnect = MAX_ATTEMPTS_TO_CONNECT;
    };
    QuizComponent.prototype.socketOnClose = function (event) {
        console.log('WebSocket closed!');
        // alert('Connection with server was disabled!');
        if (this.wsMaxCountAttemptsConnect > 0) {
            this.socketReconnect();
        }
        else {
            this.dialog.open(quiz_socket_refresh_component_1.QuizSocketRefreshComponent, {});
        }
    };
    QuizComponent.prototype.socketOnError = function (event) {
        console.log('WebSocket error:');
    };
    QuizComponent.prototype.socketOnMessage = function (event) {
        var _this = this;
        var data = JSON.parse(event.data);
        if (data.questions) {
            this.setQuestions(data.questions);
        }
        if (data.answers) {
            data.answers.forEach(function (item) {
                _this.setAnswersForQuestion(item);
            });
        }
        if (data.status) {
            this.checkStatusEventQuiz(data.status);
        }
        if (data.type && data.type === 'set_answer') {
            this.setAnswersForQuestion(data);
        }
    };
    QuizComponent.prototype.socketSend = function (data) {
        this.ws.send('test');
    };
    QuizComponent.prototype.socketSendHash = function () {
        var data = {
            'type': 'set_hash',
            'hash': this.hash,
        };
        this.ws.send(JSON.stringify(data));
    };
    QuizComponent.prototype.socketReconnect = function () {
        var _this = this;
        this.wsMaxCountAttemptsConnect--;
        setTimeout(function () { _this.initSocket(); }, 5000);
    };
    __decorate([
        core_1.HostBinding('class.sidebar-compact'),
        __metadata("design:type", Object)
    ], QuizComponent.prototype, "isCompactSidebar()", void 0);
    __decorate([
        core_1.HostBinding('class.no-logged'),
        __metadata("design:type", Object)
    ], QuizComponent.prototype, "!isLogged()", void 0);
    QuizComponent = __decorate([
        core_1.Component({
            selector: 'app-quiz',
            templateUrl: './quiz.component.html',
            styleUrls: ['./quiz.component.css']
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            router_1.ActivatedRoute,
            http_service_1.HttpService,
            auth_service_1.AuthService,
            router_1.Router,
            wo_dialog_service_1.WoDialogService])
    ], QuizComponent);
    return QuizComponent;
}());
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map