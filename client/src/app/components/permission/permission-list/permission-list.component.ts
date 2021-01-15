import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PermissionController } from '../../../ducks/permissions/permission.controller';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {
    displayColumns: string[] = ['name', 'module', 'create', 'read','edit','delete', 'action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    isNoData = false;
  constructor(
      private pc: PermissionController
  ) { }

  ngOnInit(): void {
    this.pc.getPermissions().subscribe((permission) => {
        this.isNoData = permission ? (permission.length === 0 ? true : false) : false;
        if (permission.length > 0) {
            this.dataSource = new MatTableDataSource(permission);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }, (error: any) => {
        console.log(error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}

public deleteUser(pid) {
    var ans = confirm("Are you sure?");
    if (ans) {
        this.pc.deletePermission(pid);
        location.reload();
    }
}

}
