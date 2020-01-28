import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAdminGuard } from '@app/auth/auth-admin-guard.service';
import { DownloadComponent } from './download.component';

const routes: Routes = [
    { path: '', canActivate: [AuthAdminGuard], component: DownloadComponent },
    { path: ':id', canActivate: [AuthAdminGuard], component: DownloadComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DownloadRoutingModule {}

