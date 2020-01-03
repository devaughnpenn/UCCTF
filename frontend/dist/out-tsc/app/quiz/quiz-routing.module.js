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
var quiz_component_1 = require("./quiz.component");
var login_component_1 = require("./login/login.component");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: ':hash', component: quiz_component_1.QuizComponent },
];
var QuizRoutingModule = /** @class */ (function () {
    function QuizRoutingModule() {
    }
    QuizRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], QuizRoutingModule);
    return QuizRoutingModule;
}());
exports.QuizRoutingModule = QuizRoutingModule;
//# sourceMappingURL=quiz-routing.module.js.map