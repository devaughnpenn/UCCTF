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
var quiz_routing_module_1 = require("./quiz-routing.module");
var quiz_component_1 = require("./quiz.component");
var share_module_1 = require("@app/admin/share/share.module");
var question_component_1 = require("./question/question.component");
var ng2_scroll_to_el_1 = require("ng2-scroll-to-el");
var login_component_1 = require("./login/login.component");
var QuizModule = /** @class */ (function () {
    function QuizModule() {
    }
    QuizModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                wo_module_1.WoModule,
                quiz_routing_module_1.QuizRoutingModule,
                share_module_1.ShareModule,
                ng2_scroll_to_el_1.ScrollToModule
            ],
            declarations: [
                quiz_component_1.QuizComponent,
                question_component_1.QuestionComponent,
                login_component_1.LoginComponent,
            ]
        })
    ], QuizModule);
    return QuizModule;
}());
exports.QuizModule = QuizModule;
//# sourceMappingURL=quiz.module.js.map