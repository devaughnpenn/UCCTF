import { Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoFlashService } from '@app/wo-module/wo-flash/wo-flash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WoBreadCrumbsService } from '@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service';
import { ApiAdminService } from '@app/share/api-admin.service';
import { environment } from '../../../environments/environment';
import { WoDialogService } from '@app/wo-module/wo-dialog/wo-dialog.service';
import { AdminAccessToTeamsComponent } from '@app/modal/admin-access-to-teams/admin-access-to-teams.component';
import { AuthService } from '@app/auth/auth.service';


@Component({
    templateUrl: 'email.component.html',
    styleUrls: ['email.component.css']
})
export class EmailComponent implements OnInit {
    isProcess = false;
    currIndex = 0;
    constructor (
        private woFlash: WoFlashService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private breadcrumbs: WoBreadCrumbsService,
        private metaPage: MetaPageService,
        private api: ApiAdminService,
        private dialog: WoDialogService,
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
        //window.location.href = environment.API_BASE_URL +
        //'/admin/events/send-email?&access-token=' + this.auth.getToken();

        this.api.send(window.location.href = environment.API_BASE_URL +
            '/admin/events/send-email?&access-token=' + this.auth.getToken());

        this.woFlash.addMessage('The operation was done!');
        this.woFlash.show('sendEmail');
        this.isProcess = false;
        this.currIndex = 0;
    }

}
