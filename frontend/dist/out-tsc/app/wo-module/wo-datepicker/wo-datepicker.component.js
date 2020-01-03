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
    useExisting: core_1.forwardRef(function () { return WoDatepickerComponent; })
    /* tslint:enable */
};
var noop = function () { };
var WoDatepickerComponent = /** @class */ (function () {
    function WoDatepickerComponent() {
        this.leftOffset = 0;
        this.toLeft = false;
        this.toRight = false;
        this.mode = 'days'; // days, months
        // The internal data model
        this.innerValue = '';
        this.isShow = false;
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        this.short_months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        this.daysofweek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.wD = [0, 1, 2, 3, 4, 5, 6];
        this.options = { format: 'mm/dd/yyyy' };
        this.today = new Date();
        this.date = null;
    }
    Object.defineProperty(WoDatepickerComponent.prototype, "value", {
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
    WoDatepickerComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.onChangeCallback(this.innerValue);
        }
    };
    // From ControlValueAccessor interface
    WoDatepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    WoDatepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    WoDatepickerComponent.prototype.onChange = function () {
        this.onChangeCallback(this.innerValue);
    };
    WoDatepickerComponent.prototype.keyboardInput = function (event) {
        if (this.isShow === true) {
            if (event.key === 'Escape') {
                this.isShow = false;
            }
            else if (event.key === 'Tab') {
                this.isShow = false;
            }
            else if (event.key === 'ArrowRight') {
                this.nextMonth();
            }
            else if (event.key === 'ArrowLeft') {
                this.prevMonth();
            }
        }
    };
    WoDatepickerComponent.prototype.clickOnWindow = function (event) {
        this.isShow = false;
    };
    WoDatepickerComponent.prototype.clickOnHost = function (event) {
        if (this.isShow !== false) {
            this.toLeft = false;
            this.toRight = false;
            event.stopPropagation();
        }
    };
    WoDatepickerComponent.prototype.open = function () {
        this.isShow = true;
        this.toLeft = false;
        this.toRight = false;
        this.leftOffset = Math.min(0, window.innerWidth - (this.wrapperEl.nativeElement.getBoundingClientRect().left + 230));
        var innserDate = this.parseFormat(this.innerValue, this.options.format);
        if (!isNaN(innserDate)) {
            this.date = innserDate;
            this.calendarDate = new Date(this.date);
        }
        else {
            this.date = null;
            this.calendarDate = new Date();
        }
        this.monthDays = this.getMonthDays();
        this.setMode('days');
    };
    WoDatepickerComponent.prototype.nextMonth = function () {
        this.toLeft = true;
        this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
        this.monthDays = this.getMonthDays();
    };
    WoDatepickerComponent.prototype.prevMonth = function () {
        this.toRight = true;
        this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
        this.monthDays = this.getMonthDays();
    };
    WoDatepickerComponent.prototype.setMonth = function (i) {
        this.calendarDate.setMonth(i);
        this.setMode('days');
    };
    WoDatepickerComponent.prototype.nextYear = function () {
        this.calendarDate.setFullYear(this.calendarDate.getFullYear() + 1);
    };
    WoDatepickerComponent.prototype.prevYear = function () {
        this.calendarDate.setFullYear(this.calendarDate.getFullYear() - 1);
    };
    WoDatepickerComponent.prototype.getMonthDays = function () {
        var monthDays = [];
        var monthWeek = [];
        var startMonthDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth(), 1);
        var firstDay = new Date(startMonthDate.getFullYear(), startMonthDate.getMonth(), 1);
        var lastDay = new Date(startMonthDate.getFullYear(), startMonthDate.getMonth() + 1, 0);
        var lastMonthDay = new Date(startMonthDate.getFullYear(), startMonthDate.getMonth(), 0);
        var nextDate = new Date(startMonthDate);
        nextDate.setMonth(nextDate.getMonth() + 1);
        for (var i = 1 - this.wD[firstDay.getDay()]; i < 43 - this.wD[firstDay.getDay()]; i++) {
            if (i < 1) {
                monthDays.push({
                    num: lastMonthDay.getDate() + i,
                    isNextMonth: false,
                    isPrevMonth: true,
                    isCurrent: false,
                    year: lastMonthDay.getFullYear(),
                    month: lastMonthDay.getMonth() + 1
                });
            }
            else if (i > 0 && i <= lastDay.getDate()) {
                var isSelected = false;
                if (this.date) {
                    if (startMonthDate.getFullYear() === this.date.getFullYear()) {
                        if (startMonthDate.getMonth() === this.date.getMonth()) {
                            if (i === this.date.getDate()) {
                                isSelected = true;
                            }
                        }
                    }
                }
                var isCurrent = false;
                if (i === this.today.getDate()) {
                    if (this.today.getMonth() === startMonthDate.getMonth()) {
                        if (this.today.getFullYear() === startMonthDate.getFullYear()) {
                            isCurrent = true;
                        }
                    }
                }
                monthDays.push({
                    num: i,
                    isNextMonth: false,
                    isPrevMonth: false,
                    isCurrent: isCurrent,
                    isSelected: isSelected,
                    year: startMonthDate.getFullYear(),
                    month: startMonthDate.getMonth() + 1
                });
            }
            else {
                monthDays.push({
                    num: i - lastDay.getDate(),
                    isNextMonth: true,
                    isPrevMonth: true,
                    isCurrent: false,
                    year: nextDate.getFullYear(),
                    month: nextDate.getMonth() + 1
                });
            }
        }
        var k, j;
        var chunk = 7;
        for (k = 0, j = monthDays.length; k < j; k += chunk) {
            monthWeek.push(monthDays.slice(k, k + chunk));
        }
        return monthWeek;
    };
    WoDatepickerComponent.prototype.setDate = function (event, selectedItem) {
        var selectedDate = new Date();
        selectedDate.setMonth(0);
        selectedDate.setDate(selectedItem.num);
        selectedDate.setFullYear(selectedItem.year);
        selectedDate.setMonth(selectedItem.month - 1);
        this.isShow = false;
        this.writeValue(this.formatDate(selectedDate));
    };
    WoDatepickerComponent.prototype.formatDate = function (d) {
        var day = d.getDate();
        var m = d.getMonth();
        var y = d.getFullYear();
        return this.options.format.replace(/(yyyy|yy|mmmm|mmm|mm|m|dd|d)/gi, function (e) {
            switch (e.toLowerCase()) {
                case 'd': return day;
                case 'dd': return (day < 10 ? '0' + day : day);
                case 'm': return m + 1;
                case 'mm': return (m + 1 < 10 ? '0' + (m + 1) : (m + 1));
                case 'mmm': return this.short_months[m];
                case 'mmmm': return this.months[m];
                case 'yy': return y.toString().substr(2, 2);
                case 'yyyy': return y;
            }
        });
    };
    WoDatepickerComponent.prototype.setMode = function (mode) {
        this.mode = mode;
        if (mode === 'days') {
            this.monthDays = this.getMonthDays();
        }
    };
    WoDatepickerComponent.prototype.parseFormat = function (value, format) {
        if (value === '' || typeof value === 'undefined') {
            return NaN;
        }
        value = value.replace(/[\.\-\/\s]/g, '$').split('$');
        format = format.replace(/[\.\-\/\s]/g, '$').split('$');
        var date = new Date();
        for (var i = format.length - 1; i >= 0; i--) {
            if (format[i] === 'yyyy') {
                date.setFullYear(value[i]);
            }
            else if (format[i] === 'mm') {
                date.setMonth(parseInt(value[i], 10) - 1);
            }
            else if (format[i] === 'dd') {
                date.setDate(value[i]);
            }
        }
        return date;
    };
    __decorate([
        core_1.ViewChild('wrapper', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoDatepickerComponent.prototype, "wrapperEl", void 0);
    __decorate([
        core_1.HostListener('window:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], WoDatepickerComponent.prototype, "keyboardInput", null);
    __decorate([
        core_1.HostListener('window:mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], WoDatepickerComponent.prototype, "clickOnWindow", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], WoDatepickerComponent.prototype, "clickOnHost", null);
    WoDatepickerComponent = __decorate([
        core_1.Component({
            selector: 'wo-datepicker',
            templateUrl: 'wo-datepicker.component.html',
            styleUrls: ['wo-datepicker.component.css'],
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], WoDatepickerComponent);
    return WoDatepickerComponent;
}());
exports.WoDatepickerComponent = WoDatepickerComponent;
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR.useExisting = core_1.forwardRef(function () { return WoDatepickerComponent; });
//# sourceMappingURL=wo-datepicker.component.js.map