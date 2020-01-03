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
var http_service_1 = require("../core/http.service");
var auth_service_1 = require("../auth/auth.service");
var polling_connect_1 = require("./polling-connect");
var PollingService = /** @class */ (function () {
    function PollingService(http, auth) {
        this.http = http;
        this.auth = auth;
        this.connections = [];
        return PollingService_1.instance = PollingService_1.instance || this;
    }
    PollingService_1 = PollingService;
    PollingService.prototype.open = function (url, data) {
        var ref = new polling_connect_1.PollingConnect(url, this, this.http, data);
        this.connections.push(ref);
        return ref;
    };
    PollingService.prototype.close = function (dialog, result) {
        this.connections.splice(this.connections.indexOf(dialog), 1);
    };
    var PollingService_1;
    PollingService = PollingService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_service_1.HttpService,
            auth_service_1.AuthService])
    ], PollingService);
    return PollingService;
}());
exports.PollingService = PollingService;
//# sourceMappingURL=polling.service.js.map