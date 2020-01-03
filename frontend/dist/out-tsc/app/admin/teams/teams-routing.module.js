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
var team_list_component_1 = require("./team-list/team-list.component");
var team_tabs_component_1 = require("./team-tabs/team-tabs.component");
var team_profile_component_1 = require("./team-profile/team-profile.component");
var team_participants_component_1 = require("./team-participants/team-participants.component");
var routes = [
    { path: '', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: team_list_component_1.TeamListComponent },
    { path: ':id', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: team_tabs_component_1.TeamTabsComponent, children: [
            { path: '', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: team_profile_component_1.TeamProfileComponent },
            { path: 'participants', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: team_participants_component_1.TeamParticipantsComponent },
        ] },
];
var TeamsRoutingModule = /** @class */ (function () {
    function TeamsRoutingModule() {
    }
    TeamsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], TeamsRoutingModule);
    return TeamsRoutingModule;
}());
exports.TeamsRoutingModule = TeamsRoutingModule;
//# sourceMappingURL=teams-routing.module.js.map