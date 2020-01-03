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
    useExisting: core_1.forwardRef(function () { return WoCheckboxComponent; })
    /* tslint:enable */
};
var noop = function () { };
var WoCheckboxComponent = /** @class */ (function () {
    function WoCheckboxComponent() {
        // The internal data model
        this.isChecked = false;
        this.trueValue = true;
        this.falseValue = false;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    // From ControlValueAccessor interface
    WoCheckboxComponent.prototype.writeValue = function (value) {
        if (value !== this.isChecked) {
            this.isChecked = value === this.trueValue;
            this.onChangeCallback(this.isChecked ? this.trueValue : this.falseValue);
        }
    };
    // From ControlValueAccessor interface
    WoCheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    WoCheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    WoCheckboxComponent.prototype.ngOnInit = function () {
        this.isChecked = !!this.checked;
    };
    WoCheckboxComponent.prototype.onChange = function (event) {
        this.isChecked = !!event.target.checked;
        this.onChangeCallback(this.isChecked ? this.trueValue : this.falseValue);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WoCheckboxComponent.prototype, "checked", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WoCheckboxComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoCheckboxComponent.prototype, "trueValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoCheckboxComponent.prototype, "falseValue", void 0);
    WoCheckboxComponent = __decorate([
        core_1.Component({
            selector: 'wo-checkbox',
            templateUrl: 'wo-checkbox.component.html',
            styleUrls: ['wo-checkbox.component.css'],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        core_1.Injectable()
    ], WoCheckboxComponent);
    return WoCheckboxComponent;
}());
exports.WoCheckboxComponent = WoCheckboxComponent;
//# sourceMappingURL=wo-checkbox.component.js.map