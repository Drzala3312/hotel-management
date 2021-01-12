import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { BookingsController } from '../../../ducks/bookings/bookings.controller';
import { types } from '../../../ducks/bookings/bookings.types';
import { AuthService } from '../../../auth/authService';

@Component({
    selector: 'app-detail-bookings',
    templateUrl: './bookings.detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BookingsDetailComponent implements OnInit, OnDestroy {
    public id: number;
    public sub: any;
    public booking$: any;
    public permission: any;

    constructor(private route: ActivatedRoute,
        private _bookings: BookingsController, 
        private _store: Store<any>,
        private authenticationService: AuthService) {
        _store.select('bookings').subscribe((response) => {
            this.booking$ = response;
        });
    }

    public ngOnInit() {


        //Get permissions
        const token = this.authenticationService.decode();
        this._bookings.getPermission(token.user.uid).subscribe((data: any) => {
            this.permission = data[0][0];
            this.permission.type = token.user.type;
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = Number(params['id']);
            this._store.dispatch({
                type: types.GET_BOOKINGS,
                uid: this.id
            });

            this._bookings.getBookingById(this.id).subscribe((data: any) => {
                this._store.dispatch({
                    type: types.GET_BOOKINGS_SUCCESS,
                    payload: data
                });
            }, (error: any) => {
                this._store.dispatch({
                    type: types.GET_BOOKINGS_FAILURE,
                    error: error.error
                });
            });
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
