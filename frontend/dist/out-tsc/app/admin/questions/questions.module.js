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
var share_module_1 = require("@app/share/share.module");
var questions_routing_module_1 = require("./questions-routing.module");
var questions_list_component_1 = require("./questions-list/questions-list.component");
var questions_item_component_1 = require("./questions-item/questions-item.component");
var QuestionsModule = /** @class */ (function () {
    function QuestionsModule() {
    }
    QuestionsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                wo_module_1.WoModule,
                questions_routing_module_1.QuestionsRoutingModule,
                share_module_1.ShareModule,
            ],
            declarations: [
                questions_list_component_1.QuestionsListComponent,
                questions_item_component_1.QuestionsItemComponent,
            ]
        })
    ], QuestionsModule);
    return QuestionsModule;
}());
exports.QuestionsModule = QuestionsModule;
//# sourceMappingURL=questions.module.js.map