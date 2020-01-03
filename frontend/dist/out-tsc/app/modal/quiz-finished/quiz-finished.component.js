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
var QuizFinishedComponent = /** @class */ (function () {
    function QuizFinishedComponent() {
    }
    QuizFinishedComponent.prototype.ngAfterViewInit = function () {
        this.dialog.options.css = {
            width: '500px',
        };
    };
    QuizFinishedComponent.prototype.close = function () {
        this.dialog.close(false);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuizFinishedComponent.prototype, "dialog", void 0);
    QuizFinishedComponent = __decorate([
        core_1.Component({
            selector: 'app-quiz-finished',
            templateUrl: './quiz-finished.component.html',
            styleUrls: ['./quiz-finished.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], QuizFinishedComponent);
    return QuizFinishedComponent;
}());
exports.QuizFinishedComponent = QuizFinishedComponent;
//# sourceMappingURL=quiz-finished.component.js.map