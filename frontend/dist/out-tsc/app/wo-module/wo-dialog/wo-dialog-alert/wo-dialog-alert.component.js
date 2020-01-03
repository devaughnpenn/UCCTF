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
var WoDialogAlertComponent = /** @class */ (function () {
    function WoDialogAlertComponent() {
        this.message = '';
    }
    WoDialogAlertComponent.prototype.ngAfterViewInit = function () {
        if (this.dialog.options && this.dialog.options.message) {
            this.message = this.dialog.options.message;
        }
    };
    WoDialogAlertComponent.prototype.close = function () {
        this.dialog.close(false);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoDialogAlertComponent.prototype, "dialog", void 0);
    WoDialogAlertComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"wo-dialog-alert__body\">\n            {{message}}\n        </div>\n        <div class=\"wo-dialog-alert__buttons\">\n            <a class=\"btn btn-primary\" href=\"javascript:void(0);\" (click)=\"close()\">OK</a>\n        </div>\n    ",
            styles: ["\n        .wo-dialog-alert__body {\n            padding: 35px 15px 25px;\n        }\n        .wo-dialog-alert__buttons {\n            padding: 8px 10px 8px;\n            text-align: right;\n            border-top: 1px solid #eaeaea;\n        }\n        .wo-dialog-alert__buttons a {\n            min-width: 50px;\n        }\n    "],
        })
    ], WoDialogAlertComponent);
    return WoDialogAlertComponent;
}());
exports.WoDialogAlertComponent = WoDialogAlertComponent;
//# sourceMappingURL=wo-dialog-alert.component.js.map