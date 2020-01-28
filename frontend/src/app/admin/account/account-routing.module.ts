import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAdminGuard } from '@app/auth/auth-admin-guard.service';
import { AccountComponent } from './account.component';

const routes: Routes = [
    { path: '', canActivate: [AuthAdminGuard], component: AccountComponent },
    { path: ':id', canActivate: [AuthAdminGuard], component: AccountComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {}

