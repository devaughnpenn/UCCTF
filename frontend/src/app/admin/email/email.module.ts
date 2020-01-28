import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WoModule } from '@app/wo-module/wo.module';
import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WoModule,
        EmailRoutingModule
    ],
    declarations: [
        EmailComponent
    ]
})
export class EmailModule { }
