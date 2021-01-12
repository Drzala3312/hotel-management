import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { GuestsController } from '../../../ducks/guests/guests.controller';
import { types } from '../../../ducks/guests/guests.types';
import { AuthService } from '../../../auth/authService';

@Component({
    selector: 'app-detail-guests',
    templateUrl: './guests.detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GuestsDetailComponent implements OnInit, OnDestroy {
    public id: number;
    public sub: any;
    public guest$: any;
    public permission: any;

    constructor(private route: ActivatedRoute,
        private _guests: GuestsController,
        private _store: Store<any>,
        private authenticationService: AuthService) {
        _store.select('guests').subscribe((response) => {
            this.guest$ = response;
        });
    }

    public ngOnInit() {

        //Get permissions
        const token = this.authenticationService.decode();
        this._guests.getPermission(token.user.uid).subscribe((data: any) => {
            this.permission = data[0][0];
            this.permission.type = token.user.type;
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = Number(params['id']);
            this._store.dispatch({
                type: types.GET_GUESTS,
                uid: this.id
            });

            this._guests.getGuestById(this.id).subscribe((data: any) => {
                this._store.dispatch({
                    type: types.GET_GUESTS_SUCCESS,
                    payload: data
                });
            }, (error: any) => {
                this._store.dispatch({
                    type: types.GET_GUESTS_FAILURE,
                    error: error.error
                });
            });
        });
    }

    /**
     * [ngOnDestroy description]
     * @method  ngOnDestroy
     * @version [version]
     * @return  {[type]} [description]
     */
    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
