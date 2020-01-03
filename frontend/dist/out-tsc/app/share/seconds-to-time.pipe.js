"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SecondsToTimePipe = /** @class */ (function () {
    function SecondsToTimePipe() {
    }
    SecondsToTimePipe.prototype.transform = function (seconds, exponent) {
        if (seconds === null || typeof seconds === 'undefined') {
            return '--:--:--';
        }
        else if (seconds < 0) {
            seconds = 0;
        }
        var date = new Date(null);
        date.setSeconds(seconds); // specify value for SECONDS here
        if (exponent === 'minutes') {
            if (seconds < 3600) {
                return date.toISOString().substr(14, 5);
            }
            else {
                return Math.floor(seconds / 60) + ':' + date.toISOString().substr(17, 2);
            }
        }
        else {
            if (seconds < 36000) {
                return date.toISOString().substr(11, 8);
            }
            else {
                return Math.floor(seconds / 60 / 60) + ':' + date.toISOString().substr(14, 5);
            }
        }
    };
    SecondsToTimePipe = __decorate([
        core_1.Pipe({ name: 'secondsToTime' })
    ], SecondsToTimePipe);
    return SecondsToTimePipe;
}());
exports.SecondsToTimePipe = SecondsToTimePipe;
//# sourceMappingURL=seconds-to-time.pipe.js.map