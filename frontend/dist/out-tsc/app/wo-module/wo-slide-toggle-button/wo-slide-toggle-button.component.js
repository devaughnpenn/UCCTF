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
var forms_1 = require("@angular/forms");
var noop = function () { };
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    multi: true,
    /* tslint:disable */
    useExisting: core_1.forwardRef(function () { return WoSlideToggleButtonComponent; })
    /* tslint:enable */
};
var WoSlideToggleButtonComponent = /** @class */ (function () {
    function WoSlideToggleButtonComponent() {
        // The internal data model
        this.isChecked = false;
        this.trueValue = true;
        this.falseValue = false;
        this.disabled = false;
        this.textON = 'ON';
        this.textOFF = 'OFF';
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    // From ControlValueAccessor interface
    WoSlideToggleButtonComponent.prototype.writeValue = function (value) {
        if (value !== null) {
            this.isChecked = value === this.trueValue;
            this.onChangeCallback(this.isChecked ? this.trueValue : this.falseValue);
        }
    };
    // From ControlValueAccessor interface
    WoSlideToggleButtonComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    WoSlideToggleButtonComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    WoSlideToggleButtonComponent.prototype.onToggle = function () {
        if (this.disabled === false) {
            this.isChecked = !this.isChecked;
            this.onChangeCallback(this.isChecked ? this.trueValue : this.falseValue);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WoSlideToggleButtonComponent.prototype, "checked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoSlideToggleButtonComponent.prototype, "trueValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoSlideToggleButtonComponent.prototype, "falseValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoSlideToggleButtonComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoSlideToggleButtonComponent.prototype, "textON", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoSlideToggleButtonComponent.prototype, "textOFF", void 0);
    WoSlideToggleButtonComponent = __decorate([
        core_1.Component({
            selector: 'wo-slide-toggle-button',
            templateUrl: 'wo-slide-toggle-button.component.html',
            styleUrls: ['wo-slide-toggle-button.component.css'],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        core_1.Injectable()
    ], WoSlideToggleButtonComponent);
    return WoSlideToggleButtonComponent;
}());
exports.WoSlideToggleButtonComponent = WoSlideToggleButtonComponent;
//# sourceMappingURL=wo-slide-toggle-button.component.js.map