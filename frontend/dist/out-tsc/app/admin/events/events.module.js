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
var wo_module_1 = require("@app/wo-module/wo.module");
var events_routing_module_1 = require("./events-routing.module");
var events_list_component_1 = require("./events-list/events-list.component");
var event_tabs_component_1 = require("./event-tabs/event-tabs.component");
var event_profile_component_1 = require("./event-profile/event-profile.component");
var event_teams_component_1 = require("./event-teams/event-teams.component");
var event_scoreboard_component_1 = require("./event-scoreboard/event-scoreboard.component");
var share_module_1 = require("@app/share/share.module");
var quiz_questions_component_1 = require("./quiz-questions/quiz-questions.component");
var quiz_question_from_library_component_1 = require("./quiz-question-from-library/quiz-question-from-library.component");
var event_results_component_1 = require("./event-results/event-results.component");
var ng2_scroll_to_el_1 = require("ng2-scroll-to-el");
var EventsModule = /** @class */ (function () {
    function EventsModule() {
    }
    EventsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                wo_module_1.WoModule,
                events_routing_module_1.EventsRoutingModule,
                share_module_1.ShareModule,
                ng2_scroll_to_el_1.ScrollToModule
            ],
            declarations: [
                events_list_component_1.EventsListComponent,
                event_tabs_component_1.EventTabsComponent,
                event_profile_component_1.EventProfileComponent,
                event_teams_component_1.EventTeamsComponent,
                event_scoreboard_component_1.EventScoreboardComponent,
                quiz_questions_component_1.QuizQuestionsComponent,
                event_results_component_1.EventResultsComponent,
                quiz_question_from_library_component_1.QuizQuestionFromLibraryComponent
            ]
        })
    ], EventsModule);
    return EventsModule;
}());
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map