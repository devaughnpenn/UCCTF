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
var wo_flash_service_1 = require("@app/wo-module/wo-flash/wo-flash.service");
var wo_breadcrumbs_service_1 = require("@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service");
var meta_page_service_1 = require("@app/core/meta-page.service");
var api_admin_service_1 = require("@app/share/api-admin.service");
var QuestionsItemComponent = /** @class */ (function () {
    function QuestionsItemComponent(metaPage, router, woFlash, activeRoute, breadcrumbs, api) {
        this.metaPage = metaPage;
        this.router = router;
        this.woFlash = woFlash;
        this.activeRoute = activeRoute;
        this.breadcrumbs = breadcrumbs;
        this.api = api;
        this.STATUS_LABELS = [
            'Active',
            'Blocked',
        ];
        this.TYPES = [
            'Multiple choice',
            'Checkboxes',
            'Dropdown',
            'Open answer',
        ];
        this.id = 0;
        this.dataForm = {
            'id': 0,
            'is_library_question': 1,
            'status': 0,
            'show_description': 0,
            'description': null,
            'type': 0,
            'points': 0,
            'level': 1,
            'answers': []
        };
        this.dataErrors = {};
        this.criteria = {
            defSort: '',
            sort: '',
        };
        this.onImageChanged = function (event, question) {
            if (event.result && event.result.file.id) {
                question['file_id'] = event.result.file.id;
            }
            else if (event.remove === true) {
                question['file_id'] = null;
            }
        };
    }
    QuestionsItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.params.subscribe(function (params) {
            _this.itemId = Number(params['id']) || 0;
            _this.metaPage.setTitle(_this.itemId === 0 ? 'New' : 'Edit');
            _this.woFlash.show();
            _this.loadData();
        });
    };
    QuestionsItemComponent.prototype.loadData = function () {
        var _this = this;
        if (this.itemId > 0) {
            this.api.send('questions/item', { id: this.itemId }).then(function (res) {
                if (res['data'] !== null) {
                    _this.dataForm = res['data'];
                }
            });
        }
    };
    QuestionsItemComponent.prototype.setQuestionAnswers = function (answers, question) {
        question['answers'] = answers;
    };
    QuestionsItemComponent.prototype.setQuestionNeedUpdate = function (needUpdate, question, answersModified) {
    };
    QuestionsItemComponent.prototype.doSave = function () {
        var _this = this;
        this.woFlash.hide();
        console.log(this.dataForm);
        this.api.send('questions/item', { id: this.itemId }, this.dataForm).then(function (res) {
            if (res['errors']) {
                setTimeout(function () {
                    _this.dataErrors = res['errors'];
                    _this.woFlash.addError(res['errors']);
                    _this.woFlash.show();
                }, 100);
            }
            else {
                if (_this.itemId === 0) {
                    _this.woFlash.addMessage('The operation was successfully done!');
                    _this.router.navigate(['/admin/questions', res['data'].id]);
                    _this.woFlash.show();
                }
                else {
                    setTimeout(function () {
                        _this.woFlash.addMessage('The operation was successfully done!');
                        _this.woFlash.show();
                    }, 100);
                }
            }
        });
    };
    QuestionsItemComponent = __decorate([
        core_1.Component({
            templateUrl: 'questions-item.component.html',
            styleUrls: ['questions-item.component.css']
        }),
        __metadata("design:paramtypes", [meta_page_service_1.MetaPageService,
            router_1.Router,
            wo_flash_service_1.WoFlashService,
            router_1.ActivatedRoute,
            wo_breadcrumbs_service_1.WoBreadCrumbsService,
            api_admin_service_1.ApiAdminService])
    ], QuestionsItemComponent);
    return QuestionsItemComponent;
}());
exports.QuestionsItemComponent = QuestionsItemComponent;
//# sourceMappingURL=questions-item.component.js.map