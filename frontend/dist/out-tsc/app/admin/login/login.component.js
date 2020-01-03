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
var platform_browser_1 = require("@angular/platform-browser");
var http_service_1 = require("@app/core/http.service");
var auth_service_1 = require("@app/auth/auth.service");
var router_1 = require("@angular/router");
var environment_1 = require("../../../environments/environment");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(title, http, auth, router) {
        this.title = title;
        this.http = http;
        this.auth = auth;
        this.router = router;
        this.username = '';
        this.password = '';
        this.isLoading = false;
        this.title.setTitle('Login');
        if (this.isLoading && this.auth.can('admin')) {
            this.router.navigate(['/admin/users']);
        }
    }
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        if (this.isLoading === true) {
            return false;
        }
        this.isLoading = true;
        this.formErrors = {};
        this.http.send(environment_1.environment.API_BASE_URL + '/admin/auth/token', null, { username: this.username, password: this.password }).then(function (res) {
            _this.isLoading = false;
            if (!res['errors']) {
                _this.auth.setToken(res['access_token'], res['expires_in']);
                _this.auth.setRefreshToken(res['refresh_token']);
                _this.auth.setUser(res['user']);
                _this.router.navigate(['/admin/users']);
            }
            else {
                setTimeout(function () {
                    _this.formErrors = res['errors'];
                }, 200);
            }
        }).catch(function (res) {
            _this.formErrors = {};
            _this.isLoading = false;
            alert('Oops! Something went wrong.');
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }),
        __metadata("design:paramtypes", [platform_browser_1.Title,
            http_service_1.HttpService,
            auth_service_1.AuthService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map