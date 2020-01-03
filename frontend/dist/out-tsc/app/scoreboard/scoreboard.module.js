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
var wo_module_1 = require("../wo-module/wo.module");
var scoreboard_routing_module_1 = require("./scoreboard-routing.module");
var scoreboard_component_1 = require("./scoreboard.component");
var display_component_1 = require("./display/display.component");
var share_module_1 = require("@app/share/share.module");
var scoreboard_not_found_component_1 = require("./scoreboard-not-found/scoreboard-not-found.component");
var ScoreboardModule = /** @class */ (function () {
    function ScoreboardModule() {
    }
    ScoreboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                wo_module_1.WoModule,
                scoreboard_routing_module_1.ScoreboardRoutingModule,
                share_module_1.ShareModule,
            ],
            declarations: [
                scoreboard_component_1.ScoreboardComponent,
                display_component_1.DisplayComponent,
                scoreboard_not_found_component_1.ScoreboardNotFoundComponent,
            ]
        })
    ], ScoreboardModule);
    return ScoreboardModule;
}());
exports.ScoreboardModule = ScoreboardModule;
//# sourceMappingURL=scoreboard.module.js.map