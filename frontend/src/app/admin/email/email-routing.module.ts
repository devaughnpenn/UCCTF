import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAdminGuard } from '@app/auth/auth-admin-guard.service';
import { EmailComponent } from './email.component';

const routes: Routes = [
    { path: '', canActivate: [AuthAdminGuard], component: EmailComponent },
    { path: ':id', canActivate: [AuthAdminGuard], component: EmailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmailRoutingModule {}

