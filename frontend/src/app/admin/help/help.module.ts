import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WoModule } from '@app/wo-module/wo.module';
import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WoModule,
        HelpRoutingModule
    ],
    declarations: [
        HelpComponent
    ]
})
export class HelpModule { }
