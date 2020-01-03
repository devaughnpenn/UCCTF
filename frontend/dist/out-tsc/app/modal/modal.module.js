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
var wo_module_1 = require("@app/wo-module/wo.module");
var forms_1 = require("@angular/forms");
var admin_new_user_component_1 = require("./admin-new-user/admin-new-user.component");
var admin_access_to_teams_component_1 = require("./admin-access-to-teams/admin-access-to-teams.component");
var message_before_submit_quiz_component_1 = require("./message-before-submit-quiz/message-before-submit-quiz.component");
var quiz_paused_component_1 = require("./quiz-paused/quiz-paused.component");
var quiz_finished_component_1 = require("@app/modal/quiz-finished/quiz-finished.component");
var quiz_socket_refresh_component_1 = require("@app/modal/quiz-socket-refresh/quiz-socket-refresh.component");
var quiz_not_started_component_1 = require("@app/modal/quiz-not-started/quiz-not-started.component");
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                wo_module_1.WoModule,
            ],
            declarations: [
                admin_new_user_component_1.AdminNewUserComponent,
                admin_access_to_teams_component_1.AdminAccessToTeamsComponent,
                message_before_submit_quiz_component_1.MessageBeforeSubmitQuizComponent,
                quiz_paused_component_1.QuizPausedComponent,
                quiz_finished_component_1.QuizFinishedComponent,
                quiz_socket_refresh_component_1.QuizSocketRefreshComponent,
                quiz_not_started_component_1.QuizNotStartedComponent,
            ],
            entryComponents: [
                admin_new_user_component_1.AdminNewUserComponent,
                admin_access_to_teams_component_1.AdminAccessToTeamsComponent,
                message_before_submit_quiz_component_1.MessageBeforeSubmitQuizComponent,
                quiz_paused_component_1.QuizPausedComponent,
                quiz_finished_component_1.QuizFinishedComponent,
                quiz_socket_refresh_component_1.QuizSocketRefreshComponent,
                quiz_not_started_component_1.QuizNotStartedComponent,
            ],
            providers: [],
        })
    ], ModalModule);
    return ModalModule;
}());
exports.ModalModule = ModalModule;
//# sourceMappingURL=modal.module.js.map