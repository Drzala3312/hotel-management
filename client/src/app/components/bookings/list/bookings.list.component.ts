import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { _runtimeChecksFactory } from '@ngrx/store/src/runtime_checks';

import { BookingsController } from '../../../ducks/bookings/bookings.controller';
import { types } from '../../../ducks/bookings/bookings.types';
import { AuthService } from '../../../auth/authService';
@Component({
    selector: 'app-list-bookings',
    templateUrl: './bookings.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BookingsListComponent implements OnInit {
    public bookings$: any;
    public permission: any;

    constructor(private _bookings: BookingsController,
        private _store: Store<any>,
        private authenticationService: AuthService) {

        _store.select('bookings').subscribe((response) => {
            this.bookings$ = response;
        });
    }

    public ngOnInit() {

        //Get permissions
        const token = this.authenticationService.decode();
        this._bookings.getPermission(token.user.uid).subscribe((data: any) => {
            const x = data[0][0];
            this.permission = x;
            this.permission.type = token.user.type;
            console.log(this.permission)
        });

        this._store.dispatch({
            type: types.LIST_BOOKINGS
        });

        this._bookings.getBookings().subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_BOOKINGS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_BOOKINGS_FAILURE,
                error: error.error
            });
        });
    }

    public deleteBooking(uid) {
        var ans = confirm("Are you sure?");
        if (ans) {
            this._bookings.deleteBooking(uid);
            location.reload();
        }
    }

}
