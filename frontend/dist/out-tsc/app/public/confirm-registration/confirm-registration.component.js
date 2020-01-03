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
var wo_breadcrumbs_service_1 = require("../../wo-module/wo-breadcrumbs/wo-breadcrumbs.service");
var meta_page_service_1 = require("../../core/meta-page.service");
var api_general_service_1 = require("@app/share/api-general.service");
var auth_service_1 = require("@app/auth/auth.service");
var ConfirmRegistrationComponent = /** @class */ (function () {
    function ConfirmRegistrationComponent(metaPage, router, activeRoute, breadcrumbs, api, auth) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.api = api;
        this.auth = auth;
        this.hasError = false;
    }
    ConfirmRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.token = params['token'] || '';
            _this.doCheckToken();
        });
    };
    ConfirmRegistrationComponent.prototype.doCheckToken = function () {
        var _this = this;
        this.api.send('auth/confirm-registration', { token: this.token }, {}).then(function (res) {
            if (res['status'] === 200) {
                _this.auth.setToken(res['access_token'], res['expires_in']);
                _this.auth.setRefreshToken(res['refresh_token']);
                _this.auth.setUser(res['user']);
                _this.router.navigate(['/success-registration']);
            }
            else {
                _this.hasError = true;
            }
        });
    };
    ConfirmRegistrationComponent = __decorate([
        core_1.Component({
            templateUrl: 'confirm-registration.component.html',
            styleUrls: ['confirm-registration.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            api_general_service_1.ApiGeneralService,
            auth_service_1.AuthService])
    ], ConfirmRegistrationComponent);
    return ConfirmRegistrationComponent;
}());
exports.ConfirmRegistrationComponent = ConfirmRegistrationComponent;
//# sourceMappingURL=confirm-registration.component.js.map