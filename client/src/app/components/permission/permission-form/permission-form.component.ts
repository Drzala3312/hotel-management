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
    public errorMsg = false;
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
        this.sub = this.route.params.subscribe(params => {
            this.id = Number(params['id']);

            if (!isNaN(this.id)) {
                this.isCreate = false
                this.pc.getPermissionById(this.id).subscribe((data: any) => {
                    this.form = {
                        pname: data.pname,
                        module: data.module,
                        create: data.create,
                        update: data.edit,
                        read: data.read,
                        delete: data.delete,

                    };


                }, (error: any) => {
                    console.error(error);
                });
            }
        });
    }
    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onSubmit(e: MouseEvent) {
        e.preventDefault();

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

                this._router.navigate(['/permissions']);
            }, (error: any) => {
                if(error.error.name === 'SequelizeUniqueConstraintError'){
                        this.errorMsg = true;
                }
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

                this._router.navigate(['/permissions']);
            }, (error: any) => {
                this._store.dispatch({
                    type: PermissionTypes.UPDATE_PERMISSION_FAILURE,
                    error: error.error
                });
            });
        }
    }

    createPermisionName(form) {
        var name = form.module + " (";
        if (form.create) {
            name += "C";
        }
        if (form.read) {
            name += "R";
        }
        if (form.update) {
            name += "U";
        }
        if (form.delete) {
            name += "D";
        }
        name += ')';
        return name;
    }

}
