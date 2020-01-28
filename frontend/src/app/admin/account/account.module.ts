import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WoModule } from '@app/wo-module/wo.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WoModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountComponent
    ]
})
export class AccountModule { }
