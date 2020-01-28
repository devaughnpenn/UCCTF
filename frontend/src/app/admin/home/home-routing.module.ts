import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAdminGuard } from '@app/auth/auth-admin-guard.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: '', canActivate: [AuthAdminGuard], component: HomeComponent },
    { path: ':id', canActivate: [AuthAdminGuard], component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}

