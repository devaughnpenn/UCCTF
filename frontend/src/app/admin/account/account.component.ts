import { Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoFlashService } from '@app/wo-module/wo-flash/wo-flash.service';
import { Router } from '@angular/router';
import { WoBreadCrumbsService } from '@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service';
import { AuthService } from '@app/auth/auth.service';
import { ApiAdminService } from '@app/share/api-admin.service';


@Component({
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css']
})
export class AccountComponent implements OnInit {
    public authService;
    public isOpen = false;
    public userId = 0;
    dataUser = {
        id: 0,
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        password: '',
        status: 'active',
        role: 'admin',
        created_at: '',
        username: '',
        password_repeat: '',
    };
    
    constructor (
        private metaPage: MetaPageService,
        private woFlash: WoFlashService,
        private auth: AuthService,
        private router: Router,
        private breadcrumbs: WoBreadCrumbsService,
        private api: ApiAdminService,

    ) {
        this.authService = this.auth;
        this.userId = this.auth.user['id'];

        this.metaPage.setTitle('My Account');

        this.breadcrumbs.setLinks([
            {iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home'},
            {text: 'My Account'}
        ]);
    }

    ngOnInit() {
        this.router.navigate(['/admin/account']);
        this.woFlash.show();
        this.metaPage.setTitle('Account');
    }

    loadUser(id) {
        this.dataUser.id = id;
        if (this.dataUser.id > 0) {
            this.api.send('user/profile', {id: this.dataUser.id}).then(res => {
                this.dataUser.first_name  = res['data'].first_name;
                this.dataUser.last_name   = res['data'].last_name;
                this.dataUser.middle_name = res['data'].middle_name;
                this.dataUser.email       = res['data'].email;
                this.dataUser.status      = res['data'].status;
                this.dataUser.username    = res['data'].username;
                this.dataUser.role        = res['data'].role;
                this.dataUser.created_at    = res['data'].created_at;
            });
        }
    }

}
