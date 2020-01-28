import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WoModule } from '@app/wo-module/wo.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WoModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
