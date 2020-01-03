import { NgModule, Component, OnInit } from '@angular/core';
import { MetaPageService } from '../../core/meta-page.service';
import { WoBreadCrumbsService } from '../../wo-module/wo-breadcrumbs/wo-breadcrumbs.service';


@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})


export class HomeComponent {

    constructor (
        private metaPage: MetaPageService,
        private breadcrumbs: WoBreadCrumbsService,
    ){
        this.metaPage.setTitle("Home");
        this.breadcrumbs.setLinks([
            {iconClass: 'fa fa-tachometer', route: '/admin', text: 'Home'},
            {text: 'Home'}
        ]);
    }

}