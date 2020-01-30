import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WoModule } from '@app/wo-module/wo.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WoModule,
        SignupRoutingModule
    ],
    declarations: [
        SignupComponent
    ]
})
export class SignupModule { }
