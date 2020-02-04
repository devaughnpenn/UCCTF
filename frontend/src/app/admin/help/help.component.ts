import { Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoFlashService } from '@app/wo-module/wo-flash/wo-flash.service';
import { Router } from '@angular/router';
import { WoBreadCrumbsService } from '@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service';


@Component({
    templateUrl: 'help.component.html',
    styleUrls: ['help.component.css']
})
export class HelpComponent implements OnInit {
    constructor (
        private metaPage: MetaPageService,
        private woFlash: WoFlashService,
        private router: Router,
        private breadcrumbs: WoBreadCrumbsService,

    ) {
        this.metaPage.setTitle('Help');

        this.breadcrumbs.setLinks([
            {iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home'},
            {text: 'Help'}
        ]);
    }

    ngOnInit() {
        this.router.navigate(['/admin/help']);
        this.woFlash.show();
        this.metaPage.setTitle('Help');
    }
}
