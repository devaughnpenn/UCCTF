"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var wo_module_1 = require("@app/wo-module/wo.module");
var teams_routing_module_1 = require("./teams-routing.module");
var team_list_component_1 = require("./team-list/team-list.component");
var team_tabs_component_1 = require("./team-tabs/team-tabs.component");
var team_profile_component_1 = require("./team-profile/team-profile.component");
var team_participants_component_1 = require("./team-participants/team-participants.component");
var TeamsModule = /** @class */ (function () {
    function TeamsModule() {
    }
    TeamsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                wo_module_1.WoModule,
                teams_routing_module_1.TeamsRoutingModule,
            ],
            declarations: [
                team_list_component_1.TeamListComponent,
                team_tabs_component_1.TeamTabsComponent,
                team_profile_component_1.TeamProfileComponent,
                team_participants_component_1.TeamParticipantsComponent,
            ]
        })
    ], TeamsModule);
    return TeamsModule;
}());
exports.TeamsModule = TeamsModule;
//# sourceMappingURL=teams.module.js.map