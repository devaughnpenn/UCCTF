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
var scoreboard_component_1 = require("./scoreboard.component");
var display_component_1 = require("./display/display.component");
var scoreboard_not_found_component_1 = require("./scoreboard-not-found/scoreboard-not-found.component");
var routes = [
    { path: 'scoreboard-not-found', component: scoreboard_not_found_component_1.ScoreboardNotFoundComponent },
    {
        path: '', component: scoreboard_component_1.ScoreboardComponent,
        children: [
            { path: ':access-key', component: display_component_1.DisplayComponent },
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ],
    },
];
var ScoreboardRoutingModule = /** @class */ (function () {
    function ScoreboardRoutingModule() {
    }
    ScoreboardRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ScoreboardRoutingModule);
    return ScoreboardRoutingModule;
}());
exports.ScoreboardRoutingModule = ScoreboardRoutingModule;
//# sourceMappingURL=scoreboard-routing.module.js.map