import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { RoleRoutingModule } from './role-routing.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { RoleDetailComponent } from '../roles/role-detail/role-detail.component';
import { RoleFormComponent } from '../roles/role-form/role-form.component';
import { RoleListComponent } from '../roles/role-list/role-list.component';


@NgModule({
  declarations: [RoleDetailComponent, RoleFormComponent, RoleListComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    AngularMultiSelectModule,
  ]
})
export class RoleModule { }
