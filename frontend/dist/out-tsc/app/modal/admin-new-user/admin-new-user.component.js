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
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var auth_service_1 = require("@app/auth/auth.service");
var api_admin_service_1 = require("@app/share/api-admin.service");
var AdminNewUserComponent = /** @class */ (function () {
    function AdminNewUserComponent(auth, woFlash, api) {
        this.auth = auth;
        this.woFlash = woFlash;
        this.api = api;
        this.dataUser = {
            id: 0,
            first_name: '',
            last_name: '',
            middle_name: '',
            email: '',
            password: '',
            status: 'active',
            role: 'admin',
            username: '',
            password_repeat: '',
        };
        this.dataErrors = {};
        this.dataMessages = [];
    }
    AdminNewUserComponent.prototype.ngAfterViewInit = function () {
        this.dialog.options.css = { width: '550px' };
        this.dataUser.id = parseInt(this.dialog.options.id, 10) || 0;
        this.dataUser.role = this.dialog.options.role;
        if (this.dataUser.id > 0) {
            this.loadUser(this.dataUser.id);
        }
    };
    AdminNewUserComponent.prototype.loadUser = function (id) {
        var _this = this;
        this.dataUser.id = id;
        if (this.dataUser.id > 0) {
            this.api.send('user/profile', { id: this.dataUser.id }).then(function (res) {
                _this.dataUser.first_name = res['data'].first_name;
                _this.dataUser.last_name = res['data'].last_name;
                _this.dataUser.middle_name = res['data'].middle_name;
                _this.dataUser.email = res['data'].email;
                _this.dataUser.status = res['data'].status;
                _this.dataUser.username = res['data'].username;
                _this.dataUser.role = res['data'].role;
            });
        }
    };
    AdminNewUserComponent.prototype.onSave = function () {
        var _this = this;
        this.woFlash.hide();
        this.api.send('user/profile', { id: this.dataUser.id }, { data: this.dataUser }).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    _this.dataErrors = res['errors'];
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show();
                }, 100);
            }
            else {
                if (_this.dataUser.id === 0) {
                    _this.woFlash.addMessage('The operation was successfully done!');
                    _this.woFlash.show('userlist');
                    _this.dialog.close(false);
                }
                else {
                    if (_this.dataUser.id === parseInt(_this.auth.user['id'], 10)) {
                        _this.auth.user['first_name'] = _this.dataUser.first_name;
                        _this.auth.user['last_name'] = _this.dataUser.last_name;
                    }
                    _this.dataErrors = {};
                    setTimeout(function () {
                        _this.woFlash.addMessage('The operation was successfully done!');
                        _this.woFlash.show();
                    }, 100);
                }
            }
        });
    };
    AdminNewUserComponent.prototype.close = function () {
        this.dialog.close(false);
    };
    AdminNewUserComponent.prototype.doCancel = function (event) {
        this.dialog.close(false);
        event.preventDefault();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AdminNewUserComponent.prototype, "dialog", void 0);
    AdminNewUserComponent = __decorate([
        core_1.Component({
            templateUrl: 'admin-new-user.component.html',
            styleUrls: ['admin-new-user.component.css'],
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            wo_flash_service_1.WoFlashService,
            api_admin_service_1.ApiAdminService])
    ], AdminNewUserComponent);
    return AdminNewUserComponent;
}());
exports.AdminNewUserComponent = AdminNewUserComponent;
//# sourceMappingURL=admin-new-user.component.js.map