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
var SignupComponent = /** @class */ (function () {
    function SignupComponent(metaPage, router, activeRoute, api) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.api = api;
        this.dataForm = {};
        this.formErrors = {};
        this.isConfirm = 0;
        this.metaPage.setTitle('Sign Up');
    }
    SignupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.isConfirm = parseInt(params['confirm'], 10) || 0;
        });
    };
    SignupComponent.prototype.doSubmit = function () {
        var _this = this;
        this.api.send('auth/signup', {}, this.dataForm).then(function (res) {
            if (res['errors']) {
                _this.formErrors = res['errors'];
            }
            else {
                _this.formErrors = {};
                _this.router.navigate(['/signup', { confirm: 1 }]);
            }
        });
    };
    SignupComponent = __decorate([
        core_1.Component({
            templateUrl: 'signup.component.html',
            styleUrls: ['signup.component.css'],
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            api_general_service_1.ApiGeneralService])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map