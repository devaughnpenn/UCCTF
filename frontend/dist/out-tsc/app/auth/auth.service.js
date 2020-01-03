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
var app_storage_service_1 = require("../core/app-storage.service");
var AuthService = /** @class */ (function () {
    function AuthService(storage) {
        this.storage = storage;
        this.isGuest = true;
        this.token = null;
        this.redirectUrl = null;
        this.storeKey = '__auth.service_';
        if (this.getStoreParam('access_token') != null) {
            this.token = this.getStoreParam('access_token');
            this.isGuest = !this.isAuthenticated();
            this.user = this.getStoreParam('user');
        }
    }
    AuthService.prototype.getStoreParam = function (key) {
        return this.storage.getParam(this.storeKey + key);
    };
    AuthService.prototype.setStoreParam = function (key, value) {
        return this.storage.setParam(this.storeKey + key, value);
    };
    /**
     * Set the access token.
     */
    AuthService.prototype.setToken = function (token, expires_in) {
        this.token = token;
        this.setStoreParam('access_token', this.token);
        this.setStoreParam('expires_in', expires_in);
        this.touchToken();
        this.isGuest = !this.isAuthenticated();
    };
    /**
     * Set user object.
     * @param userInfo the object.
     */
    AuthService.prototype.setUser = function (userInfo) {
        this.user = userInfo;
        this.setStoreParam('user', this.user);
    };
    /**
     * Set the refresh access token.
     */
    AuthService.prototype.setRefreshToken = function (refresh_token) {
        this.setStoreParam('refresh_token', refresh_token);
    };
    /**
     * Return the refresh access token.
     */
    AuthService.prototype.getRefreshToken = function () {
        return this.getStoreParam('refresh_token');
    };
    /**
     * Return the access token.
     */
    AuthService.prototype.getToken = function () {
        return this.getStoreParam('access_token');
    };
    /**
     * Whether the current user is a authenticated.
     */
    AuthService.prototype.isAuthenticated = function () {
        if (this.getStoreParam('access_token') !== null) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Logs out the current user.
     */
    AuthService.prototype.logout = function () {
        this.isGuest = true;
        this.setStoreParam('access_token', null);
        this.setStoreParam('refresh_token', null);
    };
    /**
     * Sets modification time of token.
     */
    AuthService.prototype.touchToken = function () {
        var timeStamp = Math.floor(Date.now() / 1000);
        this.setStoreParam('last_active_time', timeStamp);
    };
    /**
     * Checks if the user can perform the operation as specified by the given permission.
     * @param role string
     */
    AuthService.prototype.can = function (role) {
        if (this.isGuest === true) {
            return false;
        }
        return this.user && this.user['roles'] && typeof this.user['roles'][role] !== 'undefined';
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_storage_service_1.AppStorageService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map