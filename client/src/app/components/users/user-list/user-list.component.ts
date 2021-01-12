import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersController } from '../../../ducks/users/users.controller'

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    displayColumns: string[] = ['detail','name', 'userName', 'role', 'email', 'action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    isNoData = false;
    constructor(
        private _users: UsersController,
    ) { }

    ngOnInit(): void {
        this.getUserList();
    }

    getUserList() {
        this._users.getUsers().subscribe((user) => {
            this.isNoData = user ? (user.length === 0 ? true : false) : false;
            if (user.length > 0) {
                this.dataSource = new MatTableDataSource(user);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        }, (error: any) => {
            console.log(error);
        })
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public deleteUser(uid) {
        var ans = confirm("Are you sure?");
        if (ans) {
            this._users.deleteUser(uid);
            location.reload();
        }
    }

}
