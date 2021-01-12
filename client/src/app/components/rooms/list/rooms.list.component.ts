import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { RoomsController } from '../../../ducks/rooms/rooms.controller';
import { types } from '../../../ducks/rooms/rooms.types';
import { AuthService } from '../../../auth/authService';

@Component({
    selector: 'app-list-rooms',
    templateUrl: './rooms.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RoomsListComponent implements OnInit {
    public rooms$: any;
    public permission: any;

    constructor(private _rooms: RoomsController,
        private _store: Store<any>,
        private authenticationService: AuthService) {
        _store.select('rooms').subscribe((response) => {
            this.rooms$ = response;
        });
    }

    public ngOnInit() {
        //Get permissions
        const token = this.authenticationService.decode();
        this._rooms.getPermission(token.user.uid).subscribe((data: any) => {
            this.permission = data[0][0];
            this.permission.type = token.user.type;
        });

        this._store.dispatch({
            type: types.LIST_ROOMS
        });

        this._rooms.getRooms().subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_ROOMS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_ROOMS_FAILURE
            });
        });
    }
    public deleteRoom(uid) {
        var ans = confirm("Are you sure?");
        if (ans) {
            this._rooms.deleteRoom(uid);
            location.reload();
        }
    }
}
