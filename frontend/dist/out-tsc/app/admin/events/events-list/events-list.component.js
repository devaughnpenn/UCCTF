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
var EventsListComponent = /** @class */ (function () {
    function EventsListComponent(router, activeRoute, breadcrumbs, metaPage, api, dialog) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.metaPage = metaPage;
        this.api = api;
        this.dialog = dialog;
        this.instance = this;
        this.criteria = {
            page: 0,
            defSort: 'event_date',
            sort: '',
            filterQuery: ['common', 'name', 'event_date_from', 'event_date_to', 'status'],
            preFilter: {},
            filter: { status: '' },
        };
        this.STATUS_LABELS = {
            0: 'Active',
            1: 'Deleted',
        };
        this.curr_page = 0;
        this.last_page = 0;
        this.advanced_filters = false;
        this.loading = true;
        this.rows = [];
        this.metaPage.setTitle('Events List');
        this.breadcrumbs.setLinks([
            { iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home' },
            { iconClass: 'fa fa-tachometer', text: 'Events List' },
        ]);
    }
    EventsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.criteria['page'] = params['p'];
            _this.criteria['sort'] = _this.criteria.defSort;
            if (params['sort']) {
                _this.criteria.sort = params['sort'];
            }
            if (params['advanced'] === 'on') {
                _this.advanced_filters = true;
            }
            for (var prop in _this.criteria.filterQuery) {
                if (typeof params[_this.criteria.filterQuery[prop]] !== 'undefined' && params[_this.criteria.filterQuery[prop]] !== '') {
                    _this.criteria.filter[_this.criteria.filterQuery[prop]] = params[_this.criteria.filterQuery[prop]];
                }
            }
            _this.criteria.preFilter = Object.assign({}, _this.criteria.filter);
            _this.findBy();
        });
    };
    EventsListComponent.prototype.findBy = function () {
        var _this = this;
        this.loading = true;
        this.api.send('events/index', this.criteria, { filter: this.criteria.filter }).then(function (res) {
            _this.curr_page = res['curr_page'];
            _this.last_page = res['last_page'];
            _this.rows = res['rows'];
            _this.loading = false;
        });
    };
    EventsListComponent.prototype.toActualUrl = function () {
        var params = {};
        // Page
        if (this.criteria['page'] > 1) {
            params['p'] = this.criteria['page'];
        }
        // Sort
        if (this.criteria.sort !== this.criteria.defSort) {
            params['sort'] = this.criteria['sort'];
        }
        // filter
        for (var prop in this.criteria.filterQuery) {
            if (typeof this.criteria.filter[this.criteria.filterQuery[prop]] !== 'undefined' &&
                this.criteria.filter[this.criteria.filterQuery[prop]] !== '') {
                params[this.criteria.filterQuery[prop]] = this.criteria.filter[this.criteria.filterQuery[prop]];
            }
        }
        // Advanced filter
        if (this.advanced_filters === true) {
            params['advanced'] = 'on';
        }
        this.router.navigate(['/admin/events', params]);
    };
    EventsListComponent.prototype.sortBy = function (event) {
        this.criteria.sort = event.current;
        this.toActualUrl();
    };
    EventsListComponent.prototype.doSearch = function () {
        this.criteria.filter = Object.assign({ status: '' }, this.criteria.preFilter);
        this.toActualUrl();
    };
    EventsListComponent.prototype.toProfile = function (id) {
        this.router.navigate(['/admin/events', id]);
    };
    EventsListComponent.prototype.toPage = function (event) {
        this.criteria.page = event['page'];
        this.toActualUrl();
    };
    EventsListComponent.prototype.toggleAdvancedFilter = function () {
        this.advanced_filters = !this.advanced_filters;
    };
    EventsListComponent.prototype.resetFilter = function (event) {
        event.preventDefault();
        this.criteria.filter = { status: '' };
        this.toActualUrl();
    };
    EventsListComponent.prototype.doDelete = function (row) {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to delete event?' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.api.send('events/delete', { id: row['id'] }, {}).then(function (res) {
                    _this.findBy();
                });
            }
        });
    };
    EventsListComponent.prototype.doChangeQuizStatus = function (status, row, reset) {
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
                }).then(function (res) {
                });
            }
        });
    };
    EventsListComponent.prototype.doToggleShowFinalResult = function (row) {
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
    EventsListComponent = __decorate([
        core_1.Component({
            templateUrl: 'events-list.component.html',
            styleUrls: ['events-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            meta_page_service_1.MetaPageService,
            api_admin_service_1.ApiAdminService,
            wo_dialog_service_1.WoDialogService])
    ], EventsListComponent);
    return EventsListComponent;
}());
exports.EventsListComponent = EventsListComponent;
//# sourceMappingURL=events-list.component.js.map