"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_admin_guard_service_1 = require("../../auth/auth-admin-guard.service");
var user_list_component_1 = require("./user-list/user-list.component");
var user_detail_component_1 = require("./user-detail/user-detail.component");
var routes = [
    { path: '', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: user_list_component_1.UserListComponent, data: { role: 'admin' } },
    { path: 'participants', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: user_list_component_1.UserListComponent, data: { role: 'public' } },
    { path: ':id', canActivate: [auth_admin_guard_service_1.AuthAdminGuard], component: user_detail_component_1.UserDetailComponent },
];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());
exports.UsersRoutingModule = UsersRoutingModule;
//# sourceMappingURL=users-routing.module.js.map