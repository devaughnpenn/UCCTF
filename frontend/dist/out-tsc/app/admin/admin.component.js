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
var AdminComponent = /** @class */ (function () {
    function AdminComponent(render, auth, router) {
        this.render = render;
        this.auth = auth;
        this.router = router;
        this.sideBarToggleStorageKey = '__sideBarToggleStorageKey';
        this.title = environment_1.environment.APP_NAME;
        this.render.addClass(document.body, 'admin-module');
    }
    AdminComponent.prototype.isLogged = function () {
        return !this.auth.isGuest;
    };
    AdminComponent.prototype.logOut = function () {
        this.auth.logout();
        this.router.navigate(['/login']);
    };
    AdminComponent.prototype.isCompactSidebar = function () {
        return !!parseInt(localStorage.getItem(this.sideBarToggleStorageKey), 10);
    };
    AdminComponent.prototype.sidebarToggle = function () {
        localStorage.setItem(this.sideBarToggleStorageKey, this.isCompactSidebar() ? '0' : '1');
    };
    AdminComponent.prototype.showUsersMenu = function () {
        return this.auth.can('admin');
    };
    AdminComponent.prototype.ngOnDestroy = function () {
        this.render.removeClass(document.body, 'admin-module');
    };
    __decorate([
        core_1.HostBinding('class.sidebar-compact'),
        __metadata("design:type", Object)
    ], AdminComponent.prototype, "isCompactSidebar()", void 0);
    __decorate([
        core_1.HostBinding('class.no-logged'),
        __metadata("design:type", Object)
    ], AdminComponent.prototype, "!isLogged()", void 0);
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-root',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            auth_service_1.AuthService,
            router_1.Router])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map