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
var forms_1 = require("@angular/forms");
var user_list_component_1 = require("./user-list/user-list.component");
var user_detail_component_1 = require("./user-detail/user-detail.component");
var users_routing_module_1 = require("./users-routing.module");
var wo_module_1 = require("../../wo-module/wo.module");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                users_routing_module_1.UsersRoutingModule,
                wo_module_1.WoModule,
                forms_1.FormsModule,
            ],
            declarations: [
                user_list_component_1.UserListComponent,
                user_detail_component_1.UserDetailComponent,
            ]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map