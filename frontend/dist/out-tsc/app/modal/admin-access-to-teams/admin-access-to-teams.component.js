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
var api_admin_service_1 = require("@app/share/api-admin.service");
var wo_dialog_service_1 = require("@app/wo-module/wo-dialog/wo-dialog.service");
var wo_dialog_alert_component_1 = require("@app/wo-module/wo-dialog/wo-dialog-alert/wo-dialog-alert.component");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var AdminAccessToTeamsComponent = /** @class */ (function () {
    function AdminAccessToTeamsComponent(api, dialogService, woFlash) {
        this.api = api;
        this.dialogService = dialogService;
        this.woFlash = woFlash;
        this.eventId = null;
        this.teams = [];
        this.allChecked = true;
        this.isProcess = false;
        this.currIndex = 0;
    }
    AdminAccessToTeamsComponent.prototype.ngAfterViewInit = function () {
        this.dialog.options.css = {
            width: '500px',
        };
        this.eventId = this.dialog.options.eventId;
        this.loadData();
    };
    AdminAccessToTeamsComponent.prototype.close = function () {
        this.isProcess = false;
        this.dialog.close(false);
    };
    AdminAccessToTeamsComponent.prototype.loadData = function () {
        var _this = this;
        this.api.send('events/send-access-to-teams', { event_id: this.eventId }).then(function (res) {
            res['teams'].forEach(function (el) {
                el.is_checked = true;
                el.status = 'N/A';
                el.is_ok = false;
                el.is_fail = false;
            });
            _this.teams = res['teams'];
        });
    };
    AdminAccessToTeamsComponent.prototype.doSend = function () {
        var _this = this;
        var count = 0;
        this.woFlash.hide();
        this.teams.forEach(function (el) {
            if (el.is_checked === true) {
                count++;
            }
            el.status = 'N/A';
            el.is_ok = false;
            el.is_fail = false;
        });
        if (count === 0) {
            setTimeout(function () {
                _this.dialogService.open(wo_dialog_alert_component_1.WoDialogAlertComponent, { message: 'You must select team(s).', css: { top: '130px' } });
            }, 10);
        }
        else {
            this.currIndex = 0;
            this.isProcess = true;
            this.sendEmail();
        }
    };
    AdminAccessToTeamsComponent.prototype.sendEmail = function () {
        var _this = this;
        if (this.isProcess === true) {
            if (this.currIndex < this.teams.length) {
                if (this.teams[this.currIndex]) {
                    if (this.teams[this.currIndex].is_checked !== true) {
                        this.currIndex++;
                        this.sendEmail();
                    }
                    else {
                        var accessLink = window.location.protocol +
                            '//' + window.location.host +
                            '/quiz/' +
                            this.eventId + ':' + this.teams[this.currIndex].access_key;
                        var loginLink = window.location.protocol +
                            '//' + window.location.host;
                        this.api.send('events/send-access-to-teams', { event_id: this.eventId }, {
                            team_id: this.teams[this.currIndex].id,
                            accessLink: accessLink,
                            loginLink: loginLink,
                        }).then(function (res) {
                            if (res['code'] === 200) {
                                _this.teams[_this.currIndex].status = 'OK';
                                _this.teams[_this.currIndex].is_ok = true;
                                _this.teams[_this.currIndex].is_fail = false;
                            }
                            else {
                                _this.teams[_this.currIndex].status = 'ERROR';
                                _this.teams[_this.currIndex].is_ok = false;
                                _this.teams[_this.currIndex].is_fail = true;
                            }
                            _this.currIndex++;
                            _this.sendEmail();
                        }).catch(function (err) {
                            _this.isProcess = false;
                            _this.currIndex = 0;
                            _this.woFlash.addError('Oops! Something went wrong!');
                            _this.woFlash.show('sendEmail');
                        });
                    }
                }
            }
            else {
                this.woFlash.addMessage('The operation was done!');
                this.woFlash.show('sendEmail');
                this.isProcess = false;
                this.currIndex = 0;
            }
        }
    };
    AdminAccessToTeamsComponent.prototype.doSelectAll = function () {
        var _this = this;
        this.teams.forEach(function (el) {
            el.is_checked = _this.allChecked;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AdminAccessToTeamsComponent.prototype, "dialog", void 0);
    AdminAccessToTeamsComponent = __decorate([
        core_1.Component({
            templateUrl: 'admin-access-to-teams.component.html',
            styleUrls: ['admin-access-to-teams.component.css'],
        }),
        __metadata("design:paramtypes", [api_admin_service_1.ApiAdminService,
            wo_dialog_service_1.WoDialogService,
            wo_flash_service_1.WoFlashService])
    ], AdminAccessToTeamsComponent);
    return AdminAccessToTeamsComponent;
}());
exports.AdminAccessToTeamsComponent = AdminAccessToTeamsComponent;
//# sourceMappingURL=admin-access-to-teams.component.js.map