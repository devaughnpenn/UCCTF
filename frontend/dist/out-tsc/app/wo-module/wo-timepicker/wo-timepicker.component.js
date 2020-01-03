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
    useExisting: core_1.forwardRef(function () { return WoTimepickerComponent; }),
    multi: true
};
var noop = function () { };
var WoTimepickerComponent = /** @class */ (function () {
    function WoTimepickerComponent(el) {
        this.el = el;
        // The internal data model
        this.innerValue = '';
        this.isOpen = false;
        this.hours = 12;
        this.minutes = 0;
        this.hour12 = true;
        this.isAM = true;
        this.showValue = '';
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    WoTimepickerComponent.prototype.clickOnWindow = function (event) {
        if (this.wrapperEl.nativeElement.contains(event.target) === false) {
            this.isOpen = false;
        }
    };
    Object.defineProperty(WoTimepickerComponent.prototype, "value", {
        // get accessor
        get: function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // From ControlValueAccessor interface
    WoTimepickerComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.parseValue(value);
            this.innerValue = value;
            this.onChangeCallback(this.innerValue);
        }
    };
    // From ControlValueAccessor interface
    WoTimepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    WoTimepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    WoTimepickerComponent.prototype.onChange = function (event) {
        this.onChangeCallback(this.innerValue);
    };
    WoTimepickerComponent.prototype.open = function () {
        this.isOpen = true;
    };
    WoTimepickerComponent.prototype.doUpHour = function () {
        this.hours++;
        if (this.hour12 === true) {
            if (this.hours > 12) {
                this.hours = 1;
            }
        }
        else if (this.hours > 23) {
            this.hours = 0;
        }
        this.updateShowValue();
        this.updateValue();
    };
    WoTimepickerComponent.prototype.doDownHour = function () {
        this.hours--;
        if (this.hours < 1) {
            this.hours = this.hour12 === true ? 12 : 23;
        }
        this.updateShowValue();
        this.updateValue();
    };
    WoTimepickerComponent.prototype.doChangePeriod = function () {
        this.isAM = !this.isAM;
        this.updateShowValue();
        this.updateValue();
    };
    WoTimepickerComponent.prototype.doUpMinute = function () {
        this.minutes += -this.minutes % 5 + 5;
        if (this.minutes > 59) {
            this.minutes = 0;
        }
        this.updateShowValue();
        this.updateValue();
    };
    WoTimepickerComponent.prototype.doDownMinute = function () {
        if (this.minutes % 5 !== 0) {
            this.minutes -= (5 - (5 - this.minutes % 5));
        }
        else {
            this.minutes -= 5;
        }
        if (this.minutes < 0) {
            this.minutes = 55;
        }
        this.updateShowValue();
        this.updateValue();
    };
    WoTimepickerComponent.prototype.parseValue = function (value) {
        if (value) {
            var partsOfStr = value.split(':');
            if (partsOfStr.length > 1) {
                this.hours = parseInt(partsOfStr[0], 10);
                this.minutes = parseInt(partsOfStr[1], 10);
                if (this.hours > 12) {
                    this.isAM = false;
                }
                else {
                    this.isAM = true;
                }
                if (this.hour12 === true) {
                    this.hours = this.hours % 12;
                    if (this.hours === 0) {
                        this.hours = 12;
                    }
                }
            }
            else {
                this.hours = 12;
                this.minutes = 0;
            }
        }
        this.updateShowValue();
        this.updateValue();
    };
    WoTimepickerComponent.prototype.updateValue = function () {
        var hours = (this.isAM === true ? 0 : 12) + this.hours;
        this.value = (hours >= 0 && hours <= 9 ? '0' : '') + hours +
            ':'
            + (this.minutes >= 0 && this.minutes <= 9 ? '0' : '') + this.minutes;
    };
    WoTimepickerComponent.prototype.getFormatValue = function () {
        return (this.hours >= 0 && this.hours <= 9 ? '0' : '') + this.hours + ':'
            + (this.minutes >= 0 && this.minutes <= 9 ? '0' : '') + this.minutes + ' '
            + (this.isAM ? 'AM' : 'PM');
    };
    WoTimepickerComponent.prototype.updateShowValue = function () {
        this.showValue = this.getFormatValue();
    };
    WoTimepickerComponent.prototype.doBlur = function (event) {
        var partsOfStr = event.target.value.split(':');
        if (partsOfStr.length > 1) {
            this.hours = parseInt(partsOfStr[0], 10);
            this.minutes = parseInt(partsOfStr[1], 10);
        }
        this.isAM = event.target.value.toUpperCase().indexOf('AM') !== -1;
        this.updateShowValue();
        this.updateValue();
    };
    __decorate([
        core_1.ViewChild('wrapper', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoTimepickerComponent.prototype, "wrapperEl", void 0);
    __decorate([
        core_1.HostListener('window:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], WoTimepickerComponent.prototype, "clickOnWindow", null);
    WoTimepickerComponent = __decorate([
        core_1.Component({
            selector: 'wo-timepicker',
            templateUrl: 'wo-timepicker.component.html',
            styleUrls: ['wo-timepicker.component.css'],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], WoTimepickerComponent);
    return WoTimepickerComponent;
}());
exports.WoTimepickerComponent = WoTimepickerComponent;
//# sourceMappingURL=wo-timepicker.component.js.map