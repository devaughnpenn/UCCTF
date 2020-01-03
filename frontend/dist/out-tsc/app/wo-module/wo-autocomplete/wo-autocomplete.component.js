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
/**
 * @desc The wo-autocomplete component is a wrapper for a normal text input enhanced by a panel of suggested options.
 * @author Pavel Shklyarik
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/switchMap");
var WoAutocompleteComponent = /** @class */ (function () {
    /**
     * Constructor.
     */
    function WoAutocompleteComponent(rootElement, renderer, http) {
        var _this = this;
        this.rootElement = rootElement;
        this.renderer = renderer;
        this.http = http;
        this.choose = new core_1.EventEmitter();
        this.curVal = '';
        this.showResult = false;
        this.isLoading = false;
        this.items = [];
        this.selectedItem = -1;
        this.changed$ = new Subject_1.Subject();
        this.changed$.debounceTime(50).distinctUntilChanged().switchMap(function (term) { return _this.search(term); }).subscribe(function (result) {
            // @ts-ignore
            _this.items = result;
            _this.isLoading = false;
        });
    }
    /**
     * Close block with result if click outside of the component.
     * @param event the object.
     */
    WoAutocompleteComponent.prototype.clickOnDocument = function (event) {
        if (!this.rootElement.nativeElement.contains(event.target)) {
            this.showResult = false;
        }
    };
    /**
     * Callback called when key has been press.
     * @param event the object.
     */
    WoAutocompleteComponent.prototype.keyDownOnDocument = function (event) {
        if (this.showResult === true) {
            if (event.keyCode === 40 && this.selectedItem < this.items.length - 1) {
                this.selectedItem++;
                event.preventDefault();
            }
            else if (event.keyCode === 38 && this.selectedItem >= 0) {
                this.selectedItem--;
                event.preventDefault();
            }
            else if (event.keyCode === 13) {
                if (this.selectedItem > -1) {
                    this.setValue(this.items[this.selectedItem]);
                    event.preventDefault();
                }
            }
        }
    };
    /**
     * @inheritdoc
     */
    WoAutocompleteComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.searchInput = this.rootElement.nativeElement.querySelector('input[type=text]');
        this.searchInput.autocomplete = 'off';
        this.renderer.listen(this.searchInput, 'focus', function ($event) { _this.onFocus($event); });
        this.renderer.listen(this.searchInput, 'keydown', function ($event) { _this.onKeyDown($event); });
        this.renderer.listen(this.searchInput, 'input', function ($event) { _this.onInputChange($event); });
    };
    /**
     * Callback called when autocomplete input has been focused.
     * @param event the object in the DOM are based on the Event Object.
     */
    WoAutocompleteComponent.prototype.onFocus = function (event) {
        this.showResult = true;
    };
    /**
     * Callback called when key has been press inside input search.
     * @param event the object in the DOM are based on the Event Object.
     */
    WoAutocompleteComponent.prototype.onKeyDown = function (event) {
        if (event.keyCode === 13 && this.selectedItem === -1) {
            this.items = [];
            this.showResult = false;
        }
        else {
            this.showResult = true;
        }
    };
    /**
     * Callback called when value changes.
     * @param event the object in the DOM are based on the Event Object.
     */
    WoAutocompleteComponent.prototype.onInputChange = function (event) {
        this.curVal = event.target.value;
        if (this.curVal === '') {
            this.items = [];
        }
        else {
            this.isLoading = true;
            this.changed$.next(this.curVal);
        }
    };
    /**
     * Do request for find items.
     * @param term the search term.
     */
    WoAutocompleteComponent.prototype.search = function (term) {
        return this.http.post(this.url, { 's': term }).map(function (response) { return response; });
    };
    /**
     * Sets the autocomplete's value.
     * @param item the item from autocomplete
     */
    WoAutocompleteComponent.prototype.setValue = function (item) {
        this.showResult = false;
        this.items = [];
        this.selectedItem = -1;
        this.choose.emit(item);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WoAutocompleteComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WoAutocompleteComponent.prototype, "valueName", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WoAutocompleteComponent.prototype, "choose", void 0);
    __decorate([
        core_1.HostListener('document:click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WoAutocompleteComponent.prototype, "clickOnDocument", null);
    __decorate([
        core_1.HostListener('document:keydown'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WoAutocompleteComponent.prototype, "keyDownOnDocument", null);
    WoAutocompleteComponent = __decorate([
        core_1.Component({
            selector: 'wo-autocomplete',
            templateUrl: 'wo-autocomplete.component.html',
            styleUrls: ['wo-autocomplete.component.css'],
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2,
            http_1.HttpClient])
    ], WoAutocompleteComponent);
    return WoAutocompleteComponent;
}());
exports.WoAutocompleteComponent = WoAutocompleteComponent;
//# sourceMappingURL=wo-autocomplete.component.js.map