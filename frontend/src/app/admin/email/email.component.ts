import { Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoFlashService } from '@app/wo-module/wo-flash/wo-flash.service';
import { Router } from '@angular/router';
import { WoBreadCrumbsService } from '@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '@app/auth/auth.service';


@Component({
    templateUrl: 'email.component.html',
    styleUrls: ['email.component.css']
})
export class EmailComponent implements OnInit {
    constructor (
        private metaPage: MetaPageService,
        private woFlash: WoFlashService,
        private router: Router,
        private breadcrumbs: WoBreadCrumbsService,
        private auth: AuthService,

    ) {
        this.metaPage.setTitle('Send Email');

        this.breadcrumbs.setLinks([
            {iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home'},
            {text: 'Send Email'}
        ]);
    }

    ngOnInit() {
        this.router.navigate(['/admin/email']);
        this.woFlash.show();
        this.metaPage.setTitle('Email');
    }

    sendEmail(){
        window.location.href = environment.API_BASE_URL +
        '/admin/events/send-email?&access-token=' + this.auth.getToken();
    }

}
