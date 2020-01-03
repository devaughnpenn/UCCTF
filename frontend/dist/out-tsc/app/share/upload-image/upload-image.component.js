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
var wo_dialog_confirm_component_1 = require("@app/wo-module/wo-dialog/wo-dialog-confirm/wo-dialog-confirm.component");
var api_admin_service_1 = require("@app/share/api-admin.service");
var UploadImageComponent = /** @class */ (function () {
    function UploadImageComponent(fileUploadService, api, dialog) {
        this.fileUploadService = fileUploadService;
        this.api = api;
        this.dialog = dialog;
        this.changeImage = new core_1.EventEmitter();
        this.isLoading = false;
    }
    UploadImageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.inputFile.nativeElement.onchange = function () {
            _this.doUploadFile();
            _this.resetInputField();
        };
    };
    UploadImageComponent.prototype.resetInputField = function () {
        this.inputFile.nativeElement.type = 'text';
        this.inputFile.nativeElement.type = 'file';
    };
    UploadImageComponent.prototype.doUploadFile = function () {
        var _this = this;
        this.isLoading = true;
        var url = new URL(this.woSrc, window.location.origin);
        url.searchParams.set('id', (this.woId ? this.woId : ''));
        this.fileUploadService.upload(url.href, this.inputFile.nativeElement.files).then(function (res) {
            _this.resetInputField();
            _this.isLoading = false;
            _this.changeImage.emit({ result: res });
        }).catch(function (err) {
            _this.resetInputField();
            _this.isLoading = false;
            _this.changeImage.emit({ result: null, error: err });
        });
    };
    UploadImageComponent.prototype.doRemove = function () {
        var _this = this;
        var dialogRef = this.dialog.open(wo_dialog_confirm_component_1.WoDialogConfirmComponent, { message: 'Are you sure you want to delete image?' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.api.send('files/image-delete', { id: _this.woId }, {}).then(function (res) {
                    _this.changeImage.emit({ result: null, remove: true });
                });
            }
        });
    };
    UploadImageComponent.prototype.getAvatarUrl = function () {
        var url = new URL(this.woSrc, window.location.origin);
        url.searchParams.set('id', (this.woId ? this.woId : ''));
        return url.href;
    };
    UploadImageComponent.prototype.getFullSrc = function () {
        if (typeof this.woFullSrc === 'undefined' || this.woFullSrc === null) {
            return null;
        }
        else {
            var url = new URL(this.woFullSrc, window.location.origin);
            url.searchParams.set('id', (this.woId ? this.woId : ''));
            return url.href;
        }
    };
    __decorate([
        core_1.ViewChild('inputFile', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], UploadImageComponent.prototype, "inputFile", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UploadImageComponent.prototype, "woSrc", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UploadImageComponent.prototype, "woFullSrc", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], UploadImageComponent.prototype, "woId", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], UploadImageComponent.prototype, "changeImage", void 0);
    UploadImageComponent = __decorate([
        core_1.Component({
            selector: 'upload-image',
            templateUrl: 'upload-image.component.html',
            styleUrls: ['upload-image.component.css'],
        }),
        __metadata("design:paramtypes", [file_upload_service_1.FileUploadService,
            api_admin_service_1.ApiAdminService,
            wo_dialog_service_1.WoDialogService])
    ], UploadImageComponent);
    return UploadImageComponent;
}());
exports.UploadImageComponent = UploadImageComponent;
//# sourceMappingURL=upload-image.component.js.map