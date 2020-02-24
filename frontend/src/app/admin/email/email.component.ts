import { Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoFlashService } from '@app/wo-module/wo-flash/wo-flash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WoBreadCrumbsService } from '@app/wo-module/wo-breadcrumbs/wo-breadcrumbs.service';
import { ApiAdminService } from '@app/share/api-admin.service';
import { WoDialogService } from '@app/wo-module/wo-dialog/wo-dialog.service';
import { WoDialogAlertComponent } from '@app/wo-module/wo-dialog/wo-dialog-alert/wo-dialog-alert.component';

// this module is supposed to allow admin users to select any participant that they wish to send an email 
//to and read the "subject" and "message" boxes to then send a custom email. !!!THIS DOES NOT WORK!!!!!

@Component({
    templateUrl: 'email.component.html',
    styleUrls: ['email.component.css']
})
export class EmailComponent implements OnInit {
    search = {
        page: 0,
        inpCommon: '',
        common: '',
        defSort: 'username',
        sort: 'username',
        filterQuery: ['username', 'name', 'email' ],
        condition: {status: ''}
    };

    curr_page = 0;
    last_page = 0;
    all_check = false;
    advanced_filters = false;
    loading = true;
    role = 'Public';
    users = [];
    currIndex=0;
    isProcess=false;

    private subject:string;
    private message:string;
    private username: string;

    rows = [];

    constructor (
        private metaPage: MetaPageService,
        private woFlash: WoFlashService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private api: ApiAdminService,
        private breadcrumbs: WoBreadCrumbsService,
        private dialog: WoDialogService,
        private dialogService: WoDialogService,

    ) {
        this.metaPage.setTitle('Send Email');
        this.router.navigate(['/admin/email']);
        this.woFlash.show();
        this.breadcrumbs.setLinks([
            {iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home'},
            {text: 'Send Email'}
        ]);
    }

    ngOnInit () {
        
        this.activeRoute.data.subscribe((data: any) => {

            this.activeRoute.params.subscribe(data => {
                this.search.page = data['p'];
                this.search.sort = this.search.defSort;

                if (data['sort']) {
                    this.search.sort = data['sort'];
                }

                if (data['advanced'] === 'on') {
                    this.advanced_filters = true;
                }

                for (const prop in this.search.filterQuery) {
                    if (typeof data[this.search.filterQuery[prop]] !== 'undefined' && data[this.search.filterQuery[prop]] !== '') {
                        this.search.condition[this.search.filterQuery[prop]] = data[this.search.filterQuery[prop]];
                    }
                }

                if (data['s']) {
                    this.search.inpCommon = data['s'];
                    this.search.common = data['s'];
                } else {
                    this.search.inpCommon = '';
                    this.search.common = '';
                }

                this.findBy();
            });

        });
    }

    toPage(event) {
        this.search.page = event['page'];
        this.toActualUrl();
    }

    findBy() {
        this.loading = true;
        this.search['role'] = this.role;
        this.api.send('user/find', {}, this.search).then(res => {
            this.curr_page = res['curr_page'];
            this.last_page = res['last_page'];
            this.rows      = res['rows'];
            this.all_check = false;
            this.loading   = false;
        });
    }

    toActualUrl () {
        const params = {};
        // Page
        if (this.search.page > 1) {
            params['p'] = this.search.page;
        }

        // Sort
        if (this.search.sort !== this.search.defSort) {
            params['sort'] = this.search.sort;
        }

         // Search
        if (this.search.common !== '') {
            params['s'] = this.search.common;
        }

        for (const prop in this.search.filterQuery) {
            if (
                typeof this.search.condition[this.search.filterQuery[prop]] !== 'undefined' &&
                this.search.condition[this.search.filterQuery[prop]] !== ''
            ) {
                params[this.search.filterQuery[prop]] = this.search.condition[this.search.filterQuery[prop]];
            }
        }

         // Advanced filter
        if (this.advanced_filters === true) {
            params['advanced'] = 'on';
        }
        // need to fix, causing to switch to wrong page !!!!!!!!
        this.router.navigate(['/admin/users/participants', params]);

    }

    toggleAdvancedFilter () {
        this.advanced_filters = !this.advanced_filters;
    }

    resetFilter(event: Event) {
        event.preventDefault();
        for (const prop of Object.keys(this.search.condition)) {
            this.search.condition[prop] = '';
        }
        this.search.common = '';
        this.toActualUrl();
    }

    sortBy(event) {
        this.search.sort = event.current;
        this.toActualUrl();
    }

    checkAllRows(event) {
        for (let i = this.rows.length - 1; i >= 0; i--) {
            this.rows[i].is_checked = event.target.checked;
        }
    }

    doSend() {
        //this.api.send('mail/send-mail', {}).then(res => {})
        let count = 0;
        this.woFlash.hide();
        const items = [];
        for (let i = this.rows.length - 1; i >= 0; i--) {
            if (this.rows[i].is_checked)
            {
                items.push(this.rows[i].id);
            }
        }
        if (items.length === 0) {
            setTimeout(() => {
                this.dialogService.open(WoDialogAlertComponent, {message: 'You must select user(s).', css: {top: '130px'}});
            }, 10);
        } else {
            this.currIndex = 0;
            this.isProcess = true;
            this.sendEmail();
        }
    }

    sendEmail() {
        if (this.isProcess === true) {
            if (this.currIndex < this.users.length) {
                if (this.users[this.currIndex]) {
                    if (this.users[this.currIndex].is_checked !== true) {
                        this.currIndex++;
                        this.sendEmail();
                    } else {
                        this.api.send(
                            'mail/send-mail',
                            {subject: this.subject,
                            message: this.message},
                        ).then(res => {
                            if (res['code'] === 200) {
                                this.users[this.currIndex].status = 'OK';
                                this.users[this.currIndex].is_ok = true;
                                this.users[this.currIndex].is_fail = false;
                            } else {
                                this.users[this.currIndex].status = 'ERROR';
                                this.users[this.currIndex].is_ok = false;
                                this.users[this.currIndex].is_fail = true;
                            }
                            this.currIndex++;
                            this.sendEmail();
                        }).catch(err => {
                            this.isProcess = false;
                            this.currIndex = 0;
                            this.woFlash.addError('Oops! Something went wrong!');
                            this.woFlash.show('sendEmail');
                        });
                    }
                }
            } else {
                this.woFlash.addMessage('Message Sent!');
                this.woFlash.show('sendEmail');
                this.isProcess = false;
                this.currIndex = 0;
            }
        }
    }

    doCancel(event) {
        window.history.back();
        event.preventDefault();
    }
}
