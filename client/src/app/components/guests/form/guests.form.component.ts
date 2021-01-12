import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import _ from 'lodash';

import { GuestsController } from '../../../ducks/guests/guests.controller';
import { types as GuestTypes } from '../../../ducks/guests/guests.types';
import { AuthService } from '../../../auth/authService';
@Component({
    selector: 'app-form-guests',
    templateUrl: './guests.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GuestsFormComponent implements OnInit, OnDestroy {
    public id: number;
    public sub: any;
    public guest$: any;
    public permission: any;

    public genders: any[] = [{
        id: 'M',
        name: 'Male'
    }, {
        id: 'F',
        name: 'Female'
    }];

    public form: any = {
        first_name: '',
        last_name: '',
        phone: '',
        mobile: '',
        city: '',
        country: '',
        email: '',
        organization: '',
        age: 30,
        gender: ''
    };

    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _guest: GuestsController,
        private _store: Store<any>,
        private authenticationService: AuthService) {
        _store.select('guests').subscribe((response) => {
            this.guest$ = response;
        });
    }


    public ngOnInit() {
        const token = this.authenticationService.decode();
        this._guest.getPermission(token.user.uid).subscribe((data: any) => {
            this.permission = data[0][0];
            this.permission.type = token.user.type;

            if(this._router.url.startsWith('/guests/edit') && this.permission.edit != 1){
                this._router.navigate(['guests']);
            }
        });

        this.sub = this.route.params.subscribe(params => {
            this.id = Number(params['id']);

            if (!isNaN(this.id)) {
                this._store.dispatch({
                    type: GuestTypes.GET_GUESTS,
                    uid: this.id
                });

                this._guest.getGuestById(this.id).subscribe((data: any) => {
                    this.form = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        phone: data.phone,
                        mobile: data.mobile,
                        city: data.city,
                        country: data.country,
                        email: data.email,
                        organization: data.organization,
                        age: data.age,
                        gender: data.gender
                    };

                    this._store.dispatch({
                        type: GuestTypes.GET_GUESTS_SUCCESS,
                        payload: data
                    });
                }, (error: any) => {
                    this._store.dispatch({
                        type: GuestTypes.GET_GUESTS_FAILURE,
                        error: error.error
                    });
                });
            }
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onSubmit(e: MouseEvent) {
        e.preventDefault();

        if (isNaN(this.id)) {
            // dispatch create
            this._store.dispatch({
                type: GuestTypes.CREATE_GUESTS
            });

            // request create guest
            this._guest.createGuest(this.form).subscribe((data: any) => {
                this._store.dispatch({
                    type: GuestTypes.CREATE_GUESTS_SUCCESS,
                    payload: data
                });

                this._router.navigate(['/guests/view', data.id]);
            }, (error: any) => {
                this._store.dispatch({
                    type: GuestTypes.CREATE_GUESTS_FAILURE,
                    error: error.error
                });
            });
        } else {
            // dispatch update
            this._store.dispatch({
                type: GuestTypes.UPDATE_GUESTS
            });

            // request create guest
            this._guest.updateGuest(this.id, this.form).subscribe((data: any) => {
                this._store.dispatch({
                    type: GuestTypes.UPDATE_GUESTS_SUCCESS,
                    payload: data
                });

                this._router.navigate(['/guests/view', data.id]);
            }, (error: any) => {
                this._store.dispatch({
                    type: GuestTypes.UPDATE_GUESTS_FAILURE,
                    error: error.error
                });
            });
        }
    }
}
