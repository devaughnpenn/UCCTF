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
var WoAwatarEditComponent = /** @class */ (function () {
    function WoAwatarEditComponent() {
        this.file = '';
        this.param = {
            wrapWidht: 700,
            wrapHeight: 350,
            width: null,
            height: null,
            left: 0,
            top: 0,
        };
        this.crop = {
            minWidth: 50,
            minHeight: 50,
            width: 200,
            height: 200,
            left: 0,
            top: 0,
            drugMove: false,
            nwMove: false,
            neMove: false,
            seMove: false,
            swMove: false,
            startX: 0,
            startY: 0,
            startTop: 0,
            startLeft: 0,
            startWidth: 0,
            startHeight: 0,
        };
    }
    WoAwatarEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dialog.options.css = {
            width: (this.param.wrapWidht + 70) + 'px',
        };
        if (this.dialog.options && this.dialog.options.file) {
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                _this.imageEl.nativeElement.onload = function () {
                    _this.initElements();
                };
                _this.imageEl.nativeElement.src = reader_1.result;
            };
            reader_1.readAsDataURL(this.dialog.options.file);
        }
        document.body.addEventListener('mouseup', function (event) {
            _this.doCropMoveStop(event);
        });
    };
    WoAwatarEditComponent.prototype.initElements = function () {
        this.imageEl.nativeElement.style.opacity = 1;
        this.param.height = this.param.wrapHeight;
        this.param.width = (this.param.height / this.imageEl.nativeElement.naturalHeight) * this.imageEl.nativeElement.naturalWidth;
        if (this.param.width > this.param.wrapWidht) {
            this.param.width = this.param.wrapWidht;
            this.param.height = (this.param.width / this.imageEl.nativeElement.naturalWidth) * this.imageEl.nativeElement.naturalHeight;
        }
        this.crop.width = this.crop.height = Math.min(this.crop.width, this.param.width, this.param.height);
        this.toCenter();
    };
    WoAwatarEditComponent.prototype.toCenter = function () {
        this.param.left = (this.param.wrapWidht - this.param.width) / 2;
        this.param.top = (this.param.wrapHeight - this.param.height) / 2;
        this.crop.left = (this.param.width - this.crop.width) / 2;
        this.crop.top = (this.param.height - this.crop.height) / 2;
    };
    WoAwatarEditComponent.prototype.doCropMoveStart = function (event, key) {
        this.crop.startX = event.clientX;
        this.crop.startY = event.clientY;
        this.crop.startTop = this.crop.top;
        this.crop.startLeft = this.crop.left;
        this.crop.startWidth = this.crop.width;
        this.crop.startHeight = this.crop.height;
        this.crop[key] = true;
    };
    WoAwatarEditComponent.prototype.doCropMove = function (event) {
        if (this.crop.drugMove === true) {
            this.crop.top = this.crop.startTop - (this.crop.startY - event.clientY);
            this.crop.left = this.crop.startLeft - (this.crop.startX - event.clientX);
            if (this.crop.top < 0) {
                this.crop.top = 0;
            }
            else if (this.crop.top > this.param.height - this.crop.height) {
                this.crop.top = this.param.height - this.crop.height;
            }
            if (this.crop.left < 0) {
                this.crop.left = 0;
            }
            else if (this.crop.left > this.param.width - this.crop.width) {
                this.crop.left = this.param.width - this.crop.width;
            }
        }
        else if (this.crop.nwMove === true) {
            this.moveNwLimit(event);
        }
        else if (this.crop.swMove === true) {
            this.moveSwLimit(event);
        }
        else if (this.crop.neMove === true) {
            this.moveNeLimit(event);
        }
        else if (this.crop.seMove === true) {
            this.moveSeLimit(event);
        }
    };
    // top-left
    WoAwatarEditComponent.prototype.moveNwLimit = function (event) {
        this.crop.width = this.crop.startWidth + (this.crop.startX - event.clientX);
        this.crop.height = this.crop.startHeight + (this.crop.startY - event.clientY);
        if (this.crop.height >= this.crop.minHeight) {
            this.crop.top = this.crop.startTop - (this.crop.startY - event.clientY);
        }
        if (this.crop.width >= this.crop.minWidth) {
            this.crop.left = this.crop.startLeft - (this.crop.startX - event.clientX);
        }
        if (this.crop.width >= this.crop.minWidth) {
            if (this.crop.width > this.crop.startLeft + this.crop.startWidth) {
                this.crop.width = this.crop.startLeft + this.crop.startWidth;
                this.crop.left = 0;
            }
            else {
                this.crop.left = this.crop.startLeft - (this.crop.startX - event.clientX);
            }
        }
        else {
            this.crop.left = this.crop.startLeft + this.crop.startWidth - this.crop.minWidth;
        }
        if (this.crop.top < 0) {
            this.crop.top = 0;
            this.crop.height = this.crop.startTop + this.crop.startHeight;
        }
        if (this.crop.width < this.crop.minWidth) {
            this.crop.width = this.crop.minWidth;
        }
        if (this.crop.height < this.crop.minHeight) {
            this.crop.height = this.crop.minWidth;
            this.crop.top = this.crop.startTop + this.crop.startHeight - this.crop.minHeight;
        }
        if (this.crop.width > this.crop.height) {
            this.crop.left = this.crop.startLeft + this.crop.startWidth - this.crop.height;
            this.crop.width = this.crop.startLeft + this.crop.startWidth - this.crop.left;
        }
        else {
            this.crop.height = this.crop.width;
            this.crop.top = this.crop.startTop + this.crop.startHeight - this.crop.height;
        }
    };
    // bottom-right
    WoAwatarEditComponent.prototype.moveSeLimit = function (event) {
        this.crop.width = this.crop.startWidth - (this.crop.startX - event.clientX);
        this.crop.height = this.crop.startHeight - (this.crop.startY - event.clientY);
        if (this.crop.left + this.crop.width > this.param.width) {
            this.crop.width = this.param.width - this.crop.left;
        }
        if (this.crop.top + this.crop.height > this.param.height) {
            this.crop.height = this.param.height - this.crop.top;
        }
        if (this.crop.width < this.crop.minWidth) {
            this.crop.width = this.crop.minWidth;
        }
        if (this.crop.height < this.crop.minHeight) {
            this.crop.height = this.crop.minWidth;
        }
        this.crop.width = Math.min(this.crop.width, this.crop.height);
        this.crop.height = Math.min(this.crop.width, this.crop.height);
    };
    // top-right
    WoAwatarEditComponent.prototype.moveNeLimit = function (event) {
        this.crop.width = this.crop.startWidth - (this.crop.startX - event.clientX);
        this.crop.height = this.crop.startHeight + (this.crop.startY - event.clientY);
        if (this.crop.height >= this.crop.minHeight) {
            this.crop.top = this.crop.startTop - (this.crop.startY - event.clientY);
        }
        else {
            this.crop.top = this.crop.startTop + this.crop.startHeight - this.crop.minHeight;
        }
        if (this.crop.left + this.crop.width > this.param.width) {
            this.crop.width = this.param.width - this.crop.left;
        }
        if (this.crop.width < this.crop.minWidth) {
            this.crop.width = this.crop.minWidth;
        }
        if (this.crop.height < this.crop.minHeight) {
            this.crop.height = this.crop.minWidth;
        }
        if (this.crop.top < 0) {
            this.crop.top = 0;
            this.crop.height = this.crop.startTop + this.crop.startHeight;
        }
        if (this.crop.height < this.crop.width) {
            this.crop.width = this.crop.height;
        }
        if (this.crop.height > this.crop.width) {
            this.crop.height = this.crop.width;
            this.crop.top = this.crop.startTop + this.crop.startHeight - this.crop.height;
        }
    };
    // bottom-left
    WoAwatarEditComponent.prototype.moveSwLimit = function (event) {
        this.crop.height = this.crop.startHeight - (this.crop.startY - event.clientY);
        this.crop.width = this.crop.startWidth + (this.crop.startX - event.clientX);
        if (this.crop.height > this.param.height - this.crop.top) {
            this.crop.height = this.param.height - this.crop.top;
        }
        if (this.crop.width >= this.crop.minWidth) {
            if (this.crop.width > this.crop.startLeft + this.crop.startWidth) {
                this.crop.width = this.crop.startLeft + this.crop.startWidth;
                this.crop.left = 0;
            }
            else {
                this.crop.left = this.crop.startLeft - (this.crop.startX - event.clientX);
            }
        }
        else {
            this.crop.left = this.crop.startLeft + this.crop.startWidth - this.crop.minWidth;
        }
        if (this.crop.width < this.crop.minWidth) {
            this.crop.width = this.crop.minWidth;
        }
        if (this.crop.height < this.crop.minHeight) {
            this.crop.height = this.crop.minWidth;
        }
        if (this.crop.width < this.crop.height) {
            this.crop.height = this.crop.width;
        }
        if (this.crop.width > this.crop.height) {
            this.crop.left = this.crop.startLeft + this.crop.startWidth - this.crop.height;
            this.crop.width = this.crop.startLeft + this.crop.startWidth - this.crop.left;
        }
    };
    WoAwatarEditComponent.prototype.doCropMoveStop = function (event) {
        this.crop.startX = event.clientX;
        this.crop.startY = event.clientY;
        this.crop.drugMove = false;
        this.crop.nwMove = false;
        this.crop.neMove = false;
        this.crop.seMove = false;
        this.crop.swMove = false;
    };
    WoAwatarEditComponent.prototype.confirm = function () {
        var k = this.imageEl.nativeElement.naturalHeight / this.imageEl.nativeElement.height;
        this.dialog.close({
            confirm: true,
            crop: {
                naturalHeight: this.imageEl.nativeElement.naturalHeight,
                naturalWidth: this.imageEl.nativeElement.naturalWidth,
                left: this.crop.left * k,
                top: this.crop.top * k,
                width: this.crop.width * k,
                height: this.crop.height * k,
            },
        });
    };
    WoAwatarEditComponent.prototype.close = function () {
        this.dialog.close({
            confirm: false,
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WoAwatarEditComponent.prototype, "dialog", void 0);
    __decorate([
        core_1.ViewChild('imageEl', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoAwatarEditComponent.prototype, "imageEl", void 0);
    __decorate([
        core_1.ViewChild('containerEl', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoAwatarEditComponent.prototype, "containerEl", void 0);
    WoAwatarEditComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"wo-dialog-alert__body\" (mousemove)=\"doCropMove($event)\"\n            [class.nw-cursor]=\"crop.nwMove === true\"\n            [class.ne-cursor]=\"crop.neMove === true\"\n            [class.se-cursor]=\"crop.seMove === true\"\n            [class.sw-cursor]=\"crop.swMove === true\"\n        >\n            <div class=\"awatar-edit__title\">Crop Image</div>\n            <div class=\"awatar-edit__wrapper\">\n                <div class=\"awatar-edit\" [style.height]=\"param.wrapHeight + 'px'\" [style.width]=\"param.wrapWidht + 'px'\" #containerEl>\n                    <img\n                        [width]=\"param.width\"\n                        [height]=\"param.height\"\n                        [style.left]=\"param.left + 'px'\"\n                        [style.top]=\"param.top + 'px'\"\n                    #imageEl>\n                    <div class=\"cropper-wrap-box\"\n                        [style.width]=\"param.width === null ? 0 : param.width + 'px'\"\n                        [style.height]=\"param.height === null ? 0 : param.height + 'px'\"\n                        [style.left]=\"param.left + 'px'\"\n                        [style.top]=\"param.top + 'px'\"\n                    >\n                        <div class=\"cropper-bg\"\n                            style=\"top: 0; left: 0; right: 0;\"\n                            [style.height]=\"crop.top + 'px'\"\n                        ></div>\n                        <div class=\"cropper-bg\"\n                            style=\"left: 0\"\n                            [style.width]=\"crop.left + 'px'\"\n                            [style.height]=\"crop.height + 'px'\"\n                            [style.top]=\"crop.top + 'px'\"\n                        ></div>\n                        <div class=\"cropper-bg\"\n                            style=\"right: 0\"\n                            [style.width]=\"(param.width - crop.left - crop.width) + 'px'\"\n                            [style.height]=\"crop.height + 'px'\"\n                            [style.top]=\"crop.top + 'px'\"\n                        ></div>\n                        <div class=\"cropper-bg\"\n                            style=\"bottom: 0; left: 0; right: 0;\"\n                            [style.height]=\"(param.height - crop.top - crop.height) + 'px'\"\n                        ></div>\n\n                        <div class=\"cropper\"\n                            (mousedown)=\"doCropMoveStart($event, 'drugMove')\"\n                            [style.width]=\"crop.width + 'px'\"\n                            [style.height]=\"crop.height + 'px'\"\n                            [style.top]=\"crop.top + 'px'\"\n                            [style.left]=\"crop.left + 'px'\"\n                        ></div>\n\n                        <div class=\"nh-st\" style=\"cursor: nw-resize;\"\n                            [style.top]=\"(crop.top - 10) + 'px'\"\n                            [style.left]=\"(crop.left - 10) + 'px'\"\n                            (mousedown)=\"doCropMoveStart($event, 'nwMove')\"\n                        >\n                            <div class=\"nh-tt\"></div>\n                        </div>\n                        <div class=\"nh-st\" style=\"cursor: ne-resize;\"\n                            [style.top]=\"(crop.top - 10) + 'px'\"\n                            [style.left]=\"(crop.left + crop.width - 10) + 'px'\"\n                            (mousedown)=\"doCropMoveStart($event, 'neMove')\"\n                        >\n                            <div class=\"nh-tt\"></div>\n                        </div>\n                        <div class=\"nh-st\"  style=\"cursor: se-resize;\"\n                            [style.top]=\"(crop.top + crop.height - 10) + 'px'\"\n                            [style.left]=\"(crop.left + crop.width - 10) + 'px'\"\n                            (mousedown)=\"doCropMoveStart($event, 'seMove')\"\n                        >\n                            <div class=\"nh-tt\"></div>\n                        </div>\n                        <div class=\"nh-st\" style=\"cursor: sw-resize;\"\n                            [style.top]=\"(crop.top + crop.height - 10) + 'px'\"\n                            [style.left]=\"(crop.left - 10) + 'px'\"\n                            (mousedown)=\"doCropMoveStart($event, 'swMove')\"\n                        >\n                            <div class=\"nh-tt\"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"wo-dialog-alert__buttons\">\n            <a class=\"btn btn-primary\" href=\"javascript:void(0);\" (click)=\"confirm()\">Confirm</a>\n            <a class=\"btn btn-default\" href=\"javascript:void(0);\" (click)=\"close()\">Close</a>\n        </div>\n    ",
            styles: ["\n        :host * {\n            box-sizing: initial;\n        }\n        .nw-cursor {\n            cursor: nw-resize !important;\n        }\n        .sw-cursor {\n            cursor: sw-resize !important;\n        }\n        .ne-cursor {\n            cursor: ne-resize !important;\n        }\n        .se-cursor {\n            cursor: se-resize !important;\n        }\n        .wo-dialog-alert__body {\n            padding: 10px 15px 15px;\n        }\n        .wo-dialog-alert__buttons {\n            padding: 8px 10px 8px;\n            text-align: right;\n            border-top: 1px solid #eaeaea;\n        }\n        .wo-dialog-alert__buttons a {\n            min-width: 50px;\n            margin-left: 5px;\n        }\n        .awatar-edit__wrapper {\n            padding: 20px;\n            overflow: hidden;\n            user-select: none;\n        }\n        .awatar-edit {\n            position: relative;\n        }\n        .awatar-edit img {\n            opacity: 0;\n            position: absolute;\n            user-select: none;\n        }\n        .cropper-wrap-box {\n            position: absolute;\n            border: 1px solid #fff;\n        }\n        .cropper {\n            box-shadow: inset 1px 1px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.07);\n            border: 1px solid rgba(0,0,0,0.6);\n            cursor: move;\n            position: absolute;\n            box-sizing: border-box;\n        }\n        .cropper-bg {\n            z-index: 10;\n            position: absolute;\n            background-color: #fff;\n            opacity: .5;\n        }\n        .nh-st {\n            position: absolute;\n            padding: 10px;\n            z-index: 10;\n        }\n        .nh-tt {\n            position: absolute;\n            background-color: #fff;\n            border: 1px solid #000;\n            height: 8px;\n            overflow: hidden;\n            width: 8px;\n            top: 5px;\n            left: 5px;\n        }\n        .awatar-edit__title {\n            font-size: 16px;\n            font-weight: bold;\n            padding-bottom: 10px;\n        }\n    "],
        })
    ], WoAwatarEditComponent);
    return WoAwatarEditComponent;
}());
exports.WoAwatarEditComponent = WoAwatarEditComponent;
//# sourceMappingURL=wo-awatar-edit.component.js.map