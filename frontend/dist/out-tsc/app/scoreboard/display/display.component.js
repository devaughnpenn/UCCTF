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
var polling_service_1 = require("@app/share/polling.service");
var environment_1 = require("../../../environments/environment");
var animations_1 = require("@angular/animations");
var DisplayComponent = /** @class */ (function () {
    function DisplayComponent(router, activeRoute, pollingService) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.pollingService = pollingService;
        this.totalTime = null;
        this.passedTime = 0;
        this.cooldownTimer = null;
        this.cooldownTimerActive = false;
        this.newLeadAnimation = false;
        this.currentLeader = null;
        this.minutes_left = null;
        this.wasGt10min = false;
        this.wasGt5min = false;
        this.showGroup = 1;
        this.maxGroup = 1;
        this.groupTimer = 0;
        this.environment = environment_1.environment;
    }
    DisplayComponent.prototype.onResize = function (event) {
        this.showGroup = 1;
        this.data.teams.forEach(function (team) {
            team._group = 1;
        });
        this.autoFillHeightForTable();
    };
    DisplayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.accessKey = params['access-key'];
            _this.startPooling();
        });
        this.tick();
    };
    DisplayComponent.prototype.startPooling = function () {
        var _this = this;
        this.polling = this.pollingService.open(this.environment.API_BASE_URL + '/scoreboard/display', {
            'access_key': this.accessKey,
        });
        this.polling.start();
        this.polling.onMessage().subscribe(function (res) {
            if (res['code'] === 404) {
                _this.router.navigate(['/scoreboard/scoreboard-not-found']);
            }
            else if (res['code'] === 200) {
                if (res['hasChanges'] === true) {
                    _this.groupTimer = 0;
                    _this.showGroup = 1;
                    _this.data = res['data'];
                    _this.data['teams'].forEach(function (team) {
                        team._group = 1;
                    });
                    setTimeout(function () {
                        _this.autoFillHeightForTable();
                    }, 150);
                    _this.updateTeamLeader();
                }
                _this.totalTime = res['data']['time_left'];
                if (_this.data['event2quiz']['status'] !== 1) {
                    _this.passedTime = 0;
                }
            }
        });
    };
    DisplayComponent.prototype.tick = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.maxGroup > 1) {
                _this.groupTimer++;
                if (_this.groupTimer > 10) {
                    _this.showGroup = _this.showGroup + 1 > _this.maxGroup ? 1 : _this.showGroup + 1;
                    _this.groupTimer = 0;
                }
            }
            if (_this.data && _this.data['event2quiz']['status'] === 1) {
                if (_this.totalTime < 10 && _this.totalTime > 0) {
                    _this.cooldownTimerActive = true;
                    setTimeout(function () {
                        _this.cooldownTimerActive = false;
                    }, 200);
                }
                if (_this.totalTime > 602) {
                    _this.wasGt10min = true;
                }
                if (_this.totalTime > 302) {
                    _this.wasGt5min = true;
                }
                if (_this.wasGt10min === true && _this.totalTime <= 600) {
                    _this.showTimeLeft(10);
                }
                if (_this.wasGt5min === true && _this.totalTime <= 300) {
                    _this.showTimeLeft(5);
                }
                _this.totalTime -= 1;
            }
            _this.tick();
        }, 1000);
    };
    DisplayComponent.prototype.updateTeamLeader = function () {
        if (this.data['teams'].length > 0 && this.data['teams'][0]['rank'] !== null) {
            var team = this.data['teams'][0];
            if (this.currentLeader !== null && this.currentLeader['id'] !== team['id']) {
                this.showNewLeaderAnimation();
            }
            this.currentLeader = team;
        }
    };
    DisplayComponent.prototype.showNewLeaderAnimation = function () {
        var _this = this;
        this.newLeadAnimation = true;
        setTimeout(function () {
            _this.newLeadAnimation = false;
        }, 3000);
    };
    DisplayComponent.prototype.showTimeLeft = function (minutes) {
        var _this = this;
        this.minutes_left = minutes;
        setTimeout(function () {
            _this.minutes_left = null;
            if (minutes === 10) {
                _this.wasGt10min = false;
            }
            if (minutes === 5) {
                _this.wasGt5min = false;
            }
        }, 4000);
    };
    DisplayComponent.prototype.autoFillHeightForTable = function () {
        var _this = this;
        var scoreboardTable = document.querySelector('.scoreboard__table');
        var teamList = document.querySelector('.team-list');
        var tbodyTeamListItem = document.querySelector('.team-list tr');
        var maxY = scoreboardTable.getBoundingClientRect().top + scoreboardTable.getBoundingClientRect().height;
        var lastRightItem = 0;
        this.data['teams'].forEach(function (t, i) {
            if (teamList.getBoundingClientRect().top + tbodyTeamListItem.getBoundingClientRect().height * (i + 1) < maxY) {
                lastRightItem = i;
            }
        });
        if (this.data.teams.length !== lastRightItem) {
            var group_1 = 1;
            this.data['teams'].forEach(function (team, ti) {
                if (ti !== 0 && ti % (lastRightItem + 1) === 0) {
                    group_1++;
                }
                team._group = group_1;
                _this.maxGroup = group_1;
            });
        }
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DisplayComponent.prototype, "onResize", null);
    DisplayComponent = __decorate([
        core_1.Component({
            templateUrl: 'display.component.html',
            styleUrls: ['ribon.css', 'display.component.css'],
            animations: [
                animations_1.trigger('changeDivSize', [
                    animations_1.state('initial', animations_1.style({
                        backgroundColor: 'green',
                        width: '100px',
                        height: '100px',
                        transform: 'rotate(0deg)',
                    })),
                    animations_1.state('final', animations_1.style({
                        backgroundColor: 'red',
                        width: '200px',
                        height: '200px',
                        transform: 'rotate(360deg)',
                    })),
                    animations_1.transition('initial=>final', animations_1.animate('1500ms')),
                    animations_1.transition('final=>initial', animations_1.animate('1000ms'))
                ]),
                animations_1.trigger('EnterLeave', [
                    animations_1.state('flyIn', animations_1.style({ transform: 'translateX(0)' })),
                    animations_1.transition(':enter', [
                        animations_1.style({ transform: 'translateX(-100%)' }),
                        animations_1.animate('500ms ease-in')
                    ]),
                    animations_1.transition(':leave', [
                        animations_1.animate('0.3s ease-out', animations_1.style({ transform: 'translateX(100%)' }))
                    ])
                ]),
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            polling_service_1.PollingService])
    ], DisplayComponent);
    return DisplayComponent;
}());
exports.DisplayComponent = DisplayComponent;
//# sourceMappingURL=display.component.js.map