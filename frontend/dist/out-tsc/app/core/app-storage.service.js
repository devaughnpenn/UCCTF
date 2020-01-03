"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppStorageService = /** @class */ (function () {
    function AppStorageService() {
        this.prefix = '_app';
    }
    AppStorageService.prototype.getPrefixedKey = function (key) {
        return this.prefix + key;
    };
    AppStorageService.prototype.setParam = function (key, value) {
        var query_key = this.getPrefixedKey(key);
        try {
            localStorage.setItem(query_key, JSON.stringify({ 'data': value }));
        }
        catch (e) {
            if (console) {
                console.warn('localStorage didn\'t successfully save the \'{' + key + ': ' + value + '}\' pair, because the localStorage is full.');
            }
        }
    };
    AppStorageService.prototype.getParam = function (key, missing) {
        if (missing === void 0) { missing = null; }
        var query_key = this.getPrefixedKey(key);
        var value;
        try {
            value = JSON.parse(localStorage.getItem(query_key));
        }
        catch (e) {
            if (localStorage[query_key]) {
                value = { data: localStorage.getItem(query_key) };
            }
            else {
                value = null;
            }
        }
        if (value === null) {
            return missing;
        }
        else if (typeof value === 'object' && typeof value.data !== 'undefined') {
            return value.data;
        }
        else {
            return missing;
        }
    };
    AppStorageService = __decorate([
        core_1.Injectable()
    ], AppStorageService);
    return AppStorageService;
}());
exports.AppStorageService = AppStorageService;
//# sourceMappingURL=app-storage.service.js.map