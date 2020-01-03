"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var core_module_1 = require("./core/core.module");
var wo_module_1 = require("./wo-module/wo.module");
var share_module_1 = require("./share/share.module");
var modal_module_1 = require("@app/modal/modal.module");
var app_component_1 = require("./app.component");
var page_not_found_component_1 = require("./share/page-not-found/page-not-found.component");
var auth_service_1 = require("./auth/auth.service");
var auth_admin_guard_service_1 = require("./auth/auth-admin-guard.service");
var auth_guest_guard_service_1 = require("./auth/auth-guest-guard.service");
var appRoutes = [
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    // { path: '', loadChildren: './public/public.module#PublicModule'},
    { path: 'scoreboard', loadChildren: './scoreboard/scoreboard.module#ScoreboardModule' },
    { path: 'quiz', loadChildren: './quiz/quiz.module#QuizModule' },
    // { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
    { path: '', redirectTo: '/quiz/login', pathMatch: 'full' },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                page_not_found_component_1.PageNotFoundComponent,
            ],
            entryComponents: [],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot(appRoutes),
                core_module_1.CoreModule,
                wo_module_1.WoModule,
                modal_module_1.ModalModule,
                share_module_1.ShareModule,
            ],
            providers: [
                auth_admin_guard_service_1.AuthAdminGuard,
                auth_guest_guard_service_1.AuthGuestGuard,
                auth_service_1.AuthService,
                platform_browser_1.Title,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map