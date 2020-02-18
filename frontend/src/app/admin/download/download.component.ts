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
    templateUrl: 'download.component.html',
    styleUrls: ['download.component.css']
})
export class DownloadComponent implements OnInit {

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
        this.metaPage.setTitle('Download Data');

        this.breadcrumbs.setLinks([
            {iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home'},
            {text: 'Download Data'}
        ]);
    }

    ngOnInit() {
        this.router.navigate(['/admin/download']);
        this.woFlash.show();
        this.metaPage.setTitle('Download');
    }

    doDownloadData() {
        window.location.href = environment.API_BASE_URL +
            //'/admin/events/download-access-pins?event_id=' + this.id +
            //'&access-token=' + this.auth.getToken();
            '/admin/events/download-all-users?&access-token=' + this.auth.getToken()
    }


}
