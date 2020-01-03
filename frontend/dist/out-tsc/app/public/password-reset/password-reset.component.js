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
var meta_page_service_1 = require("../../core/meta-page.service");
var api_general_service_1 = require("@app/share/api-general.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var auth_service_1 = require("@app/auth/auth.service");
var PasswordResetComponent = /** @class */ (function () {
    function PasswordResetComponent(metaPage, router, activeRoute, api, woFlash, auth) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.api = api;
        this.woFlash = woFlash;
        this.auth = auth;
        this.isLoading = true;
        this.isError = false;
        this.token = '';
        this.dataForm = {};
        this.formErrors = {};
    }
    PasswordResetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (res) {
            _this.token = res['token'] || '';
            _this.api.send('auth/check-password-reset-token', { token: _this.token }).then(function (result) {
                _this.isLoading = false;
                if (result['status'] === 200) {
                }
                else {
                    _this.isError = true;
                }
            });
        });
    };
    PasswordResetComponent.prototype.doSubmit = function () {
        var _this = this;
        this.dataForm['token'] = this.token;
        this.api.send('auth/password-reset', {}, this.dataForm).then(function (res) {
            if (res['errors']) {
                _this.formErrors = res['errors'];
            }
            else {
                _this.formErrors = {};
                _this.auth.setToken(res['access_token'], res['expires_in']);
                _this.auth.setRefreshToken(res['refresh_token']);
                _this.auth.setUser(res['user']);
                _this.router.navigate(['/']);
                _this.woFlash.addMessage('The operation was successfully done!');
            }
        });
    };
    PasswordResetComponent = __decorate([
        core_1.Component({
            templateUrl: 'password-reset.component.html',
            styleUrls: ['password-reset.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            api_general_service_1.ApiGeneralService,
            wo_flash_service_1.WoFlashService,
            auth_service_1.AuthService])
    ], PasswordResetComponent);
    return PasswordResetComponent;
}());
exports.PasswordResetComponent = PasswordResetComponent;
//# sourceMappingURL=password-reset.component.js.map