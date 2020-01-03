"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var WoDialog = /** @class */ (function () {
    function WoDialog(component, options, service) {
        this.component = component;
        this.options = options;
        this.service = service;
        /** Subject for notifying the user that the dialog has finished closing. */
        this._afterClosed = new Subject_1.Subject();
    }
    WoDialog.prototype.close = function (result) {
        this._afterClosed.next(result);
        this._afterClosed.complete();
        this.service.close(this, result);
    };
    WoDialog.prototype.afterClosed = function () {
        return this._afterClosed;
    };
    return WoDialog;
}());
exports.WoDialog = WoDialog;
//# sourceMappingURL=wo-dialog.js.map