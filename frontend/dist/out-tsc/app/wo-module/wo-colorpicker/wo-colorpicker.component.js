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
    useExisting: core_1.forwardRef(function () { return WoColorpickerComponent; }),
    multi: true
};
var noop = function () { };
var WoColorpickerComponent = /** @class */ (function () {
    function WoColorpickerComponent() {
        this.mode = 'rgb';
        this.currentColor = null;
        this.isOpen = false;
        this.opacity = 1;
        this.greyColor = [
            [0, 0, 0],
            [68, 68, 68],
            [102, 102, 102],
            [153, 153, 153],
            [204, 204, 204],
            [238, 238, 238],
            [255, 255, 255],
        ];
        this.standartColor = [
            [255, 0, 0],
            [255, 153, 0],
            [255, 255, 0],
            [0, 255, 0],
            [0, 255, 255],
            [0, 0, 255],
            [153, 0, 255],
            [255, 0, 255],
        ];
        this.themeColor = [
            [
                [244, 204, 204],
                [252, 229, 205],
                [255, 242, 204],
                [217, 234, 211],
                [208, 224, 227],
                [207, 226, 243],
                [217, 210, 233],
                [234, 209, 220],
            ],
            [
                [234, 153, 153],
                [249, 203, 156],
                [255, 229, 153],
                [182, 215, 168],
                [162, 196, 201],
                [159, 197, 232],
                [180, 167, 214],
                [213, 166, 189],
            ],
            [
                [224, 102, 102],
                [246, 178, 107],
                [255, 217, 102],
                [147, 196, 125],
                [118, 165, 175],
                [118, 165, 175],
                [142, 124, 195],
                [194, 123, 160],
            ],
            [
                [204, 0, 0],
                [230, 145, 56],
                [241, 194, 50],
                [106, 168, 79],
                [69, 129, 142],
                [61, 133, 198],
                [103, 78, 167],
                [166, 77, 121],
            ],
            [
                [153, 0, 0],
                [180, 95, 6],
                [191, 144, 0],
                [56, 118, 29],
                [19, 79, 92],
                [11, 83, 148],
                [53, 28, 117],
                [116, 27, 71],
            ],
            [
                [102, 0, 0],
                [120, 63, 4],
                [127, 96, 0],
                [39, 78, 19],
                [12, 52, 61],
                [7, 55, 99],
                [32, 18, 77],
                [76, 17, 48],
            ],
        ];
        // The internal data model
        this.innerValue = '';
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    WoColorpickerComponent.prototype.clickOnWindow = function (event) {
        if (this.wrapperEl.nativeElement.contains(event.target) === false) {
            this.isOpen = false;
        }
    };
    Object.defineProperty(WoColorpickerComponent.prototype, "value", {
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
    WoColorpickerComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.parseValue(value);
            this.innerValue = value;
            this.onChangeCallback(this.innerValue);
        }
    };
    // From ControlValueAccessor interface
    WoColorpickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    WoColorpickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    WoColorpickerComponent.prototype.onChange = function (event) {
        this.onChangeCallback(this.innerValue);
    };
    WoColorpickerComponent.prototype.open = function () {
        this.isOpen = true;
    };
    WoColorpickerComponent.prototype.parseValue = function (value) {
        if (value) {
            if (this.mode === 'rgba') {
                var parseValues = value.substring(5, value.length - 1).replace(/ /g, '').split(',');
                this.currentColor = parseValues.slice(0, 3);
                this.opacity = parseValues[3];
            }
            else {
                this.currentColor = value.substring(4, value.length - 1).replace(/ /g, '').split(',');
            }
            for (var i = 0; i < this.currentColor.length; i++) {
                this.currentColor[i] = +this.currentColor[i];
            }
            if (this.currentColor.currentColor < 3) {
                this.currentColor = null;
            }
        }
        this.updateValue();
    };
    WoColorpickerComponent.prototype.updateValue = function () {
        if (this.currentColor === null) {
            this.value = '';
        }
        else {
            if (this.mode === 'rgba') {
                this.value = 'rgba(' + this.currentColor.join(', ') + ', ' + this.opacity + ')';
            }
            else {
                this.value = 'rgb(' + this.currentColor.join(', ') + ')';
            }
        }
    };
    WoColorpickerComponent.prototype.setColor = function (rgb) {
        this.currentColor = rgb;
        this.updateValue();
        this.isOpen = false;
    };
    __decorate([
        core_1.ViewChild('wrapper', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoColorpickerComponent.prototype, "wrapperEl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoColorpickerComponent.prototype, "mode", void 0);
    __decorate([
        core_1.HostListener('window:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], WoColorpickerComponent.prototype, "clickOnWindow", null);
    WoColorpickerComponent = __decorate([
        core_1.Component({
            selector: 'wo-colorpicker',
            templateUrl: 'wo-colorpicker.component.html',
            styleUrls: ['wo-colorpicker.component.css'],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        core_1.Injectable()
    ], WoColorpickerComponent);
    return WoColorpickerComponent;
}());
exports.WoColorpickerComponent = WoColorpickerComponent;
//# sourceMappingURL=wo-colorpicker.component.js.map