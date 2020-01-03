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
var api_general_service_1 = require("@app/share/api-general.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var RequestPasswordResetComponent = /** @class */ (function () {
    function RequestPasswordResetComponent(metaPage, router, activeRoute, api, woFlash) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.api = api;
        this.woFlash = woFlash;
        this.dataForm = {};
        this.formErrors = {};
        this.metaPage.setTitle('Request Password Reset');
    }
    RequestPasswordResetComponent.prototype.doSubmit = function () {
        var _this = this;
        this.woFlash.hide();
        this.api.send('auth/forgot-password', { email: this.dataForm['email'] || '' }, {}).then(function (res) {
            if (res['errors']) {
                _this.formErrors = res['errors'];
            }
            else {
                _this.dataForm['email'] = '';
                _this.formErrors = {};
                setTimeout(function () {
                    _this.woFlash.addMessage('The operation was successfully done!');
                    _this.woFlash.show();
                }, 100);
            }
        });
    };
    RequestPasswordResetComponent = __decorate([
        core_1.Component({
            templateUrl: 'request-password-reset.component.html',
            styleUrls: ['request-password-reset.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            api_general_service_1.ApiGeneralService,
            wo_flash_service_1.WoFlashService])
    ], RequestPasswordResetComponent);
    return RequestPasswordResetComponent;
}());
exports.RequestPasswordResetComponent = RequestPasswordResetComponent;
//# sourceMappingURL=request-password-reset.component.js.map