"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ConvertFrom24To12Format = /** @class */ (function () {
    function ConvertFrom24To12Format() {
    }
    ConvertFrom24To12Format.prototype.transform = function (time) {
        var hour = (time.split(':'))[0];
        var min = (time.split(':'))[1];
        var part = hour > 12 ? 'PM' : 'AM';
        min = (min + '').length == 1 ? "0" + min : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? "0" + hour : hour;
        return hour + ":" + min + " " + part;
    };
    ConvertFrom24To12Format = __decorate([
        core_1.Pipe({ name: 'ConvertFrom24To12Format' })
    ], ConvertFrom24To12Format);
    return ConvertFrom24To12Format;
}());
exports.ConvertFrom24To12Format = ConvertFrom24To12Format;
//# sourceMappingURL=convert-from-24-to-12-format.pipe.js.map