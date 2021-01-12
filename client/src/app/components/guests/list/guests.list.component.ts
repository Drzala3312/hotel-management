import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { GuestsController } from '../../../ducks/guests/guests.controller';
import { types } from '../../../ducks/guests/guests.types';
import { AuthService } from '../../../auth/authService'

@Component({
    selector: 'app-list-guests',
    templateUrl: './guests.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GuestsListComponent implements OnInit {
    public guests$: any;
    public permission: any;

    constructor(private _guests: GuestsController,
        private _store: Store<any>,
        private authenticationService: AuthService) {
        _store.select('guests').subscribe((response) => {
            this.guests$ = response;
        });
    }

    public ngOnInit() {
        //Get permissions
        const token = this.authenticationService.decode();
        this._guests.getPermission(token.user.uid).subscribe((data: any) => {
            this.permission = data[0][0];
            this.permission.type = token.user.type;
        });

        this._store.dispatch({
            type: types.LIST_GUESTS
        });

        this._guests.getGuests().subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_GUESTS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_GUESTS_FAILURE
            });
        });
    }

    public deleteGuest(uid) {
        var ans = confirm("Are you sure?");
        if (ans) {
            this._guests.deleteGuest(uid);
            location.reload();
        }
    }
}
