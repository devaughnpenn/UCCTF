import { Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoFlashService } from '@app/wo-module/wo-flash/wo-flash.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'help.component.html',
    styleUrls: ['help.component.css']
})
export class HelpComponent implements OnInit {
    constructor (
        private metaPage: MetaPageService,
        private woFlash: WoFlashService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.router.navigate(['/admin/help']);
        this.woFlash.show();
        this.metaPage.setTitle('Help');
    }
}
