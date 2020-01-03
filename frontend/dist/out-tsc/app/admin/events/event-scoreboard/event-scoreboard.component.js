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
var api_admin_service_1 = require("@app/share/api-admin.service");
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var meta_page_service_1 = require("@app/core/meta-page.service");
var EventScoreboardComponent = /** @class */ (function () {
    function EventScoreboardComponent(activeRoute, api, woFlash, metaPage) {
        this.activeRoute = activeRoute;
        this.api = api;
        this.woFlash = woFlash;
        this.metaPage = metaPage;
        this.scoreboard = {};
        this.is_downclock = '1';
        this.dataErrors = {};
        this.templates = [];
        this.bgcolor = '';
        this.isLoading = false;
        this.metaPage.setTitle('Scoreboard');
    }
    EventScoreboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.parent.params.subscribe(function (parentParams) {
            _this.eventId = parseInt(parentParams['id'], 10) || 0;
            _this.loadData();
            _this.woFlash.show();
        });
    };
    EventScoreboardComponent.prototype.loadData = function () {
        var _this = this;
        this.isLoading = true;
        this.api.send('events/scoreboard', { id: this.eventId }).then(function (res) {
            _this.isLoading = false;
            _this.scoreboard = res['scoreboard'];
            _this.templates = res['templates'];
        });
    };
    EventScoreboardComponent.prototype.getDashboardUrl = function () {
        var url = '';
        url = window.location.protocol + '//' + window.location.host + '/scoreboard/' + this.scoreboard['access_key'];
        return url;
    };
    EventScoreboardComponent.prototype.copyToClipboard = function (text) {
        var textarea = document.createElement('textarea');
        textarea.textContent = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };
    EventScoreboardComponent.prototype.doSave = function () {
        var _this = this;
        this.woFlash.hide();
        this.api.send('events/scoreboard', { id: this.eventId }, this.scoreboard).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    _this.dataErrors = res['errors'];
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show();
                }, 100);
            }
            else {
                _this.dataErrors = {};
                setTimeout(function () {
                    _this.woFlash.addMessage('The operation was successfully done!');
                    _this.woFlash.show();
                }, 100);
            }
        });
    };
    EventScoreboardComponent.prototype.onImageChanged = function (event, scoreboard) {
        if (event.result && event.result.file.id) {
            scoreboard['background_image_file_id'] = event.result.file.id;
        }
        else if (event.remove === true) {
            scoreboard['background_image_file_id'] = null;
        }
    };
    EventScoreboardComponent = __decorate([
        core_1.Component({
            templateUrl: 'event-scoreboard.component.html',
            styleUrls: ['event-scoreboard.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            api_admin_service_1.ApiAdminService,
            wo_flash_service_1.WoFlashService,
            meta_page_service_1.MetaPageService])
    ], EventScoreboardComponent);
    return EventScoreboardComponent;
}());
exports.EventScoreboardComponent = EventScoreboardComponent;
//# sourceMappingURL=event-scoreboard.component.js.map