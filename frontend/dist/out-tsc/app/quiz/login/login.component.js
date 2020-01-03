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
var router_1 = require("@angular/router");
var wo_breadcrumbs_service_1 = require("@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service");
var meta_page_service_1 = require("@app/core/meta-page.service");
var api_quiz_service_1 = require("@app/share/api-quiz.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(metaPage, router, activeRoute, breadcrumbs, api) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.api = api;
        this.pin = '';
        this.isLoading = false;
    }
    LoginComponent.prototype.doLogin = function () {
        var _this = this;
        if (this.isLoading === true) {
            return false;
        }
        this.isLoading = true;
        this.formErrors = {};
        this.api.send('quiz/access', {}, { pin: this.pin }).then(function (res) {
            console.log('RESULT: ', res);
            _this.isLoading = false;
            if (!res['errors']) {
                _this.router.navigate(['/quiz/' + res['team_id'] + ':' + res['access_key']]);
            }
            else {
                setTimeout(function () {
                    _this.formErrors = res['errors'];
                }, 200);
            }
        }).catch(function (res) {
            _this.formErrors = {};
            _this.isLoading = false;
            alert('Oops! Something went wrong.');
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            api_quiz_service_1.ApiQuizService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map