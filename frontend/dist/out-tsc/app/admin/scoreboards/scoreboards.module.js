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
var share_module_1 = require("@app/share/share.module");
var scoreboards_routing_module_1 = require("./scoreboards-routing.module");
var scoreboards_template_list_component_1 = require("./scoreboards-template-list/scoreboards-template-list.component");
var scoreboard_template_profile_component_1 = require("./scoreboard-template-profile/scoreboard-template-profile.component");
var ScoreboardsModule = /** @class */ (function () {
    function ScoreboardsModule() {
    }
    ScoreboardsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                wo_module_1.WoModule,
                share_module_1.ShareModule,
                scoreboards_routing_module_1.ScoreboardsRoutingModule,
            ],
            declarations: [
                scoreboards_template_list_component_1.ScoreboardTemplateListComponent,
                scoreboard_template_profile_component_1.ScoreboardTemplateProfileComponent,
            ]
        })
    ], ScoreboardsModule);
    return ScoreboardsModule;
}());
exports.ScoreboardsModule = ScoreboardsModule;
//# sourceMappingURL=scoreboards.module.js.map