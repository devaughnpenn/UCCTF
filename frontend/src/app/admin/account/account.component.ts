import { Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoFlashService } from '@app/wo-module/wo-flash/wo-flash.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css']
})
export class AccountComponent implements OnInit {
    constructor (
        private metaPage: MetaPageService,
        private woFlash: WoFlashService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.router.navigate(['/admin/account']);
        this.woFlash.show();
        this.metaPage.setTitle('Account');
    }
}
