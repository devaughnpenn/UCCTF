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
var SuccessRegistrationComponent = /** @class */ (function () {
    function SuccessRegistrationComponent(metaPage, router, activeRoute, breadcrumbs) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
    }
    SuccessRegistrationComponent = __decorate([
        core_1.Component({
            templateUrl: 'success-registration.component.html',
            styleUrls: ['success-registration.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService])
    ], SuccessRegistrationComponent);
    return SuccessRegistrationComponent;
}());
exports.SuccessRegistrationComponent = SuccessRegistrationComponent;
//# sourceMappingURL=success-registration.component.js.map