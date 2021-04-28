import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { NgSelectConfig } from '@ng-select/ng-select';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit {
    location: any;
    routerSubscription: any;

    constructor(private router: Router , private authService: AuthService, private config: NgSelectConfig) {
        this.config.notFoundText = 'Custom not found';
        this.config.appendTo = 'body';
        // set the bindValue to global config when you use the same 
        // bindValue in most of the place. 
        // You can also override bindValue for the specified template 
        // by defining `bindValue` as property
        // Eg : <ng-select bindValue="some-new-value"></ng-select>
        this.config.bindValue = 'value';
    }

    ngOnInit(){
        this.recallJsFuntions();
        console.log(this.authService.isAthenticated())
        if ( !this.authService.isAthenticated()) {
            this.authService.loggedIn.next(true);
        }else{
            this.authService.loggedIn.next(false);
        }
    }

    recallJsFuntions() {
        this.router.events
        .subscribe((event) => {
            if ( event instanceof NavigationStart ) {
                $('.loader').fadeIn('slow');
            }
        });
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            $.getScript('../assets/js/custom.js');
            $('.loader').fadeOut('slow');
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
}