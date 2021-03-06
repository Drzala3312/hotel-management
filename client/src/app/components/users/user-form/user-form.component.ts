import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersController } from '../../../ducks/users/users.controller';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    public id: number;
    public sub: any;
    isCreate = true;

    public genders: any[] = [{
        id: 'M',
        name: 'Male'
    }, {
        id: 'F',
        name: 'Female'
    }];
    public active: any[] = [{
        id: 1,
        name: 'Yes'
    }, {
        id: 0,
        name: 'No'
    }];

    public form: any = {
        username: '',
        type: '',
        name: '',
        lastname: '',
        phone: '',
        mobile: '',
        city: '',
        country: '',
        email: '',
        organization: '',
        age: 30,
        gender: '',
        password:'',
        active:0
    };
  constructor(
      private userController: UsersController,
      private _store: Store<any>,
      private route: ActivatedRoute,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
        this.id = Number(params['id']);

        if (!isNaN(this.id)) {
            this.isCreate = false
            this.userController.getUserById(this.id).subscribe((data: any) => {
                this.form = {
                    username: data.userName,
                    name: data.name,
                    lastname: data.lastname,
                    phone: data.phone,
                    mobile: data.mobile,
                    city: data.city,
                    country: data.country,
                    email: data.email,
                    organization: data.organization,
                    age: data.age,
                    gender: data.gender,
                    type:data.type,
                    active: data.active,
                };


            }, (error: any) => {
                console.error(error);
            });
        }
    });
  }


    public onSubmit(e: MouseEvent) {
        e.preventDefault();

        if (isNaN(this.id)) {

            // request create user
            this.userController.createUser(this.form).subscribe((data: any) => {


                this.router.navigate(['/users/view', data.id]);
            }, (error: any) => {
               console.error(error);
            });
        } else {


            // request create user
            this.userController.updateUser(this.id, this.form).subscribe((data: any) => {


                this.router.navigate(['/users/view', data.id]);
            }, (error: any) => {
                console.error(error);
            });
        }
    }

}
