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
var wo_flash_service_1 = require("./wo-flash.service");
var WoFlashComponent = /** @class */ (function () {
    function WoFlashComponent(woFlash) {
        var _this = this;
        this.woFlash = woFlash;
        this.block = 'main';
        this.errorPool = [];
        this.successPool = [];
        woFlash.geFlashChange().subscribe(function (props) { _this.doRender(props); });
    }
    WoFlashComponent.prototype.doRender = function (props) {
        var data = {
            errors: this.woFlash.errorMessages,
            success: this.woFlash.successMessages
        };
        this.errorPool = [];
        this.successPool = [];
        if (props.block === this.block) {
            if (data && data['errors'] && data['errors'][0]) {
                this.errorPool = data['errors'];
            }
            else if (data && data['success'] && data['success'][0]) {
                this.successPool = data['success'];
            }
        }
    };
    WoFlashComponent.prototype.doFlush = function () {
        this.errorPool = [];
        this.successPool = [];
        this.woFlash.flush();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoFlashComponent.prototype, "block", void 0);
    WoFlashComponent = __decorate([
        core_1.Component({
            selector: 'wo-flash',
            templateUrl: 'wo-flash.component.html',
            styleUrls: ['wo-flash.component.css'],
        }),
        __metadata("design:paramtypes", [wo_flash_service_1.WoFlashService])
    ], WoFlashComponent);
    return WoFlashComponent;
}());
exports.WoFlashComponent = WoFlashComponent;
//# sourceMappingURL=wo-flash.component.js.map