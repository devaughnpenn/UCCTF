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
var router_1 = require("@angular/router");
var wo_radio_component_1 = require("./wo-radio/wo-radio.component");
var wo_checkbox_component_1 = require("./wo-checkbox/wo-checkbox.component");
var wo_datepicker_component_1 = require("./wo-datepicker/wo-datepicker.component");
var wo_timepicker_component_1 = require("./wo-timepicker/wo-timepicker.component");
var wo_preview_image_component_1 = require("./wo-preview-image/wo-preview-image.component");
var wo_colorpicker_component_1 = require("./wo-colorpicker/wo-colorpicker.component");
var wo_slide_toggle_component_1 = require("./wo-slide-toggle/wo-slide-toggle.component");
var wo_slide_toggle_button_component_1 = require("./wo-slide-toggle-button/wo-slide-toggle-button.component");
var wo_flash_service_1 = require("./wo-flash/wo-flash.service");
var wo_flash_component_1 = require("./wo-flash/wo-flash.component");
var wo_datalist_component_1 = require("./wo-datalist/wo-datalist.component");
var wo_autocomplete_component_1 = require("./wo-autocomplete/wo-autocomplete.component");
var wo_paginator_component_1 = require("./wo-paginator/wo-paginator.component");
var wo_delete_button_component_1 = require("./wo-delete-button/wo-delete-button.component");
var wo_breadcrumbs_component_1 = require("./wo-breadcrumbs/wo-breadcrumbs.component");
var wo_breadcrumbs_service_1 = require("./wo-breadcrumbs/wo-breadcrumbs.service");
var wo_highlight_pipe_1 = require("./wo-highlight/wo-highlight.pipe");
var wo_sort_component_1 = require("./wo-sort/wo-sort.component");
var wo_dialog_service_1 = require("./wo-dialog/wo-dialog.service");
var wo_dialogs_component_1 = require("./wo-dialog/wo-dialogs.component");
var wo_dialog_component_1 = require("./wo-dialog/wo-dialog.component");
var wo_dialog_directive_1 = require("./wo-dialog/wo-dialog.directive");
var wo_dialog_alert_component_1 = require("./wo-dialog/wo-dialog-alert/wo-dialog-alert.component");
var wo_dialog_confirm_component_1 = require("./wo-dialog/wo-dialog-confirm/wo-dialog-confirm.component");
var wo_dialog_prompt_component_1 = require("./wo-dialog/wo-dialog-prompt/wo-dialog-prompt.component");
var wo_avatar_component_1 = require("./wo-avatar/wo-avatar.component");
var wo_awatar_edit_component_1 = require("./wo-avatar/wo-awatar-edit.component");
var WO_COMPONENTS = [
    wo_dialog_component_1.WoDialogComponent,
    wo_dialog_directive_1.WoDialogDirective,
    wo_dialogs_component_1.WoDialogsComponent,
    wo_dialog_alert_component_1.WoDialogAlertComponent,
    wo_dialog_confirm_component_1.WoDialogConfirmComponent,
    wo_dialog_prompt_component_1.WoDialogPromptComponent,
    wo_radio_component_1.WoRadioComponent,
    wo_checkbox_component_1.WoCheckboxComponent,
    wo_datepicker_component_1.WoDatepickerComponent,
    wo_timepicker_component_1.WoTimepickerComponent,
    wo_paginator_component_1.WoPaginatorComponent,
    wo_datalist_component_1.WoDatalistComponent,
    wo_autocomplete_component_1.WoAutocompleteComponent,
    wo_flash_component_1.WoFlashComponent,
    wo_highlight_pipe_1.WoHighlightPipe,
    wo_slide_toggle_component_1.WoSlideToggleComponent,
    wo_slide_toggle_button_component_1.WoSlideToggleButtonComponent,
    wo_sort_component_1.WoSortComponent,
    wo_breadcrumbs_component_1.WoBreadcrumbsComponent,
    wo_delete_button_component_1.WoDeleteButtonComponent,
    wo_avatar_component_1.WoAvatarComponent,
    wo_awatar_edit_component_1.WoAwatarEditComponent,
    wo_colorpicker_component_1.WoColorpickerComponent,
    wo_preview_image_component_1.WoPreviewImageComponent,
];
var WoModule = /** @class */ (function () {
    function WoModule() {
    }
    WoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
            ],
            declarations: WO_COMPONENTS,
            exports: WO_COMPONENTS,
            entryComponents: [
                wo_dialog_alert_component_1.WoDialogAlertComponent,
                wo_dialog_confirm_component_1.WoDialogConfirmComponent,
                wo_dialog_prompt_component_1.WoDialogPromptComponent,
                wo_awatar_edit_component_1.WoAwatarEditComponent,
            ],
            providers: [
                wo_flash_service_1.WoFlashService,
                wo_dialog_service_1.WoDialogService,
                wo_breadcrumbs_service_1.WoBreadCrumbsService,
            ]
        })
    ], WoModule);
    return WoModule;
}());
exports.WoModule = WoModule;
//# sourceMappingURL=wo.module.js.map