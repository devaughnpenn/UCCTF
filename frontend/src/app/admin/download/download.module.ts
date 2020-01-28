import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WoModule } from '@app/wo-module/wo.module';
import { DownloadRoutingModule } from './download-routing.module';
import { DownloadComponent } from './download.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WoModule,
        DownloadRoutingModule
    ],
    declarations: [
        DownloadComponent
    ]
})
export class DownloadModule { }
