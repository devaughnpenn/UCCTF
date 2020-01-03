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
var TeamTabsComponent = /** @class */ (function () {
    function TeamTabsComponent(metaPage, activeRoute, breadcrumbs, api) {
        this.metaPage = metaPage;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.api = api;
        this.id = 0;
        this.breadcrumbs.setLinks([
            { iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home' },
            { iconClass: 'fa fa-users', route: '/admin/teams', text: 'Teams List' },
            { text: 'Team Profile' },
        ]);
    }
    TeamTabsComponent_1 = TeamTabsComponent;
    TeamTabsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.id = parseInt(params['id'], 10) || 0;
            if (_this.id > 0) {
                _this.loadData();
            }
            else {
                TeamTabsComponent_1.title = 'New Team';
            }
        });
    };
    TeamTabsComponent.prototype.loadData = function () {
        this.api.send('teams/profile', { id: this.id }).then(function (res) {
            TeamTabsComponent_1.title = res['data']['name'];
        });
    };
    Object.defineProperty(TeamTabsComponent.prototype, "staticTitle", {
        get: function () {
            return TeamTabsComponent_1.title;
        },
        enumerable: true,
        configurable: true
    });
    var TeamTabsComponent_1;
    TeamTabsComponent.title = '';
    TeamTabsComponent = TeamTabsComponent_1 = __decorate([
        core_1.Component({
            templateUrl: 'team-tabs.component.html',
            styleUrls: ['team-tabs.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            api_admin_service_1.ApiAdminService])
    ], TeamTabsComponent);
    return TeamTabsComponent;
}());
exports.TeamTabsComponent = TeamTabsComponent;
//# sourceMappingURL=team-tabs.component.js.map