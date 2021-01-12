import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { RoomsController } from '../../../ducks/rooms/rooms.controller';
import { types } from '../../../ducks/rooms/rooms.types';
import { AuthService } from '../../../auth/authService';

@Component({
    selector: 'app-detail-rooms',
    templateUrl: './rooms.detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class RoomsDetailComponent implements OnInit, OnDestroy {
    public id: number;
    public sub: any;
    public room$: any;
    public permission: any;

    constructor(private route: ActivatedRoute, 
        private _rooms: RoomsController, 
        private _store: Store<any>,
        private authenticationService: AuthService) {
        _store.select('rooms').subscribe((response) => {
            this.room$ = response;
        });
    }

    public ngOnInit() {
        //Get permissions
        const token = this.authenticationService.decode();
        this._rooms.getPermission(token.user.uid).subscribe((data: any) => {
            this.permission = data[0][0];
            this.permission.type = token.user.type;
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = Number(params['id']);
            this._store.dispatch({
                type: types.GET_ROOMS,
                uid: this.id
            });

            this._rooms.getRoomById(this.id).subscribe((data: any) => {
                this._store.dispatch({
                    type: types.GET_ROOMS_SUCCESS,
                    payload: data
                });
            }, (error: any) => {
                this._store.dispatch({
                    type: types.GET_ROOMS_FAILURE,
                    error: error.error
                });
            });
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
