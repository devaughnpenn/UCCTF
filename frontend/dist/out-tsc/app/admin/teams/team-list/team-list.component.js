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
var TeamListComponent = /** @class */ (function () {
    function TeamListComponent(router, activeRoute, breadcrumbs, metaPage, api, dialog) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.metaPage = metaPage;
        this.api = api;
        this.dialog = dialog;
        this.instance = this;
        this.criteria = {
            page: 0,
            defSort: 'name',
            sort: '',
            filterQuery: ['common', 'name', 'created_at_from', 'created_at_to', 'status'],
            preFilter: {},
            filter: {},
        };
        this.curr_page = 0;
        this.last_page = 0;
        this.advanced_filters = false;
        this.loading = true;
        this.rows = [];
        this.metaPage.setTitle('Teams List');
        this.breadcrumbs.setLinks([
            { iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home' },
            { text: 'Teams List' },
        ]);
    }
    TeamListComponent.prototype.ngOnInit = function () {
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
    TeamListComponent.prototype.findBy = function () {
        var _this = this;
        this.loading = true;
        this.api.send('teams/index', this.criteria, { filter: this.criteria.filter }).then(function (res) {
            _this.curr_page = res['curr_page'];
            _this.last_page = res['last_page'];
            _this.rows = res['rows'];
            _this.loading = false;
        });
    };
    TeamListComponent.prototype.toActualUrl = function () {
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
        this.router.navigate(['/admin/teams', params]);
    };
    TeamListComponent.prototype.sortBy = function (event) {
        this.criteria.sort = event.current;
        this.toActualUrl();
    };
    TeamListComponent.prototype.doSearch = function () {
        this.criteria.filter = Object.assign({}, this.criteria.preFilter);
        this.toActualUrl();
    };
    TeamListComponent.prototype.toProfile = function (id) {
        this.router.navigate(['/admin/teams', id]);
    };
    TeamListComponent.prototype.toPage = function (event) {
        this.criteria.page = event['page'];
        this.toActualUrl();
    };
    TeamListComponent.prototype.toggleAdvancedFilter = function () {
        this.advanced_filters = !this.advanced_filters;
    };
    TeamListComponent.prototype.resetFilter = function (event) {
        event.preventDefault();
        this.criteria.filter = {};
        this.toActualUrl();
    };
    TeamListComponent.prototype.doDeleteTeam = function (row) {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to delete team?' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.api.send('teams/delete', { id: row['id'] }, {}).then(function (res) {
                    _this.findBy();
                });
            }
        });
    };
    TeamListComponent.prototype.doActivateTeam = function (row) {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to activate team?' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.api.send('teams/activate', { id: row['id'] }, {}).then(function (res) {
                    _this.findBy();
                });
            }
        });
    };
    TeamListComponent.prototype.doBlockTeam = function (row) {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to block team?' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.api.send('teams/block', { id: row['id'] }, {}).then(function (res) {
                    _this.findBy();
                });
            }
        });
    };
    TeamListComponent = __decorate([
        core_1.Component({
            templateUrl: 'team-list.component.html',
            styleUrls: ['team-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            meta_page_service_1.MetaPageService,
            api_admin_service_1.ApiAdminService,
            wo_dialog_service_1.WoDialogService])
    ], TeamListComponent);
    return TeamListComponent;
}());
exports.TeamListComponent = TeamListComponent;
//# sourceMappingURL=team-list.component.js.map