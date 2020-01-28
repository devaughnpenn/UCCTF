import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAdminGuard } from '@app/auth/auth-admin-guard.service';
import { HelpComponent } from './help.component';

const routes: Routes = [
    { path: '', canActivate: [AuthAdminGuard], component: HelpComponent },
    { path: ':id', canActivate: [AuthAdminGuard], component: HelpComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HelpRoutingModule {}

