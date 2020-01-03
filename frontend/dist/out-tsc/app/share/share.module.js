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
var api_admin_service_1 = require("./api-admin.service");
var api_general_service_1 = require("./api-general.service");
var api_member_service_1 = require("./api-member.service");
var api_quiz_service_1 = require("./api-quiz.service");
var core_module_1 = require("../core/core.module");
var polling_service_1 = require("./polling.service");
var question_answers_list_component_1 = require("./question-answers-list/question-answers-list.component");
var wo_module_1 = require("@app/wo-module/wo.module");
var forms_1 = require("@angular/forms");
var upload_image_component_1 = require("@app/share/upload-image/upload-image.component");
var convert_from_24_to_12_format_pipe_1 = require("./convert-from-24-to-12-format.pipe");
var seconds_to_time_pipe_1 = require("./seconds-to-time.pipe");
var ShareModule = /** @class */ (function () {
    function ShareModule() {
    }
    ShareModule = __decorate([
        core_1.NgModule({
            declarations: [
                question_answers_list_component_1.QuestionAnswersListComponent,
                convert_from_24_to_12_format_pipe_1.ConvertFrom24To12Format,
                seconds_to_time_pipe_1.SecondsToTimePipe,
                upload_image_component_1.UploadImageComponent,
            ],
            imports: [
                common_1.CommonModule,
                core_module_1.CoreModule,
                wo_module_1.WoModule,
                forms_1.FormsModule,
            ],
            providers: [
                api_admin_service_1.ApiAdminService,
                api_general_service_1.ApiGeneralService,
                api_member_service_1.ApiMemberService,
                api_quiz_service_1.ApiQuizService,
                polling_service_1.PollingService,
            ],
            exports: [
                question_answers_list_component_1.QuestionAnswersListComponent,
                convert_from_24_to_12_format_pipe_1.ConvertFrom24To12Format,
                seconds_to_time_pipe_1.SecondsToTimePipe,
                upload_image_component_1.UploadImageComponent,
            ],
        })
    ], ShareModule);
    return ShareModule;
}());
exports.ShareModule = ShareModule;
//# sourceMappingURL=share.module.js.map