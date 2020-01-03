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
var environment_1 = require("@env/environment");
var QuestionComponent = /** @class */ (function () {
    function QuestionComponent() {
        this.TYPES = [
            'Multiple choice',
            'Checkboxes',
            'Dropdown',
            'Open answer',
        ];
        this.environment = environment_1.environment;
    }
    QuestionComponent.prototype.ngOnInit = function () {
    };
    QuestionComponent.prototype.getImageUrl = function (id) {
        if (id) {
            var url = new URL(this.environment.API_BASE_URL + '/quiz/files/image?r=250x250', window.location.origin);
            url.searchParams.set('id', id);
            return url.href;
        }
        return '';
    };
    QuestionComponent.prototype.getFullImageUrl = function (id) {
        if (id) {
            var url = new URL(this.environment.API_BASE_URL + '/quiz/files/image?r=1000x1000', window.location.origin);
            url.searchParams.set('id', id);
            return url.href;
        }
        return null;
    };
    QuestionComponent.prototype.changeSelectedTextarea = function (event, question) {
        question.is_selected = event.target['value'].trim() !== '';
        this.sendAnswerToServer(question.id, 0, event.target['value'].trim());
    };
    QuestionComponent.prototype.changeSelectedCheckbox = function (event, question, answer) {
        var selected = false;
        var selectedAnswerIds = [];
        question.activeAnswers.forEach(function (item) {
            if (item.is_selected) {
                selected = true;
                selectedAnswerIds.push(item.id);
            }
        });
        question.is_selected = selected;
        this.sendAnswerToServer(question.id, selectedAnswerIds, '');
    };
    QuestionComponent.prototype.changeSelectedRadio = function (event, question) {
        this.sendAnswerToServer(question.id, [question.is_selected], '');
    };
    QuestionComponent.prototype.changeSelectedList = function (event, question) {
        this.sendAnswerToServer(question.id, [question.is_selected], '');
    };
    QuestionComponent.prototype.sendAnswerToServer = function (questionId, answerIds, answerText) {
        var data = {
            'type': 'set_answer',
            'question_id': questionId,
            'answer_ids': answerIds,
            'answer_text': answerText,
        };
        this.ws.send(JSON.stringify(data));
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuestionComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuestionComponent.prototype, "event", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuestionComponent.prototype, "question", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuestionComponent.prototype, "ws", void 0);
    QuestionComponent = __decorate([
        core_1.Component({
            selector: 'quiz-question',
            templateUrl: './question.component.html',
            styleUrls: ['./question.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], QuestionComponent);
    return QuestionComponent;
}());
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map