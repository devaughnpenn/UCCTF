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
var wo_dialog_service_1 = require("./wo-dialog.service");
var router_1 = require("@angular/router");
var WoDialogsComponent = /** @class */ (function () {
    function WoDialogsComponent(dialog, router) {
        var _this = this;
        this.dialog = dialog;
        this.router = router;
        this.router.events.subscribe(function (params) {
            _this.dialog.closeAll(null);
        });
    }
    WoDialogsComponent.prototype.onKeydown = function (event) {
        if (this.dialog.dialogItems.length > 0) {
            if (event.keyCode === 27) { // Esc
                this.dialog.dialogItems[this.dialog.dialogItems.length - 1].close(null);
            }
        }
    };
    WoDialogsComponent.prototype.onMouseDown = function (event) {
        if (this.dialog.dialogItems.length > 0) {
            var lastIndex = this.dialog.dialogItems.length - 1;
            var elemRef = document.querySelector('[data-dialog-id="' + lastIndex + '"] .c-wo-dialog');
            var clickedInside = elemRef.contains(event.target);
            if (!clickedInside && document.contains(event.target)) {
                this.dialog.dialogItems[lastIndex].close(null);
            }
        }
    };
    __decorate([
        core_1.HostListener('window:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WoDialogsComponent.prototype, "onKeydown", null);
    WoDialogsComponent = __decorate([
        core_1.Component({
            selector: 'app-wo-dialogs',
            template: "\n        <div class=\"c-wo-dialogs\" [class.dialog-open]=\"dialog.dialogItems.length\">\n            <div (click)=\"onMouseDown($event)\" class=\"c-wo-dialog_item\" *ngFor=\"let dialogItem of dialog.dialogItems; index as di\">\n                <wo-dialog [attr.data-dialog-id]=\"di\" [dialog]=\"dialogItem\"></wo-dialog>\n            </div>\n        </div>\n        <div *ngIf=\"dialog.dialogItems.length > 0\" class=\"c-wo-dialogs__bg\"></div>\n    ",
            styleUrls: ['wo-dialogs.component.css'],
        }),
        __metadata("design:paramtypes", [wo_dialog_service_1.WoDialogService, router_1.Router])
    ], WoDialogsComponent);
    return WoDialogsComponent;
}());
exports.WoDialogsComponent = WoDialogsComponent;
//# sourceMappingURL=wo-dialogs.component.js.map