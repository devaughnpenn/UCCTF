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
var meta_page_service_1 = require("../../core/meta-page.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var router_1 = require("@angular/router");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(metaPage, woFlash, router) {
        this.metaPage = metaPage;
        this.woFlash = woFlash;
        this.router = router;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/admin/']);
        this.woFlash.show();
        this.metaPage.setTitle('Home');
    };
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            wo_flash_service_1.WoFlashService,
            router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map