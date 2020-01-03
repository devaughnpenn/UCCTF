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
var wo_dialog_service_1 = require("@app/wo-module/wo-dialog/wo-dialog.service");
var wo_dialog_confirm_component_1 = require("@app/wo-module/wo-dialog/wo-dialog-confirm/wo-dialog-confirm.component");
var EventTabsComponent = /** @class */ (function () {
    function EventTabsComponent(metaPage, activeRoute, breadcrumbs, api, dialog) {
        this.metaPage = metaPage;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.api = api;
        this.dialog = dialog;
        this.id = 0;
        this.breadcrumbs.setLinks([
            { iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home' },
            { iconClass: 'fa fa-calendar-check-o', route: '/admin/events', text: 'Events List' },
            { text: 'Event Profile' },
        ]);
    }
    EventTabsComponent_1 = EventTabsComponent;
    EventTabsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.id = parseInt(params['id'], 10) || 0;
            if (_this.id > 0) {
                _this.loadData();
            }
            else {
                EventTabsComponent_1.title = 'New Event';
            }
        });
    };
    EventTabsComponent.prototype.loadData = function () {
        var _this = this;
        this.api.send('events/profile', { id: this.id }).then(function (res) {
            EventTabsComponent_1.title = res['data']['name'];
            _this.data = res['data'];
        });
    };
    Object.defineProperty(EventTabsComponent.prototype, "staticTitle", {
        get: function () {
            return EventTabsComponent_1.title;
        },
        enumerable: true,
        configurable: true
    });
    EventTabsComponent.prototype.doChangeQuizStatus = function (status, row, reset) {
        var _this = this;
        if (reset === void 0) { reset = false; }
        var message = '';
        if (status === 1) {
            message = 'Are you sure you want to start the "' + row['name'] + '"  quiz?';
        }
        else if (status === 2) {
            message = 'Are you sure you want to pause the "' + row['name'] + '" quiz?';
        }
        else if (status === 0) {
            message = 'Are you sure you want to restart (wipe all results and reset timer) the "' + row['name'] + '" quiz?';
        }
        else if (status === 3) {
            message = 'Are you sure you want to finish the "' + row['name'] + '" quiz?';
        }
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: message });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                row['event2quiz']['status'] = status;
                if (status === 1 && row['event2quiz']['passed_time'] === 0) {
                    row['event2quiz']['passed_time'] = 1 / 60;
                }
                if (reset === true) {
                    row['event2quiz']['passed_time'] = 0;
                }
                _this.api.send('quizzes/event-quiz-status', {
                    event_id: row['event2quiz']['event_id'],
                    quiz_id: row['event2quiz']['quiz_id']
                }, {
                    status: row['event2quiz']['status'],
                    reset: reset,
                }).then(function (res) { });
            }
        });
    };
    EventTabsComponent.prototype.doToggleShowFinalResult = function (row) {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, {
            message: 'Are you sure you want to ' +
                (row['scoreboard']['show_final_results'] === 1 ? 'hide' : 'show') +
                ' the result on scoreboard for the "' + row['name'] + '" quiz?'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                row['scoreboard']['show_final_results'] = (row['scoreboard']['show_final_results'] === 1 ? 0 : 1);
                _this.api.send('events/scoreboard-options', {
                    event_id: row['event2quiz']['event_id'],
                    quiz_id: row['event2quiz']['quiz_id'],
                }, {
                    show_final_results: row['scoreboard']['show_final_results'],
                }).then(function (res) { });
            }
        });
    };
    var EventTabsComponent_1;
    EventTabsComponent.title = '';
    EventTabsComponent = EventTabsComponent_1 = __decorate([
        core_1.Component({
            templateUrl: 'event-tabs.component.html',
            styleUrls: ['event-tabs.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            api_admin_service_1.ApiAdminService,
            wo_dialog_service_1.WoDialogService])
    ], EventTabsComponent);
    return EventTabsComponent;
}());
exports.EventTabsComponent = EventTabsComponent;
//# sourceMappingURL=event-tabs.component.js.map