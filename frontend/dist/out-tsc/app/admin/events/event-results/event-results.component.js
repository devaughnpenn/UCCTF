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
var wo_breadcrumbs_service_1 = require("@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service");
var meta_page_service_1 = require("@app/core/meta-page.service");
var api_admin_service_1 = require("@app/share/api-admin.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var environment_1 = require("@env/environment");
var auth_service_1 = require("@app/auth/auth.service");
var EventResultsComponent = /** @class */ (function () {
    function EventResultsComponent(metaPage, router, activeRoute, breadcrumbs, api, woFlash, auth) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.api = api;
        this.woFlash = woFlash;
        this.auth = auth;
        this.isLoading = false;
        this.isUpdate = false;
        this.showAll = false;
        this.linkReportByQuiz = '#';
        this.openTeams = [];
        this.hasPointChanges = false;
    }
    EventResultsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.metaPage.setTitle('Results');
        this.activeRoute.params.subscribe(function (params) {
            if (params['o']) {
                params['o'].split(',').forEach(function (item) {
                    _this.openTeams.push(parseInt(item, 10));
                });
            }
        });
        this.activeRoute.parent.params.subscribe(function (parentParams) {
            _this.eventId = parseInt(parentParams['id'], 10) || 0;
            if (_this.eventId > 0) {
                setTimeout(function () {
                    _this.linkReportByQuiz = environment_1.environment.API_BASE_URL + '/admin/events/download-report?event_id=' + _this.eventId + '&access-token=' + _this.auth.getToken();
                    _this.loadData();
                }, 0);
            }
        });
    };
    EventResultsComponent.prototype.toActualUrl = function () {
        var _this = this;
        this.openTeams = [];
        this.teams.forEach(function (team) {
            if (team._show === true) {
                _this.openTeams.push(team.id);
            }
        });
        this.router.navigate(['/admin/events', this.eventId, 'results', { o: this.openTeams }]);
    };
    EventResultsComponent.prototype.loadData = function () {
        var _this = this;
        this.isLoading = true;
        this.api.send('events/results', { event_id: this.eventId }).then(function (res) {
            _this.isLoading = false;
            _this.isUpdate = false;
            _this.hasPointChanges = false;
            res['teams'].forEach(function (team) {
                team.reportUrl = environment_1.environment.API_BASE_URL + '/admin/events/download-team-report?event_id=' + _this.eventId + '&team_id=' + team.id + '&access-token=' + _this.auth.getToken();
            });
            _this.teams = res['teams'];
            _this.questions = res['questions'];
            _this.teams.forEach(function (team) {
                if (_this.openTeams.indexOf(team.id) !== -1) {
                    team._show = true;
                }
                _this.calculateTeamScores(team);
            });
        });
    };
    EventResultsComponent.prototype.doShowAll = function () {
        var _this = this;
        this.showAll = !this.showAll;
        this.teams.forEach(function (team) {
            team._show = _this.showAll;
        });
        this.toActualUrl();
    };
    EventResultsComponent.prototype.doShow = function (row) {
        row._show = !row._show;
        var hasOpened = false;
        var hasHidden = true;
        this.teams.forEach(function (team) {
            if (team._show === true) {
                hasOpened = true;
            }
            if (team._show !== true) {
                hasHidden = false;
            }
        });
        if (this.showAll === true && hasOpened === false) {
            this.showAll = false;
        }
        else if (this.showAll === false && hasHidden === true) {
            this.showAll = true;
        }
        this.toActualUrl();
    };
    EventResultsComponent.prototype.isAnswered = function (team, question) {
        if (team['answers'] && team['answers'][question['id']]) {
            if (question.type === 3) {
                return team['answers'][question['id']]['answer_text'] !== '';
            }
            else {
                return team['answers'][question['id']]['answer_ids'].length > 0;
            }
        }
        else {
            return false;
        }
    };
    EventResultsComponent.prototype.calculateTeamScores = function (team) {
        var scores = 0;
        this.questions.forEach(function (question) {
            if (team['answers'][question.id]) {
                if (team['answers'][question.id]['change_points_to'] > 0) {
                    scores += team['answers'][question.id]['change_points_to'];
                }
                else if (team['answers'][question.id]['is_correct'] === true) {
                    scores += question.points;
                }
            }
        });
        team['scores'] = scores;
    };
    EventResultsComponent.prototype.isCheckedAnswer = function (answer, teamAnswers) {
        if (typeof teamAnswers === 'undefined') {
            return false;
        }
        else {
            if (teamAnswers.answer_ids.indexOf(answer.id) !== -1) {
                return true;
            }
            return false;
        }
    };
    EventResultsComponent.prototype.doChangePointsTo = function (event, team, question_id, answer) {
        var _this = this;
        if (typeof answer !== 'undefined') {
            if (typeof answer['_change_points_to'] === 'undefined') {
                answer['_change_points_to'] = answer['change_points_to'];
            }
            if (this.isEmpty(event.target.value)) {
                answer['change_points_to'] = null;
            }
            else {
                answer['change_points_to'] = parseFloat(event.target.value);
            }
            answer['_hasChanges'] = true;
        }
        else {
            team['answers'][question_id] = {
                _change_points_to: null,
                answer_ids: [],
                _hasChanges: true,
                change_points_to: parseFloat(event.target.value),
            };
        }
        if (answer['change_points_to'] === answer['_change_points_to']) {
            team['answers'][question_id]['_hasChanges'] = false;
        }
        else if (this.isEmpty(answer['change_points_to']) && this.isEmpty(answer['_change_points_to'])) {
            team['answers'][question_id]['_hasChanges'] = false;
        }
        this.calculateTeamScores(team);
        this.hasPointChanges = false;
        this.teams.forEach(function (fteam) {
            Object.keys(fteam.answers).forEach(function (fquestion_id) {
                if (fteam.answers[fquestion_id]['_hasChanges'] === true) {
                    _this.hasPointChanges = true;
                }
            });
        });
    };
    EventResultsComponent.prototype.isEmpty = function (val) {
        return (!val || 0 === val.length);
    };
    EventResultsComponent.prototype.doSaveChanges = function () {
        var _this = this;
        var dataForm = [];
        this.teams.forEach(function (team) {
            Object.keys(team.answers).forEach(function (question_id) {
                dataForm.push({
                    team_id: team.id,
                    question_id: question_id,
                    change_points_to: team.answers[question_id]['change_points_to'],
                });
            });
        });
        this.api.send('events/results', { event_id: this.eventId }, {
            'data': dataForm,
            'cmd': 'update_points'
        }).then(function (res) {
            setTimeout(function () {
                _this.woFlash.addMessage('The operation was successfully done!');
                _this.woFlash.show();
            }, 100);
            _this.loadData();
        });
    };
    EventResultsComponent = __decorate([
        core_1.Component({
            templateUrl: 'event-results.component.html',
            styleUrls: ['event-results.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            api_admin_service_1.ApiAdminService,
            wo_flash_service_1.WoFlashService,
            auth_service_1.AuthService])
    ], EventResultsComponent);
    return EventResultsComponent;
}());
exports.EventResultsComponent = EventResultsComponent;
//# sourceMappingURL=event-results.component.js.map