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
var router_1 = require("@angular/router");
var meta_page_service_1 = require("@app/core/meta-page.service");
var api_member_service_1 = require("@app/share/api-member.service");
var auth_service_1 = require("@app/auth/auth.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(metaPage, router, api, auth) {
        this.metaPage = metaPage;
        this.router = router;
        this.api = api;
        this.auth = auth;
        this.isLoading = false;
        this.dataForm = {};
        this.formErrors = {};
        this.metaPage.setTitle('Log In');
    }
    LoginComponent.prototype.doSubmit = function () {
        var _this = this;
        if (this.isLoading === true) {
            return false;
        }
        this.isLoading = true;
        this.formErrors = {};
        this.api.send('auth/token', {}, this.dataForm).then(function (res) {
            _this.isLoading = false;
            if (!res['errors']) {
                _this.auth.setToken(res['access_token'], res['expires_in']);
                _this.auth.setRefreshToken(res['refresh_token']);
                _this.auth.setUser(res['user']);
                _this.router.navigate(['/']);
            }
            else {
                setTimeout(function () {
                    _this.formErrors = res['errors'];
                }, 200);
            }
        }).catch(function (err) {
            console.error(err);
            _this.isLoading = false;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            api_member_service_1.ApiMemberService,
            auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map