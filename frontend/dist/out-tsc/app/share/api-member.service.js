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
var environment_1 = require("../../environments/environment");
var ApiMemberService = /** @class */ (function () {
    function ApiMemberService(http) {
        this.http = http;
    }
    ApiMemberService.prototype.send = function (url, get, post) {
        if (get === void 0) { get = null; }
        if (post === void 0) { post = null; }
        return this.http.send(environment_1.environment.API_BASE_URL + '/member/' + url, get, post);
    };
    ApiMemberService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_service_1.HttpService])
    ], ApiMemberService);
    return ApiMemberService;
}());
exports.ApiMemberService = ApiMemberService;
//# sourceMappingURL=api-member.service.js.map