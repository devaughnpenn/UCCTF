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
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    multi: true,
    /* tslint:disable */
    useExisting: core_1.forwardRef(function () { return WoRadioComponent; })
    /* tslint:enable */
};
var noop = function () { };
var WoRadioComponent = /** @class */ (function () {
    function WoRadioComponent() {
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    // From ControlValueAccessor interface
    WoRadioComponent.prototype.writeValue = function (value) {
        if (this.value === value) {
            this.checked = true;
        }
        else {
            this.checked = false;
        }
        if (this.checked === true) {
            this.onChangeCallback(this.value);
        }
    };
    // From ControlValueAccessor interface
    WoRadioComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    WoRadioComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    WoRadioComponent.prototype.onChange = function (event) {
        this.checked = true;
        this.onChangeCallback(this.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WoRadioComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WoRadioComponent.prototype, "name", void 0);
    WoRadioComponent = __decorate([
        core_1.Component({
            selector: 'wo-radio',
            templateUrl: 'wo-radio.component.html',
            styleUrls: ['wo-radio.component.css'],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        })
    ], WoRadioComponent);
    return WoRadioComponent;
}());
exports.WoRadioComponent = WoRadioComponent;
//# sourceMappingURL=wo-radio.component.js.map