"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_admin_guard_service_1 = require("@app/auth/auth-admin-guard.service");
var scoreboards_template_list_component_1 = require("./scoreboards-template-list/scoreboards-template-list.component");
var scoreboard_template_profile_component_1 = require("./scoreboard-template-profile/scoreboard-template-profile.component");
var routes = [
    { path: '', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: scoreboards_template_list_component_1.ScoreboardTemplateListComponent },
    { path: ':id', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: scoreboard_template_profile_component_1.ScoreboardTemplateProfileComponent },
];
var ScoreboardsRoutingModule = /** @class */ (function () {
    function ScoreboardsRoutingModule() {
    }
    ScoreboardsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ScoreboardsRoutingModule);
    return ScoreboardsRoutingModule;
}());
exports.ScoreboardsRoutingModule = ScoreboardsRoutingModule;
//# sourceMappingURL=scoreboards-routing.module.js.map