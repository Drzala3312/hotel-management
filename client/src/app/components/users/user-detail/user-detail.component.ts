import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../auth/authService';
import { UsersController } from '../../../ducks/users/users.controller';
import { types } from '../../../ducks/users/users.types';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    public id: number;
    public sub: any;
    public user$: any;
    public permission: any;
  constructor(
      private route: ActivatedRoute,
      private userController: UsersController,
      private _store: Store<any>,
      private authService: AuthService
    ) {
        _store.select('users').subscribe((response) => {
            this.user$ = response;
        });
     }

  ngOnInit(): void {


      this.sub = this.route.params.subscribe(params => {
          this.id = Number(params['id']);
          this._store.dispatch({
              type: types.GET_USERS,
              uid: this.id
          });

          this.userController.getUserById(this.id).subscribe((data: any) => {
              this._store.dispatch({
                  type: types.GET_USERS_SUCCESS,
                  payload: data
              });
          }, (error: any) => {
              this._store.dispatch({
                  type: types.GET_USERS_FAILURE,
                  error: error.error
              });
          });
      });
  }

}
