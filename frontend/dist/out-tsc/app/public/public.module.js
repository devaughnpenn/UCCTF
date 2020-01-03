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
var wo_module_1 = require("../wo-module/wo.module");
var public_routing_module_1 = require("./public-routing.module");
var home_component_1 = require("./home/home.component");
var public_component_1 = require("./public.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var request_password_reset_component_1 = require("./request-password-reset/request-password-reset.component");
var confirm_registration_component_1 = require("./confirm-registration/confirm-registration.component");
var success_registration_component_1 = require("./success-registration/success-registration.component");
var password_reset_component_1 = require("./password-reset/password-reset.component");
var share_module_1 = require("./share/share.module");
var my_profile_component_1 = require("./my-profile/my-profile.component");
var PublicModule = /** @class */ (function () {
    function PublicModule() {
    }
    PublicModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                wo_module_1.WoModule,
                public_routing_module_1.PublicRoutingModule,
                share_module_1.ShareModule,
            ],
            declarations: [
                public_component_1.PublicComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                request_password_reset_component_1.RequestPasswordResetComponent,
                confirm_registration_component_1.ConfirmRegistrationComponent,
                success_registration_component_1.SuccessRegistrationComponent,
                password_reset_component_1.PasswordResetComponent,
                my_profile_component_1.MyProfileComponent,
            ]
        })
    ], PublicModule);
    return PublicModule;
}());
exports.PublicModule = PublicModule;
//# sourceMappingURL=public.module.js.map