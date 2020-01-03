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
var WoSortComponent = /** @class */ (function () {
    function WoSortComponent() {
        this.sort = new core_1.EventEmitter();
    }
    Object.defineProperty(WoSortComponent.prototype, "asc", {
        get: function () {
            return this.column() === this.activeColumn() && this.woSortActive.indexOf('-') !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WoSortComponent.prototype, "desc", {
        get: function () {
            return this.column() === this.activeColumn() && this.woSortActive.indexOf('-') === 0;
        },
        enumerable: true,
        configurable: true
    });
    WoSortComponent.prototype.activeColumn = function () {
        return this.woSortActive.indexOf('-') === 0 ? this.woSortActive.substring(1) : this.woSortActive;
    };
    WoSortComponent.prototype.column = function () {
        return this.woSortStart.indexOf('-') === 0 ? this.woSortStart.substring(1) : this.woSortStart;
    };
    WoSortComponent.prototype.setSort = function () {
        this.sort.emit({
            current: (this.desc ? '' : '-') + this.column(),
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoSortComponent.prototype, "woSortActive", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoSortComponent.prototype, "woSortStart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WoSortComponent.prototype, "sort", void 0);
    WoSortComponent = __decorate([
        core_1.Component({
            selector: 'wo-sort',
            templateUrl: './wo-sort.component.html',
            styleUrls: ['./wo-sort.component.css']
        })
    ], WoSortComponent);
    return WoSortComponent;
}());
exports.WoSortComponent = WoSortComponent;
//# sourceMappingURL=wo-sort.component.js.map