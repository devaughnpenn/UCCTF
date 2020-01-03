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
var file_upload_service_1 = require("@app/core/file-upload-service");
var wo_dialog_service_1 = require("@app/wo-module/wo-dialog/wo-dialog.service");
var wo_awatar_edit_component_1 = require("./wo-awatar-edit.component");
var WoAvatarComponent = /** @class */ (function () {
    function WoAvatarComponent(fileUploadService, dialog) {
        this.fileUploadService = fileUploadService;
        this.dialog = dialog;
        this.changeImage = new core_1.EventEmitter();
        this.isLoading = false;
    }
    WoAvatarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.inputFile.nativeElement.onchange = function () {
            var dialogRef = _this.dialog.open(wo_awatar_edit_component_1.WoAwatarEditComponent, { file: _this.inputFile.nativeElement.files[0] });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result !== null && result['confirm'] === true) {
                    _this.crop = result['crop'];
                    _this.doUploadFile();
                }
                _this.resetInputField();
            });
        };
    };
    WoAvatarComponent.prototype.resetInputField = function () {
        this.inputFile.nativeElement.type = 'text';
        this.inputFile.nativeElement.type = 'file';
    };
    WoAvatarComponent.prototype.doUploadFile = function () {
        var _this = this;
        this.isLoading = true;
        var url = this.woSrc + '/?id=' + (this.woId ? this.woId : '');
        this.fileUploadService.upload(url, this.inputFile.nativeElement.files, { crop: this.crop }).then(function (res) {
            _this.resetInputField();
            _this.isLoading = false;
            _this.changeImage.emit({ result: res });
        }).catch(function (err) {
            _this.resetInputField();
            _this.isLoading = false;
            _this.changeImage.emit({ result: null, error: err });
        });
    };
    WoAvatarComponent.prototype.doRemove = function () {
        this.changeImage.emit({ result: null, remove: true });
    };
    WoAvatarComponent.prototype.getAvatarUrl = function () {
        return this.woSrc + '/?id=' + (this.woId ? this.woId : '');
    };
    __decorate([
        core_1.ViewChild('inputFile', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], WoAvatarComponent.prototype, "inputFile", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WoAvatarComponent.prototype, "woSrc", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WoAvatarComponent.prototype, "woId", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WoAvatarComponent.prototype, "changeImage", void 0);
    WoAvatarComponent = __decorate([
        core_1.Component({
            selector: 'wo-avatar',
            templateUrl: 'wo-avatar.component.html',
            styleUrls: ['wo-avatar.component.css'],
        }),
        __metadata("design:paramtypes", [file_upload_service_1.FileUploadService,
            wo_dialog_service_1.WoDialogService])
    ], WoAvatarComponent);
    return WoAvatarComponent;
}());
exports.WoAvatarComponent = WoAvatarComponent;
//# sourceMappingURL=wo-avatar.component.js.map