import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoleController } from '../../../ducks/roles/role.controller';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
    displayColumns: string[] = ['detail', 'role', 'action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    isNoData = false;
  constructor(private rc: RoleController,) { }

  ngOnInit(): void {
    this.getRoleList();
  }
    getRoleList() {
        this.rc.getroles().subscribe((role) => {
            this.isNoData = role ? (role.length === 0 ? true : false) : false;
            if (role.length > 0) {
                this.dataSource = new MatTableDataSource(role);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        }, (error: any) => {
            console.log(error);
        })
    }

}
