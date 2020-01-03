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
var admin_new_user_component_1 = require("@app/modal/admin-new-user/admin-new-user.component");
var TeamParticipantsComponent = /** @class */ (function () {
    function TeamParticipantsComponent(router, activeRoute, breadcrumbs, metaPage, api, dialog) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.metaPage = metaPage;
        this.api = api;
        this.dialog = dialog;
        this.id = 0;
        this.instance = this;
        this.criteria = {
            page: 0,
            defSort: 'username',
            sort: 'username',
            filterQuery: ['common', 'username', 'first_name', 'last_name', 'email', 'status', 'created_at'],
            preFilter: {},
            filter: {},
        };
        this.curr_page = 0;
        this.last_page = 0;
        this.advanced_filters = false;
        this.loading = true;
        this.rows = [];
        this.metaPage.setTitle('Team Participants');
        this.breadcrumbs.setLinks([
            { iconClass: 'fa fa-tachometer', route: '', text: 'Home' },
            { text: 'Team Participants' },
        ]);
    }
    TeamParticipantsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.parent.params.subscribe(function (parentParams) {
            _this.id = parseInt(parentParams['id'], 10) || 0;
            _this.activeRoute.params.subscribe(function (params) {
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
        });
    };
    TeamParticipantsComponent.prototype.findBy = function () {
        var _this = this;
        this.loading = true;
        this.criteria['team_id'] = this.id;
        this.api.send('teams/participants', this.criteria, { filter: this.criteria.filter }).then(function (res) {
            _this.curr_page = res['curr_page'];
            _this.last_page = res['last_page'];
            _this.rows = res['rows'];
            _this.loading = false;
        });
    };
    TeamParticipantsComponent.prototype.toActualUrl = function () {
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
        this.router.navigate(['/admin/teams', this.id, 'participants', params]);
    };
    TeamParticipantsComponent.prototype.sortBy = function (event) {
        this.criteria.sort = event.current;
        this.toActualUrl();
    };
    TeamParticipantsComponent.prototype.doSearch = function () {
        this.criteria.filter = Object.assign({}, this.criteria.preFilter);
        this.toActualUrl();
    };
    TeamParticipantsComponent.prototype.toProfile = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(admin_new_user_component_1.AdminNewUserComponent, { id: id, role: 'public', hideRole: true });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.findBy();
        });
    };
    TeamParticipantsComponent.prototype.toPage = function (event) {
        this.criteria.page = event['page'];
        this.toActualUrl();
    };
    TeamParticipantsComponent.prototype.toggleAdvancedFilter = function () {
        this.advanced_filters = !this.advanced_filters;
    };
    TeamParticipantsComponent.prototype.resetFilter = function (event) {
        event.preventDefault();
        this.criteria.filter = {};
        this.toActualUrl();
    };
    TeamParticipantsComponent.prototype.assignUser = function (row) {
        this.api.send('teams/assign-participant', {}, {
            team_id: this.id,
            user_id: parseInt(row.id, 10),
            is_assigned: row.is_assigned
        }).then(function (res) { });
    };
    TeamParticipantsComponent = __decorate([
        core_1.Component({
            templateUrl: 'team-participants.component.html',
            styleUrls: ['team-participants.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            meta_page_service_1.MetaPageService,
            api_admin_service_1.ApiAdminService,
            wo_dialog_service_1.WoDialogService])
    ], TeamParticipantsComponent);
    return TeamParticipantsComponent;
}());
exports.TeamParticipantsComponent = TeamParticipantsComponent;
//# sourceMappingURL=team-participants.component.js.map