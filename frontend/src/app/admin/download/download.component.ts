import { Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoFlashService } from '@app/wo-module/wo-flash/wo-flash.service';
import { Router } from '@angular/router';
import { WoBreadCrumbsService } from '@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service';

@Component({
    templateUrl: 'download.component.html',
    styleUrls: ['download.component.css']
})
export class DownloadComponent implements OnInit {
    constructor (
        private metaPage: MetaPageService,
        private woFlash: WoFlashService,
        private router: Router,
        private breadcrumbs: WoBreadCrumbsService,

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
}
