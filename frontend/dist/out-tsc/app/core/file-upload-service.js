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
var Observable_1 = require("rxjs/Observable");
var auth_service_1 = require("../auth/auth.service");
require("rxjs/add/operator/share");
var FileUploadService = /** @class */ (function () {
    function FileUploadService(auth) {
        var _this = this;
        this.auth = auth;
        this.progress = 0;
        this.progress$ = new Observable_1.Observable(function (observer) {
            _this.progressObserver = observer;
        });
    }
    FileUploadService_1 = FileUploadService;
    /**
     * Set interval for frequency with which Observable inside Promise will share data with subscribers.
     */
    FileUploadService.setUploadUpdateInterval = function (interval) {
        setInterval(function () { }, interval);
    };
    FileUploadService.prototype.getProgress = function () {
        return this.progress$;
    };
    /**
     * Upload files through XMLHttpRequest
     */
    FileUploadService.prototype.upload = function (url, files, params) {
        var _this = this;
        if (params === void 0) { params = null; }
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append('files[]', files[i], files[i].name);
            }
            if (params !== null) {
                _this.buildFormData(formData, params);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            FileUploadService_1.setUploadUpdateInterval(100);
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                if (_this.progressObserver) {
                    _this.progressObserver.next(_this.progress);
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + _this.auth.getToken());
            xhr.send(formData);
        });
    };
    /**
     * Build data for FormData object.
     * @param formData object
     * @param data object
     * @param parentKey string
     */
    FileUploadService.prototype.buildFormData = function (formData, data, parentKey) {
        var _this = this;
        if (parentKey === void 0) { parentKey = null; }
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(function (key) {
                _this.buildFormData(formData, data[key], parentKey ? parentKey + "[" + key + "]" : key);
            });
        }
        else {
            var value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    };
    var FileUploadService_1;
    FileUploadService = FileUploadService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], FileUploadService);
    return FileUploadService;
}());
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload-service.js.map