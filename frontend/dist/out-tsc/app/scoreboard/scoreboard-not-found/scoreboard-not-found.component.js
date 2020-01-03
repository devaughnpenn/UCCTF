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
var ScoreboardNotFoundComponent = /** @class */ (function () {
    function ScoreboardNotFoundComponent(metaPage, router, activeRoute, breadcrumbs) {
        this.metaPage = metaPage;
        this.router = router;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
    }
    ScoreboardNotFoundComponent.prototype.ngAfterContentInit = function () {
        this.canvasEl.nativeElement.width = window.innerWidth / 3;
        this.canvasEl.nativeElement.height = window.innerHeight / 3;
        this.ctx = this.canvasEl.nativeElement.getContext('2d'); // context without alpha channel.
        this.idata = this.ctx.createImageData(this.canvasEl.nativeElement.width, this.canvasEl.nativeElement.height); // create image data
        this.buffer32 = new Uint32Array(this.idata.data.buffer); // get 32-bit view
        this.loop();
    };
    ScoreboardNotFoundComponent.prototype.loop = function () {
        var _this = this;
        this.noise();
        requestAnimationFrame(function () {
            setTimeout(function () {
                _this.loop();
            }, 30);
        });
    };
    ScoreboardNotFoundComponent.prototype.noise = function () {
        var len = this.buffer32.length - 1;
        while (len--) {
            // tslint:disable-next-line:no-bitwise
            this.buffer32[len] = Math.random() < 0.5 ? 0 : -1 >> 0;
        }
        this.ctx.putImageData(this.idata, 0, 0);
    };
    __decorate([
        core_1.ViewChild('canvasEl', { static: false }),
        __metadata("design:type", core_1.ElementRef)
    ], ScoreboardNotFoundComponent.prototype, "canvasEl", void 0);
    ScoreboardNotFoundComponent = __decorate([
        core_1.Component({
            templateUrl: 'scoreboard-not-found.component.html',
            styleUrls: ['scoreboard-not-found.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService])
    ], ScoreboardNotFoundComponent);
    return ScoreboardNotFoundComponent;
}());
exports.ScoreboardNotFoundComponent = ScoreboardNotFoundComponent;
//# sourceMappingURL=scoreboard-not-found.component.js.map