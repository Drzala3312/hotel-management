import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleListComponent } from './role-list/role-list.component';



const routes: Routes = [
    {
        path: '',
    children: [{
        path: '',
        component: RoleListComponent
    }, {
        path: 'create',
        component: RoleFormComponent
    }, {
        path: 'edit/:id',
        component: RoleFormComponent
    }, {
        path: 'view/:id',
        component: RoleDetailComponent
    }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
