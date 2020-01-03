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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var WoFlashService = /** @class */ (function () {
    function WoFlashService() {
        this.errorMessages = [];
        this.successMessages = [];
        this.flashchange = new BehaviorSubject_1.BehaviorSubject(false);
        return WoFlashService_1.instance = WoFlashService_1.instance || this;
    }
    WoFlashService_1 = WoFlashService;
    WoFlashService.prototype.addError = function (msg) {
        var _this = this;
        if (typeof msg === 'string') {
            this.errorMessages.push(msg);
        }
        else if (typeof msg === 'object') {
            Object.keys(msg).map(function (key) {
                _this.errorMessages.push(msg[key]);
            });
        }
    };
    WoFlashService.prototype.addMessage = function (msg) {
        var _this = this;
        if (typeof msg === 'string') {
            this.successMessages.push(msg);
        }
        else if (typeof msg === 'object') {
            Object.keys(msg).map(function (key) {
                _this.successMessages.push(msg[key]);
            });
        }
    };
    WoFlashService.prototype.show = function (block, scroll) {
        if (block === void 0) { block = 'main'; }
        if (scroll === void 0) { scroll = false; }
        if (scroll === true) {
            window.scrollTo(0, 0);
        }
        this.flashchange.next({
            errors: this.errorMessages,
            success: this.successMessages,
            block: block
        });
        this.flush();
    };
    WoFlashService.prototype.hide = function () {
        this.flashchange.next({
            errors: [],
            success: []
        });
    };
    WoFlashService.prototype.flush = function () {
        this.errorMessages = [];
        this.successMessages = [];
    };
    WoFlashService.prototype.geFlashChange = function () {
        return this.flashchange;
    };
    var WoFlashService_1;
    WoFlashService = WoFlashService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], WoFlashService);
    return WoFlashService;
}());
exports.WoFlashService = WoFlashService;
//# sourceMappingURL=wo-flash.service.js.map