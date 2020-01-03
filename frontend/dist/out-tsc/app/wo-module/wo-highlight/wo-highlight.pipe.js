"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WoHighlightPipe = /** @class */ (function () {
    function WoHighlightPipe() {
    }
    WoHighlightPipe.prototype.transform = function (text, search) {
        if (search && text) {
            var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            pattern = pattern.split(' ').filter(function (t) {
                return t.length > 0;
            }).join('|');
            var regex = new RegExp(pattern, 'gi');
            return text.replace(regex, function (match) { return "<span class=\"wo-highlight\">" + match + "</span>"; });
        }
        else {
            return text;
        }
    };
    WoHighlightPipe = __decorate([
        core_1.Pipe({ name: 'woHighlight' })
    ], WoHighlightPipe);
    return WoHighlightPipe;
}());
exports.WoHighlightPipe = WoHighlightPipe;
//# sourceMappingURL=wo-highlight.pipe.js.map