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
var WoPaginatorComponent = /** @class */ (function () {
    function WoPaginatorComponent() {
        this.maxButtonCount = 9;
        this.pagerList = [];
        this.changePage = new core_1.EventEmitter();
    }
    WoPaginatorComponent.prototype.ngOnChanges = function () {
        this.getPagerList();
    };
    WoPaginatorComponent.prototype.getPagerList = function () {
        if (this.current) {
            this.pagerList = [];
            var beginPage = Math.max(0, Math.floor(this.current - this.maxButtonCount / 2));
            var endPage = beginPage + this.maxButtonCount - 1;
            if (endPage >= this.last) {
                endPage = this.last - 1;
                beginPage = Math.max(0, endPage * 1 - this.maxButtonCount * 1 + 1);
            }
            for (var index = beginPage; index <= endPage; index++) {
                this.pagerList.push({
                    num: index + 1,
                    isDisabled: false,
                    isActive: index + 1 === this.current * 1
                });
            }
            if (this.pagerList[0] && this.pagerList[0].num > 2) {
                this.pagerList[0] = {
                    num: 1,
                    isDisabled: false,
                    isActive: false
                };
                this.pagerList[1] = {
                    num: '...',
                    isActive: false,
                    isDisabled: true
                };
            }
            if (this.pagerList[this.pagerList.length - 1] && this.pagerList[this.pagerList.length - 1].num < this.last - 2) {
                this.pagerList[this.pagerList.length - 2] = {
                    num: '...',
                    isActive: false,
                    isDisabled: true
                };
                this.pagerList[this.pagerList.length - 1] = {
                    num: this.last,
                    isDisabled: false,
                    isActive: false
                };
            }
            return this.pagerList;
        }
    };
    WoPaginatorComponent.prototype.next = function () {
        if (this.current < this.last) {
            this.setPage({ num: this.current * 1 + 1, isDisabled: false });
        }
    };
    WoPaginatorComponent.prototype.prev = function () {
        if (this.current > 1) {
            this.setPage({ num: this.current * 1 - 1, isDisabled: false });
        }
    };
    WoPaginatorComponent.prototype.setPage = function (p) {
        if (p.isDisabled === false) {
            this.changePage.emit({ page: p.num });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], WoPaginatorComponent.prototype, "current", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], WoPaginatorComponent.prototype, "last", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WoPaginatorComponent.prototype, "changePage", void 0);
    WoPaginatorComponent = __decorate([
        core_1.Component({
            selector: 'wo-paginator',
            templateUrl: 'wo-paginator.component.html',
            styleUrls: ['wo-paginator.component.css'],
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], WoPaginatorComponent);
    return WoPaginatorComponent;
}());
exports.WoPaginatorComponent = WoPaginatorComponent;
//# sourceMappingURL=wo-paginator.component.js.map