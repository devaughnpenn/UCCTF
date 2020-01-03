import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WoModule } from '../wo-module/wo.module';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { ShareModule } from './share/share.module';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { EmailComponent } from './email/email.component';
import { DataComponent } from './data/data.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WoModule,
        AdminRoutingModule,
        ShareModule
    ],
    declarations: [
        AdminComponent,
        LoginComponent,
        HomeComponent,
        HelpComponent,
        EmailComponent,
        DataComponent

    ]
})
export class AdminModule {}
