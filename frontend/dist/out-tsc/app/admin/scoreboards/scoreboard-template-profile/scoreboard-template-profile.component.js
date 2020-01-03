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
var api_admin_service_1 = require("@app/share/api-admin.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var ScoreboardTemplateProfileComponent = /** @class */ (function () {
    function ScoreboardTemplateProfileComponent(metaPage, router, woFlash, activeRoute, breadcrumbs, api) {
        this.metaPage = metaPage;
        this.router = router;
        this.woFlash = woFlash;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.api = api;
        this.dataErrors = {};
        this.dataForm = {};
        this.isLoading = false;
    }
    ScoreboardTemplateProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.profileId = Number(params['id']) || 0;
            _this.metaPage.setTitle(_this.profileId === 0 ? 'New Template' : 'Edit Template');
            _this.woFlash.show();
            _this.breadcrumbs.setLinks([
                { iconClass: 'fa fa-dashboard', route: '', text: 'Home' },
                { iconClass: 'fa fa-paint-brush', route: '/admin/scoreboards', text: 'Scoreboard Templates' },
                { text: 'Scoreboard Template Profile' },
            ]);
            _this.loadData();
        });
    };
    ScoreboardTemplateProfileComponent.prototype.loadData = function () {
        var _this = this;
        if (this.profileId > 0) {
            this.isLoading = true;
            this.api.send('scoreboard-templates/profile', { id: this.profileId }).then(function (res) {
                _this.isLoading = false;
                if (res['data'] !== null) {
                    _this.dataForm = res['data'];
                }
            });
        }
    };
    ScoreboardTemplateProfileComponent.prototype.doSave = function () {
        var _this = this;
        this.woFlash.hide();
        this.isLoading = true;
        this.api.send('scoreboard-templates/profile', { id: this.profileId }, this.dataForm).then(function (res) {
            _this.isLoading = false;
            if (res['errors']) {
                setTimeout(function () {
                    _this.dataErrors = res['errors'];
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show();
                }, 100);
            }
            else {
                if (_this.profileId === 0) {
                    _this.woFlash.addMessage('The operation was successfully done!');
                    _this.router.navigate(['/admin/scoreboards', res['data'].id]);
                    _this.dataErrors = {};
                }
                else {
                    _this.dataErrors = {};
                    setTimeout(function () {
                        _this.woFlash.addMessage('The operation was successfully done!');
                        _this.woFlash.show();
                    }, 100);
                }
            }
        });
    };
    ScoreboardTemplateProfileComponent.prototype.onImageChanged = function (event, column) {
        if (event.result && event.result.file.id) {
            this.dataForm[column] = event.result.file.id;
        }
        else if (event.remove === true) {
            this.dataForm[column] = null;
        }
    };
    ScoreboardTemplateProfileComponent = __decorate([
        core_1.Component({
            templateUrl: 'scoreboard-template-profile.component.html',
            styleUrls: ['scoreboard-template-profile.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            wo_flash_service_1.WoFlashService,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            api_admin_service_1.ApiAdminService])
    ], ScoreboardTemplateProfileComponent);
    return ScoreboardTemplateProfileComponent;
}());
exports.ScoreboardTemplateProfileComponent = ScoreboardTemplateProfileComponent;
//# sourceMappingURL=scoreboard-template-profile.component.js.map