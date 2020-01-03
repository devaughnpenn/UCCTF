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
var WoPreviewImageComponent = /** @class */ (function () {
    function WoPreviewImageComponent() {
        this.isLoading = false;
        this.isDisplay = false;
        this.imageWidth = null;
        this.imageHeight = null;
        this.adaptiveWidth = 0;
        this.adaptiveHeight = 0;
        this.wrapperOpacity = 0;
    }
    WoPreviewImageComponent.prototype.showPreview = function (event) {
        var _this = this;
        this.adaptiveWidth = 0;
        this.adaptiveHeight = 0;
        event.stopPropagation();
        if (typeof this.woFullSrc !== 'undefined' && this.woFullSrc !== null && this.isDisplay === false) {
            this.isLoading = true;
            var newImg_1 = new Image;
            newImg_1.onload = function () {
                _this.isLoading = false;
                _this.isDisplay = true;
                _this.imageWidth = newImg_1.naturalWidth;
                _this.imageHeight = newImg_1.naturalHeight;
                setTimeout(function () {
                    _this.adaptiveSize();
                    _this.wrapperOpacity = 1;
                }, 50);
                document.body.addEventListener('keydown', function (e) {
                    if (_this.isDisplay === true) {
                        if (e.keyCode === 27) {
                            _this.close(e);
                        }
                    }
                });
                window.onresize = function () {
                    if (_this.isDisplay === true) {
                        _this.adaptiveSize();
                    }
                };
            };
            newImg_1.src = this.woFullSrc;
        }
    };
    WoPreviewImageComponent.prototype.adaptiveSize = function () {
        if (this.imageWidth > this.imageHeight) {
            this.adaptiveWidth = 0.7 * window.innerWidth;
            this.adaptiveHeight = (this.imageHeight / this.imageWidth) * this.adaptiveWidth;
            if (this.adaptiveHeight > window.innerHeight) {
                this.adaptiveHeight = 0.7 * window.innerHeight;
                this.adaptiveWidth = (this.imageWidth / this.imageHeight) * this.adaptiveHeight;
            }
        }
        else {
            this.adaptiveHeight = 0.7 * window.innerHeight;
            this.adaptiveWidth = (this.imageWidth / this.imageHeight) * this.adaptiveHeight;
            if (this.adaptiveWidth > window.innerWidth) {
                this.adaptiveWidth = 0.7 * window.innerWidth;
                this.adaptiveHeight = (this.imageHeight / this.imageWidth) * this.adaptiveWidth;
            }
        }
    };
    WoPreviewImageComponent.prototype.close = function (event) {
        event.stopPropagation();
        this.isDisplay = false;
        this.wrapperOpacity = 0;
    };
    WoPreviewImageComponent.prototype.clickByImage = function (event) {
        event.stopPropagation();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WoPreviewImageComponent.prototype, "woFullSrc", void 0);
    WoPreviewImageComponent = __decorate([
        core_1.Component({
            selector: 'wo-preview-image',
            templateUrl: 'wo-preview-image.component.html',
            styleUrls: ['wo-preview-image.component.css'],
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], WoPreviewImageComponent);
    return WoPreviewImageComponent;
}());
exports.WoPreviewImageComponent = WoPreviewImageComponent;
//# sourceMappingURL=wo-preview-image.component.js.map