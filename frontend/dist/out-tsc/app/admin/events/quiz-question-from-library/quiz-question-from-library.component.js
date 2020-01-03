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
var QuizQuestionFromLibraryComponent = /** @class */ (function () {
    function QuizQuestionFromLibraryComponent(router, woFlash, activeRoute, api) {
        this.router = router;
        this.woFlash = woFlash;
        this.activeRoute = activeRoute;
        this.api = api;
        this.add = new core_1.EventEmitter();
        this._quizzQuestions = [];
        this.criteria = {
            page: 0,
            defSort: '',
            sort: '',
            filterQuery: ['title', 'created_at_from', 'created_at_to', 'status', 'type', 'common'],
            preFilter: {},
            filter: {},
        };
        this.curr_page = 0;
        this.last_page = 0;
        this.advanced_filters = false;
        this.loading = true;
        this.rows = [];
        this.STATUS_LABELS = [
            'Active',
            'Blocked',
            'Deleted',
        ];
        this.TYPES = [
            'Multiple choice',
            'Checkboxes',
            'Dropdown',
            'Open answer',
        ];
    }
    Object.defineProperty(QuizQuestionFromLibraryComponent.prototype, "quizzQuestions", {
        set: function (value) {
            this._quizzQuestions = value;
            this._updateRowsData();
        },
        enumerable: true,
        configurable: true
    });
    QuizQuestionFromLibraryComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.woFlash.show();
        this.activeRoute.params.subscribe(function (params) {
            _this.criteria['page'] = params['p'];
            _this.criteria['sort'] = _this.criteria.defSort;
            if (params['sort']) {
                _this.criteria.sort = params['sort'];
            }
            if (params['advanced'] === 'on') {
                _this.advanced_filters = true;
            }
            for (var prop in _this.criteria.filterQuery) {
                if (typeof params[_this.criteria.filterQuery[prop]] !== 'undefined' && params[_this.criteria.filterQuery[prop]] !== '') {
                    _this.criteria.filter[_this.criteria.filterQuery[prop]] = params[_this.criteria.filterQuery[prop]];
                }
            }
            _this.criteria.preFilter = Object.assign({}, _this.criteria.filter);
            _this.findBy();
        });
    };
    QuizQuestionFromLibraryComponent.prototype.toActualUrl = function () {
        var params = {};
        // Page
        if (this.criteria['page'] > 1) {
            params['p'] = this.criteria['page'];
        }
        // Sort
        if (this.criteria.sort !== this.criteria.defSort) {
            params['sort'] = this.criteria['sort'];
        }
        // filter
        for (var prop in this.criteria.filterQuery) {
            if (typeof this.criteria.filter[this.criteria.filterQuery[prop]] !== 'undefined' &&
                this.criteria.filter[this.criteria.filterQuery[prop]] !== '') {
                params[this.criteria.filterQuery[prop]] = this.criteria.filter[this.criteria.filterQuery[prop]];
            }
        }
        // Advanced filter
        if (this.advanced_filters === true) {
            params['advanced'] = 'on';
        }
        this.router.navigate([this.router.url.split(';')[0], params]);
    };
    QuizQuestionFromLibraryComponent.prototype.sortBy = function (event) {
        this.criteria.sort = event.current;
        this.toActualUrl();
    };
    QuizQuestionFromLibraryComponent.prototype.doSearch = function () {
        this.criteria.filter = Object.assign({}, this.criteria.preFilter);
        this.toActualUrl();
    };
    QuizQuestionFromLibraryComponent.prototype.toPage = function (event) {
        this.criteria.page = event['page'];
        this.toActualUrl();
    };
    QuizQuestionFromLibraryComponent.prototype.toggleAdvancedFilter = function () {
        this.advanced_filters = !this.advanced_filters;
    };
    QuizQuestionFromLibraryComponent.prototype.resetFilter = function (event) {
        event.preventDefault();
        this.criteria.filter = {};
        this.toActualUrl();
    };
    QuizQuestionFromLibraryComponent.prototype._updateRowsData = function () {
        for (var i = 0; i < this.rows.length; i++) {
            this.rows[i]['alreadyIncluded'] = false;
            for (var j = 0; j < this._quizzQuestions.length; j++) {
                if (this._quizzQuestions[j].library_question_id == this.rows[i].id) {
                    this.rows[i]['alreadyIncluded'] = true;
                    break;
                }
                if (this._quizzQuestions[j].id == this.rows[i].library_created_from_id) {
                    this.rows[i]['alreadyIncluded'] = true;
                    break;
                }
            }
        }
    };
    QuizQuestionFromLibraryComponent.prototype.findBy = function () {
        var _this = this;
        this.loading = true;
        var filter = this.criteria.filter;
        filter['status'] = 0;
        this.api.send('questions/index', this.criteria, { filter: filter }).then(function (res) {
            _this.curr_page = res['curr_page'];
            _this.last_page = res['last_page'];
            _this.rows = res['rows'];
            _this._updateRowsData();
            _this.loading = false;
        });
    };
    QuizQuestionFromLibraryComponent.prototype.addQuestion = function (row) {
        var _this = this;
        if (row['alreadyIncluded']) {
            return false;
        }
        this.loading = true;
        this.api.send('questions/item', { id: row['id'] }).then(function (res) {
            if (res['data'] !== null) {
                _this.loading = false;
                _this.add.emit({
                    'question': res['data'],
                    'answers': res['answers'],
                });
            }
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], QuizQuestionFromLibraryComponent.prototype, "add", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], QuizQuestionFromLibraryComponent.prototype, "quizzQuestions", null);
    QuizQuestionFromLibraryComponent = __decorate([
        core_1.Component({
            selector: 'question-library-picker',
            templateUrl: 'quiz-question-from-library.component.html',
            styleUrls: ['quiz-question-from-library.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.Router,
            wo_flash_service_1.WoFlashService,
            router_1.ActivatedRoute,
            api_admin_service_1.ApiAdminService])
    ], QuizQuestionFromLibraryComponent);
    return QuizQuestionFromLibraryComponent;
}());
exports.QuizQuestionFromLibraryComponent = QuizQuestionFromLibraryComponent;
//# sourceMappingURL=quiz-question-from-library.component.js.map