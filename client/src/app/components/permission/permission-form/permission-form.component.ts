import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PermissionController } from '../../../ducks/permissions/permission.controller';
import { types as PermissionTypes } from '../../../ducks/permissions/permission.types';

@Component({
    selector: 'app-permission-form',
    templateUrl: './permission-form.component.html',
    styleUrls: ['./permission-form.component.css']
})
export class PermissionFormComponent implements OnInit {
    displayColumns: string[] = ['detail', 'name', 'module', 'create', 'read', 'update', 'delete', 'action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    isNoData = false;
    public id: number;
    public sub: any;
    isCreate = true;
    public permission$: any;
    public form: any = {
        pname: '',
        module: '',
        create: false,
        update: false,
        read: false,
        delete: false,
    };
    modules: any[] = [{
        id: 'booking',
        name: 'Bookings'
    },
    {
        id: 'room',
        name: 'Rooms'
    },
    {
        id: 'guest',
        name: 'Guests'
    },
    {
        id: 'role',
        name: 'Roles'
    },
    {
        id: 'user',
        name: 'Users'
    },
    {
        id: 'permission',
        name: 'Permissions'
    },

    ];
    constructor(
        private pc: PermissionController,
        private route: ActivatedRoute,
        private _router: Router,
        private _store: Store<any>,
    ) {
        _store.select('permission').subscribe((response) => {
            this.permission$ = response;
        });
    }

    ngOnInit(): void {
    }
    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onSubmit(e: MouseEvent) {
        e.preventDefault();
        console.log(this.form);
        this.form.pname = this.createPermisionName(this.form);
        if (isNaN(this.id)) {
            // dispatch create
            this._store.dispatch({
                type: PermissionTypes.CREATE_PERMISSION
            });

            // request create permission
            this.pc.createPermission(this.form).subscribe((data: any) => {
                this._store.dispatch({
                    type: PermissionTypes.CREATE_PERMISSION_SUCCESS,
                    payload: data
                });

                this._router.navigate(['/permission/view', data.id]);
            }, (error: any) => {
                this._store.dispatch({
                    type: PermissionTypes.CREATE_PERMISSION_FAILURE,
                    error: error.error
                });
            });
        } else {
            // dispatch update
            this._store.dispatch({
                type: PermissionTypes.UPDATE_PERMISSION
            });

            // request create permission
            this.pc.updatePermission(this.id, this.form).subscribe((data: any) => {
                this._store.dispatch({
                    type: PermissionTypes.UPDATE_PERMISSION_SUCCESS,
                    payload: data
                });

                this._router.navigate(['/permission/view', data.id]);
            }, (error: any) => {
                this._store.dispatch({
                    type: PermissionTypes.UPDATE_PERMISSION_FAILURE,
                    error: error.error
                });
            });
        }
    }

    createPermisionName(form){
        var name = form.module+" (";
        if(form.create){
            name+= "C";
        }
        if(form.read){
            name+= "R";
        }
        if(form.update){
            name+= "U";
        }
        if(form.delete){
            name+= "D";
        }
        name+=')';
        return name;
    }

}
