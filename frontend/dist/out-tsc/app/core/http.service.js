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
var http_1 = require("@angular/common/http");
var auth_service_1 = require("@app/auth/auth.service");
var router_1 = require("@angular/router");
require("rxjs/add/operator/toPromise");
var environment_1 = require("../../environments/environment");
var HttpService = /** @class */ (function () {
    function HttpService(http, router, auth) {
        this.http = http;
        this.router = router;
        this.auth = auth;
    }
    /**
     * Execute the given HTTP request.
     *
     * @param method The type of HTTP request method.
     * @param url The url string.
     * @param get_params The object with get params
     * @param post_params The object with POST/PUT params
     * @param isRepeat whether retry do request repeat after fail autentification.
     */
    HttpService.prototype.exec = function (method, url, get_params, post_params, isRepeat) {
        var _this = this;
        if (get_params === void 0) { get_params = null; }
        if (post_params === void 0) { post_params = null; }
        if (isRepeat === void 0) { isRepeat = false; }
        var promise = new Promise(function (resolve, reject) {
            var query_params = new URLSearchParams();
            if (get_params) {
                for (var key in get_params) {
                    if (get_params.hasOwnProperty(key)) {
                        query_params.set(key, get_params[key]);
                    }
                }
                url = url + '?' + query_params.toString();
            }
            var headers = new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + _this.auth.getToken()
            });
            var options = { headers: headers };
            var httpPromise;
            if (method === 'GET') {
                httpPromise = _this.http.get(url, options).toPromise();
            }
            else {
                if (method === 'POST') {
                    httpPromise = _this.http.post(url, post_params, options).toPromise();
                }
                else if (method === 'PUT') {
                    httpPromise = _this.http.put(url, post_params, options).toPromise();
                }
                else if (method === 'OPTIONS') {
                    httpPromise = _this.http.options(url, options).toPromise();
                }
                else if (method === 'DELETE') {
                    httpPromise = _this.http.delete(url, options).toPromise();
                }
                else if (method === 'HEAD') {
                    httpPromise = _this.http.head(url, options).toPromise();
                }
            }
            httpPromise.then(function (res) {
                resolve(res || {});
            }).catch(function (error) {
                var body = error || '';
                console.log(body);
                if (body.status === 401 && body.statusText === 'Unauthorized') {
                    if (_this.auth.getRefreshToken() !== null && isRepeat === false) {
                        _this.http
                            .post(environment_1.environment.API_BASE_URL + '/general/auth/token-refresh', { refresh_token: _this.auth.getRefreshToken() })
                            .toPromise()
                            .then(function (r) {
                            var new_token = r || {};
                            _this.auth.setToken(new_token['access_token'], new_token['expires_in']);
                            _this.auth.setRefreshToken(new_token['refresh_token']);
                            _this.exec(method, url, null, post_params, true)
                                .then(function (res) {
                                resolve(res);
                            })
                                .catch(function (err) {
                                console.error(error);
                                reject(error);
                            });
                        })
                            .catch(function (ErrResponse) {
                            _this.auth.logout();
                            _this.router.navigate(['/admin/login']);
                            console.error(error);
                            reject(error);
                        });
                    }
                    else {
                        console.error(error);
                        _this.auth.logout();
                        _this.router.navigate(['/admin/login']);
                        reject(error);
                    }
                }
                else {
                    console.error(error);
                    reject(error);
                }
            });
        });
        return promise;
    };
    HttpService.prototype.send = function (url, get_params, post_params) {
        if (get_params === void 0) { get_params = null; }
        if (post_params === void 0) { post_params = null; }
        if (post_params === null) {
            return this.exec('GET', url, get_params, post_params);
        }
        else {
            return this.exec('POST', url, get_params, post_params);
        }
    };
    HttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            router_1.Router,
            auth_service_1.AuthService])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map