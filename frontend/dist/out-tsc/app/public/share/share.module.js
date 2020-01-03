"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var core_module_1 = require("@app/core/core.module");
var router_1 = require("@angular/router");
// Other Components
var user_menu_component_1 = require("./user-menu/user-menu.component");
var ShareModule = /** @class */ (function () {
    function ShareModule() {
    }
    ShareModule = __decorate([
        core_1.NgModule({
            declarations: [
                user_menu_component_1.UserMenuComponent,
            ],
            imports: [
                common_1.CommonModule,
                core_module_1.CoreModule,
                router_1.RouterModule,
            ],
            exports: [
                user_menu_component_1.UserMenuComponent,
            ],
        })
    ], ShareModule);
    return ShareModule;
}());
exports.ShareModule = ShareModule;
//# sourceMappingURL=share.module.js.map