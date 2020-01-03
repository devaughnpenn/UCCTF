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
var WoDialogPromptComponent = /** @class */ (function () {
    function WoDialogPromptComponent() {
        this.message = '';
        this.value = '';
    }
    WoDialogPromptComponent.prototype.ngAfterViewInit = function () {
        if (this.dialog.options && this.dialog.options.message) {
            this.message = this.dialog.options.message;
        }
        this.inputEl.nativeElement.focus();
    };
    WoDialogPromptComponent.prototype.onKeyDown = function (event) {
        if (event['keyCode'] === 13) {
            this.close(true);
        }
    };
    WoDialogPromptComponent.prototype.close = function (result) {
        if (result === true) {
            if (this.value !== '') {
                this.dialog.close(this.value);
            }
        }
        else {
            this.dialog.close(false);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoDialogPromptComponent.prototype, "dialog", void 0);
    __decorate([
        core_1.ViewChild('inputEl', { read: core_1.ElementRef, static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoDialogPromptComponent.prototype, "inputEl", void 0);
    WoDialogPromptComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"wo-dialog-prompt__body\">\n            {{message}}\n        </div>\n        <div class=\"wo-dialog-prompt__input\">\n            <input class=\"form-control\" type=\"text\" #inputEl (keydown)=\"onKeyDown($event)\" [(ngModel)]=\"value\"/>\n        </div>\n        <div class=\"wo-dialog-prompt__buttons\">\n            <a class=\"btn btn-default\" href=\"javascript:void(0);\" (click)=\"close(false)\">Cancel</a>\n            <a class=\"btn btn-primary\" href=\"javascript:void(0);\" (click)=\"close(true)\">OK</a>\n        </div>\n    ",
            styles: ["\n        .wo-dialog-prompt__body {\n            padding: 35px 15px 5px;\n        }\n        .wo-dialog-prompt__input {\n            padding-left: 15px;\n            padding-bottom: 15px;\n            padding-right: 15px;\n        }\n        .wo-dialog-prompt__input input[type=text] {\n            width: 100%;\n        }\n        .wo-dialog-prompt__buttons {\n            padding: 8px 10px 8px;\n            text-align: right;\n            border-top: 1px solid #eaeaea;\n        }\n        .wo-dialog-prompt__buttons a {\n            min-width: 50px;\n        }\n    "],
        })
    ], WoDialogPromptComponent);
    return WoDialogPromptComponent;
}());
exports.WoDialogPromptComponent = WoDialogPromptComponent;
//# sourceMappingURL=wo-dialog-prompt.component.js.map