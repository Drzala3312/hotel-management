import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionDetailComponent } from './permission-detail/permission-detail.component';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { PermissionListComponent } from './permission-list/permission-list.component';


export const routes: Routes = [
    {
        path: '',
    children: [{
        path: '',
        component: PermissionListComponent
    }, {
        path: 'create',
        component: PermissionFormComponent
    }, {
        path: 'edit/:id',
        component: PermissionFormComponent
    }, {
        path: 'view/:id',
        component: PermissionDetailComponent
    }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
