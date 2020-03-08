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
var wo_dialog_confirm_component_1 = require("@app/wo-module/wo-dialog/wo-dialog-confirm/wo-dialog-confirm.component");
var wo_dialog_service_1 = require("@app/wo-module/wo-dialog/wo-dialog.service");
var QuestionsListComponent = /** @class */ (function () {
    function QuestionsListComponent(router, woFlash, activeRoute, breadcrumbs, metaPage, api, dialog) {
        this.router = router;
        this.woFlash = woFlash;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.metaPage = metaPage;
        this.api = api;
        this.dialog = dialog;
        this.instance = this;
        this.criteria = {
            page: 0,
            defSort: '',
            sort: '',
            filterQuery: ['title', 'created_at_from', 'created_at_to', 'status', 'type', 'level','common'],
            preFilter: {},
            filter: {},
        };
        this.curr_page = 0;
        this.last_page = 0;
        this.advanced_filters = false;
        this.loading = true;
        this.rows = [];
        this.STATUS_LABELS = [
            'Active',
            'Blocked',
        ];
        this.TYPES = [
            'Multiple choice',
            'Checkboxes',
            'Dropdown',
            'Open answer',
        ];
        this.metaPage.setTitle('Questions List');
        this.breadcrumbs.setLinks([
            { iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home' },
            { text: 'Questions List' },
        ]);
    }
    QuestionsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.woFlash.show();
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
    QuestionsListComponent.prototype.findBy = function () {
        var _this = this;
        this.loading = true;
        this.api.send('questions/index', this.criteria, { filter: this.criteria.filter }).then(function (res) {
            _this.curr_page = res['curr_page'];
            _this.last_page = res['last_page'];
            _this.rows = res['rows'];
            _this.loading = false;
        });
    };
    QuestionsListComponent.prototype.toActualUrl = function () {
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
        this.router.navigate(['/admin/questions', params]);
    };
    QuestionsListComponent.prototype.sortBy = function (event) {
        this.criteria.sort = event.current;
        this.toActualUrl();
    };
    QuestionsListComponent.prototype.doSearch = function () {
        this.criteria.filter = Object.assign({}, this.criteria.preFilter);
        this.toActualUrl();
    };
    QuestionsListComponent.prototype.toItem = function (id) {
        this.router.navigate(['/admin/questions', id]);
    };
    QuestionsListComponent.prototype.toPage = function (event) {
        this.criteria.page = event['page'];
        this.toActualUrl();
    };
    QuestionsListComponent.prototype.toggleAdvancedFilter = function () {
        this.advanced_filters = !this.advanced_filters;
    };
    QuestionsListComponent.prototype.resetFilter = function (event) {
        event.preventDefault();
        this.criteria.filter = {};
        this.toActualUrl();
    };
    QuestionsListComponent.prototype.doDelete = function (row) {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to delete question?' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.api.send('questions/delete', { id: row['id'] }, {}).then(function (res) {
                    _this.findBy();
                });
            }
        });
    };
    QuestionsListComponent.prototype.toQuestion = function (id) {
        this.router.navigate(['/admin/questions', id]);
    };
    QuestionsListComponent = __decorate([
        core_1.Component({
            templateUrl: 'questions-list.component.html',
            styleUrls: ['questions-list.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            wo_flash_service_1.WoFlashService,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            meta_page_service_1.MetaPageService,
            api_admin_service_1.ApiAdminService,
            wo_dialog_service_1.WoDialogService])
    ], QuestionsListComponent);
    return QuestionsListComponent;
}());
exports.QuestionsListComponent = QuestionsListComponent;
//# sourceMappingURL=questions-list.component.js.map