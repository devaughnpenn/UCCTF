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
var wo_dialog_directive_1 = require("./wo-dialog.directive");
var WoDialogComponent = /** @class */ (function () {
    function WoDialogComponent(_componentFactoryResolver) {
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    WoDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.woDialogEl.nativeElement.className += ' loaded';
            var componentFactory = _this._componentFactoryResolver.resolveComponentFactory(_this.dialog.component);
            var viewContainerRef = _this.woDialogHost.viewContainerRef;
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.dialog = _this.dialog;
            componentRef.changeDetectorRef.detectChanges();
        }, 0);
    };
    WoDialogComponent.prototype.close = function () {
        this.dialog.close(null);
    };
    __decorate([
        core_1.ViewChild(wo_dialog_directive_1.WoDialogDirective, { static: false }),
        __metadata("design:type", wo_dialog_directive_1.WoDialogDirective)
    ], WoDialogComponent.prototype, "woDialogHost", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoDialogComponent.prototype, "dialog", void 0);
    __decorate([
        core_1.ViewChild('woDialogEl', { read: core_1.ElementRef, static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoDialogComponent.prototype, "woDialogEl", void 0);
    WoDialogComponent = __decorate([
        core_1.Component({
            selector: 'wo-dialog',
            template: "\n        <div class=\"c-wo-dialog\" #woDialogEl [ngStyle]=\"dialog?.options?.css\">\n            <div class=\"c-wo-dialog__content\">\n                <a href=\"javascript:void(0);\" class=\"c-wo-dialog__close-btn\" (click)=\"close()\">\u00D7</a>\n                <ng-template appWoDialogHost></ng-template>\n            </div>\n        </div>\n    ",
            styleUrls: ['wo-dialog.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], WoDialogComponent);
    return WoDialogComponent;
}());
exports.WoDialogComponent = WoDialogComponent;
//# sourceMappingURL=wo-dialog.component.js.map