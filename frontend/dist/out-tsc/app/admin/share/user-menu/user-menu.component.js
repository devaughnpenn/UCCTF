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
var UserMenuComponent = /** @class */ (function () {
    function UserMenuComponent(auth, router) {
        var _this = this;
        this.auth = auth;
        this.router = router;
        this.isOpen = false;
        this.userId = 0;
        this.authService = this.auth;
        this.userId = this.auth.user['id'];
        document.addEventListener('mouseup', function (event) {
            var toggleState = _this.isOpen;
            setTimeout(function () {
                if (toggleState === true) {
                    _this.isOpen = false;
                }
            }, 1);
        });
    }
    UserMenuComponent.prototype.toggleMenu = function () {
        this.isOpen = !this.isOpen;
    };
    UserMenuComponent.prototype.myProfile = function () {
        this.router.navigate(['/admin/users', this.auth.user['id']]);
    };
    UserMenuComponent.prototype.logOut = function () {
        this.authService.logout();
        this.router.navigate(['/admin/login']);
    };
    UserMenuComponent = __decorate([
        core_1.Component({
            selector: 'app-user-menu',
            templateUrl: 'user-menu.component.html',
            styleUrls: ['user-menu.component.css'],
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router])
    ], UserMenuComponent);
    return UserMenuComponent;
}());
exports.UserMenuComponent = UserMenuComponent;
//# sourceMappingURL=user-menu.component.js.map