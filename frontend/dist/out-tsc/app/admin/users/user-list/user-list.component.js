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
var wo_dialog_alert_component_1 = require("@app/wo-module/wo-dialog/wo-dialog-alert/wo-dialog-alert.component");
var wo_dialog_confirm_component_1 = require("@app/wo-module/wo-dialog/wo-dialog-confirm/wo-dialog-confirm.component");
var admin_new_user_component_1 = require("@app/modal/admin-new-user/admin-new-user.component");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(metaPage, router, activeRoute, api, breadcrumbs, dialog) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.api = api;
        this.breadcrumbs = breadcrumbs;
        this.dialog = dialog;
        this.search = {
            page: 0,
            inpCommon: '',
            common: '',
            defSort: 'username',
            sort: 'username',
            filterQuery: ['status', 'username', 'email', 'name', 'cdate_from', 'cdate_to'],
            condition: { status: '' }
        };
        this.STATUS_LABELS = {
            active: 'Active',
            blocked: 'Blocked',
            deleted: 'Deleted',
        };
        this.ROLE_LABELS = {
            admin: 'Admin',
            public: 'Public',
        };
        this.curr_page = 0;
        this.last_page = 0;
        this.all_check = false;
        this.advanced_filters = false;
        this.loading = true;
        this.rows = [];
        this.metaPage.setTitle('Users');
        this.breadcrumbs.setLinks([
            { iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home' },
            { text: 'Users' }
        ]);
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.data.subscribe(function (data) {
            _this.role = data['role'];
            _this.activeRoute.params.subscribe(function (data) {
                _this.search.page = data['p'];
                _this.search.sort = _this.search.defSort;
                if (data['sort']) {
                    _this.search.sort = data['sort'];
                }
                if (data['advanced'] === 'on') {
                    _this.advanced_filters = true;
                }
                for (var prop in _this.search.filterQuery) {
                    if (typeof data[_this.search.filterQuery[prop]] !== 'undefined' && data[_this.search.filterQuery[prop]] !== '') {
                        _this.search.condition[_this.search.filterQuery[prop]] = data[_this.search.filterQuery[prop]];
                    }
                }
                if (data['s']) {
                    _this.search.inpCommon = data['s'];
                    _this.search.common = data['s'];
                }
                else {
                    _this.search.inpCommon = '';
                    _this.search.common = '';
                }
                _this.findBy();
            });
        });
    };
    UserListComponent.prototype.toPage = function (event) {
        this.search.page = event['page'];
        this.toActualUrl();
    };
    UserListComponent.prototype.findBy = function () {
        var _this = this;
        this.loading = true;
        this.search['role'] = this.role;
        this.api.send('user/find', {}, this.search).then(function (res) {
            _this.curr_page = res['curr_page'];
            _this.last_page = res['last_page'];
            _this.rows = res['rows'];
            _this.all_check = false;
            _this.loading = false;
        });
    };
    UserListComponent.prototype.checkAllRows = function (event) {
        for (var i = this.rows.length - 1; i >= 0; i--) {
            this.rows[i].is_checked = event.target.checked;
        }
    };
    UserListComponent.prototype.sortBy = function (event) {
        this.search.sort = event.current;
        this.toActualUrl();
    };
    UserListComponent.prototype.doSearch = function () {
        this.search.common = this.search.inpCommon;
        this.toActualUrl();
    };
    UserListComponent.prototype.toActualUrl = function () {
        var params = {};
        // Page
        if (this.search.page > 1) {
            params['p'] = this.search.page;
        }
        // Sort
        if (this.search.sort !== this.search.defSort) {
            params['sort'] = this.search.sort;
        }
        // Search
        if (this.search.common !== '') {
            params['s'] = this.search.common;
        }
        for (var prop in this.search.filterQuery) {
            if (typeof this.search.condition[this.search.filterQuery[prop]] !== 'undefined' &&
                this.search.condition[this.search.filterQuery[prop]] !== '') {
                params[this.search.filterQuery[prop]] = this.search.condition[this.search.filterQuery[prop]];
            }
        }
        // Advanced filter
        if (this.advanced_filters === true) {
            params['advanced'] = 'on';
        }
        if (this.role === 'public') {
            this.router.navigate(['/admin/users/participants', params]);
        }
        else {
            this.router.navigate(['/admin/users', params]);
        }
    };
    UserListComponent.prototype.doChangeStatus = function (record, status, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var isAllowed = true;
        if (status === 'deleted' && force !== true) {
            isAllowed = false;
            var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to delete user?' });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result) {
                    _this.doChangeStatus(record, status, true);
                }
            });
        }
        if (isAllowed) {
            record.status = status;
            this.api.send('user/set-status', {}, { users: [record.id], status: status }).then(function (data) {
                record.status = status;
                if (status === 'deleted' &&
                    (_this.search.condition['status'] === '' || typeof _this.search.condition['status'] === 'undefined')) {
                    _this.findBy();
                }
            });
        }
    };
    UserListComponent.prototype.doMassChangeStatus = function (status, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var items = [];
        for (var i = this.rows.length - 1; i >= 0; i--) {
            if (this.rows[i].is_checked) {
                items.push(this.rows[i].id);
            }
        }
        if (items.length > 0) {
            var isAllowed = true;
            if (status === 'deleted' && force !== true) {
                isAllowed = false;
                var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to delete user(s)?' });
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        _this.doMassChangeStatus(status, true);
                    }
                });
            }
            if (isAllowed) {
                this.api.send('user/set-status', {}, { users: items, status: status }).then(function (data) {
                    for (var z = _this.rows.length - 1; z >= 0; z--) {
                        if (_this.rows[z].is_checked) {
                            _this.rows[z].status = status;
                        }
                    }
                    if (status === 'deleted' &&
                        (_this.search.condition['status'] === '' || typeof _this.search.condition['status'] === 'undefined')) {
                        _this.findBy();
                    }
                });
            }
        }
        else {
            this.dialog.open(wo_dialog_alert_component_1.WoDialogAlertComponent, { message: 'You must select user(s).' });
        }
    };
    UserListComponent.prototype.toggleAdvancedFilter = function () {
        this.advanced_filters = !this.advanced_filters;
    };
    UserListComponent.prototype.resetFilter = function (event) {
        event.preventDefault();
        for (var _i = 0, _a = Object.keys(this.search.condition); _i < _a.length; _i++) {
            var prop = _a[_i];
            this.search.condition[prop] = '';
        }
        this.search.common = '';
        this.toActualUrl();
    };
    UserListComponent.prototype.toProfile = function (id) {
        this.editUser(id);
    };
    UserListComponent.prototype.editUser = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(admin_new_user_component_1.AdminNewUserComponent, { id: id, role: this.role });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.findBy();
        });
    };
    UserListComponent = __decorate([
        core_1.Component({
            templateUrl: 'user-list.component.html',
            styleUrls: ['./user-list.component.css'],
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            api_admin_service_1.ApiAdminService,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            wo_dialog_service_1.WoDialogService])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map