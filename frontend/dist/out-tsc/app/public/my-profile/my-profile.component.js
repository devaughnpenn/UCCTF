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
var auth_service_1 = require("@app/auth/auth.service");
var meta_page_service_1 = require("@app/core/meta-page.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var api_member_service_1 = require("@app/share/api-member.service");
var MyProfileComponent = /** @class */ (function () {
    function MyProfileComponent(api, auth, woFlash, metaPage) {
        var _this = this;
        this.api = api;
        this.auth = auth;
        this.woFlash = woFlash;
        this.metaPage = metaPage;
        this.metaPage.setTitle('My Profile');
        this.api.send('auth/profile').then(function (res) {
            _this.user = res['data'];
        });
    }
    MyProfileComponent.prototype.doSave = function () {
        var _this = this;
        this.woFlash.hide();
        this.dataErrors = {};
        this.api.send('auth/profile', {}, this.user).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    _this.dataErrors = res['errors'];
                }, 200);
            }
            else {
                setTimeout(function () {
                    _this.woFlash.addMessage('The operation was successfully done!');
                    _this.woFlash.show('my-profile');
                    _this.auth.user['first_name'] = _this.user['first_name'];
                    _this.auth.user['last_name'] = _this.user['last_name'];
                    _this.auth.user['middle_name'] = _this.user['middle_name'];
                    _this.auth.setUser(_this.auth.user);
                }, 100);
                _this.dataErrors = {};
            }
        });
    };
    MyProfileComponent = __decorate([
        core_1.Component({
            templateUrl: 'my-profile.component.html',
            styleUrls: ['my-profile.component.css']
        }),
        __metadata("design:paramtypes", [api_member_service_1.ApiMemberService,
            auth_service_1.AuthService,
            wo_flash_service_1.WoFlashService,
            meta_page_service_1.MetaPageService])
    ], MyProfileComponent);
    return MyProfileComponent;
}());
exports.MyProfileComponent = MyProfileComponent;
//# sourceMappingURL=my-profile.component.js.map