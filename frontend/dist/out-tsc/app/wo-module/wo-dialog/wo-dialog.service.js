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
var wo_dialog_1 = require("./wo-dialog");
var WoDialogService = /** @class */ (function () {
    function WoDialogService() {
        this.dialogItems = [];
        return WoDialogService_1.instance = WoDialogService_1.instance || this;
    }
    WoDialogService_1 = WoDialogService;
    WoDialogService.prototype.open = function (component, options) {
        document.body.classList.add('modal-open');
        if ('activeElement' in document) {
            document.activeElement['blur']();
        }
        var ref = new wo_dialog_1.WoDialog(component, options, this);
        this.dialogItems.push(ref);
        return ref;
    };
    WoDialogService.prototype.close = function (dialog, result) {
        this.dialogItems.splice(this.dialogItems.indexOf(dialog), 1);
        if (this.dialogItems.length < 1) {
            document.body.classList.remove('modal-open');
        }
    };
    WoDialogService.prototype.closeAll = function (result) {
        for (var i = this.dialogItems.length - 1; i >= 0; i--) {
            this.dialogItems[i].close(result);
        }
    };
    var WoDialogService_1;
    WoDialogService = WoDialogService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], WoDialogService);
    return WoDialogService;
}());
exports.WoDialogService = WoDialogService;
//# sourceMappingURL=wo-dialog.service.js.map