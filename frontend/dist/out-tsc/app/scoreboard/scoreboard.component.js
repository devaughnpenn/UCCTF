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
var auth_service_1 = require("@app/auth/auth.service");
var router_1 = require("@angular/router");
var environment_1 = require("../../environments/environment");
var ScoreboardComponent = /** @class */ (function () {
    function ScoreboardComponent(render, auth, router) {
        this.render = render;
        this.auth = auth;
        this.router = router;
        this.title = environment_1.environment.APP_NAME;
        this.render.addClass(document.body, 'scoremodule-module');
    }
    ScoreboardComponent.prototype.ngOnDestroy = function () {
        this.render.removeClass(document.body, 'scoremodule-module');
    };
    ScoreboardComponent = __decorate([
        core_1.Component({
            selector: 'app-scoreboard-root',
            templateUrl: './scoreboard.component.html',
            styleUrls: ['./scoreboard.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            auth_service_1.AuthService,
            router_1.Router])
    ], ScoreboardComponent);
    return ScoreboardComponent;
}());
exports.ScoreboardComponent = ScoreboardComponent;
//# sourceMappingURL=scoreboard.component.js.map