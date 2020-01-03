"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/observable/interval");
require("rxjs/add/operator/takeWhile");
var PollingConnect = /** @class */ (function () {
    function PollingConnect(url, service, http, body) {
        this.url = url;
        this.service = service;
        this.http = http;
        this.body = body;
        /** Subject for notifying the user that the dialog has finished closing. */
        this._onMessage = new Subject_1.Subject();
        this._onClose = new Subject_1.Subject();
        this.isEnable = true;
        this.inProgress = false;
        this.lastHash = '';
    }
    PollingConnect.prototype.start = function () {
        var _this = this;
        Rx_1.Observable
            .interval(5 * 1000)
            .startWith(0)
            .takeWhile(function () { return _this.isEnable && !_this.inProgress; })
            .subscribe(function (i) {
            _this.doRequest()
                .then(function (res) {
                setTimeout(function () {
                    _this.inProgress = false;
                    if (res['hash']) {
                        _this.lastHash = res['hash'];
                    }
                    _this._onMessage.next(res);
                    _this.start();
                }, 1000);
            }).catch(function (error) {
                _this.inProgress = false;
                _this.close(error);
                console.error(error);
            });
        });
    };
    PollingConnect.prototype.close = function (result) {
        this.isEnable = false;
        this._onClose.next(result);
        this._onClose.complete();
        this.service.close(this);
    };
    PollingConnect.prototype.onMessage = function () {
        return this._onMessage;
    };
    PollingConnect.prototype.doRequest = function () {
        this.inProgress = true;
        return this.http.send(this.url, { hash: this.lastHash }, this.body);
    };
    PollingConnect.prototype.onClose = function () {
        return this._onClose;
    };
    return PollingConnect;
}());
exports.PollingConnect = PollingConnect;
//# sourceMappingURL=polling-connect.js.map