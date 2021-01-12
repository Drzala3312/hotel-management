import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';


export const routes: Routes = [
    {
        path: '',
    children: [{
        path: '',
        component: UserListComponent
    }, {
        path: 'create',
        component: UserFormComponent
    }, {
        path: 'edit/:id',
        component: UserFormComponent
    }, {
        path: 'view/:id',
        component: UserDetailComponent
    }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
