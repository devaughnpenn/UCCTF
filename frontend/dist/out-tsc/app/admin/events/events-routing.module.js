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
var events_list_component_1 = require("./events-list/events-list.component");
var event_tabs_component_1 = require("./event-tabs/event-tabs.component");
var event_profile_component_1 = require("./event-profile/event-profile.component");
var event_teams_component_1 = require("./event-teams/event-teams.component");
var event_scoreboard_component_1 = require("./event-scoreboard/event-scoreboard.component");
var quiz_questions_component_1 = require("@app/admin/events/quiz-questions/quiz-questions.component");
var event_results_component_1 = require("./event-results/event-results.component");
var routes = [
    { path: '', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: events_list_component_1.EventsListComponent },
    { path: ':id', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: event_tabs_component_1.EventTabsComponent, children: [
            { path: '', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: event_profile_component_1.EventProfileComponent },
            { path: 'teams', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: event_teams_component_1.EventTeamsComponent },
            { path: 'scoreboard', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: event_scoreboard_component_1.EventScoreboardComponent },
            { path: 'questions', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: quiz_questions_component_1.QuizQuestionsComponent },
            { path: 'results', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: event_results_component_1.EventResultsComponent },
        ] },
];
var EventsRoutingModule = /** @class */ (function () {
    function EventsRoutingModule() {
    }
    EventsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], EventsRoutingModule);
    return EventsRoutingModule;
}());
exports.EventsRoutingModule = EventsRoutingModule;
//# sourceMappingURL=events-routing.module.js.map