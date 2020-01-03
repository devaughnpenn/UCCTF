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
    useExisting: core_1.forwardRef(function () { return WoDatalistComponent; }),
};
var noop = function () { };
var WoDatalistComponent = /** @class */ (function () {
    function WoDatalistComponent() {
        this.placeholder = '';
        // The internal data model
        this.isChecked = false;
        // The internal data model
        this.innerValue = '';
        this.inputText = '';
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    WoDatalistComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.getOptions().forEach(function (item) {
            item.addEventListener('mousedown', function (event) { _this.doSelect(event); });
        });
    };
    WoDatalistComponent.prototype.getOptions = function () {
        return this.woDetilsItems.nativeElement.querySelectorAll('[value]');
    };
    // From ControlValueAccessor interface
    WoDatalistComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.updateInputValue();
            this.onChangeCallback(this.innerValue);
        }
    };
    // From ControlValueAccessor interface
    WoDatalistComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    WoDatalistComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    WoDatalistComponent.prototype.onChange = function (event) {
        this.onChangeCallback(this.innerValue);
    };
    WoDatalistComponent.prototype.doSelect = function (event) {
        this.removeCheckedElement();
        event.target.classList.add('wo-datalist_checked');
        this.writeValue(event.target.getAttribute('value'));
        this.updateInputValue();
    };
    WoDatalistComponent.prototype.updateInputValue = function () {
        var options = this.getOptions();
        var length = options.length;
        for (var i = 0; i < length; i++) {
            if (options[i].getAttribute('value') === this.innerValue) {
                this.inputText = options[i].innerText;
                break;
            }
        }
    };
    WoDatalistComponent.prototype.removeCheckedElement = function () {
        var el = this.woDetilsItems.nativeElement.querySelector('[value].wo-datalist_checked');
        if (el) {
            el.classList.remove('wo-datalist_checked');
        }
    };
    WoDatalistComponent.prototype.onBlur = function (event) {
        var inputText = this.inputText.trim().toLowerCase();
        var options = this.getOptions();
        var length = options.length;
        var isFind = false;
        this.removeCheckedElement();
        for (var i = 0; i < length; i++) {
            if (options[i].innerText.toLowerCase() === inputText) {
                this.inputText = options[i].innerText;
                options[i].classList.add('wo-datalist_checked');
                isFind = true;
                this.writeValue(options[i].getAttribute('value'));
                break;
            }
        }
        if (isFind === false) {
            this.inputText = '';
            this.writeValue(null);
        }
    };
    WoDatalistComponent.prototype.doFilterValues = function () {
        this.woDetilsItems.nativeElement.querySelectorAll('[value].wo-datalist_hide').forEach(function (hideEl) {
            hideEl.classList.remove('wo-datalist_hide');
        });
        var searchText = this.inputText.trim().toLowerCase();
        if (this.inputText !== '') {
            this.getOptions().forEach(function (el) {
                if (el.innerText.toLowerCase().indexOf(searchText) === -1) {
                    el.classList.add('wo-datalist_hide');
                }
            });
        }
    };
    WoDatalistComponent.prototype.doShow = function () {
        this.doFilterValues();
    };
    __decorate([
        core_1.ViewChild('woDetilsItems', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoDatalistComponent.prototype, "woDetilsItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoDatalistComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoDatalistComponent.prototype, "placeholder", void 0);
    WoDatalistComponent = __decorate([
        core_1.Component({
            selector: 'wo-datalist',
            templateUrl: 'wo-datalist.component.html',
            styleUrls: ['wo-datalist.component.css'],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        core_1.Injectable()
    ], WoDatalistComponent);
    return WoDatalistComponent;
}());
exports.WoDatalistComponent = WoDatalistComponent;
//# sourceMappingURL=wo-datalist.component.js.map