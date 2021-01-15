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
    displayColumns: string[] = ['detail', 'name', 'action'];
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public deleteRole(rid) {
        var ans = confirm("Are you sure?");
        if (ans) {
            this.rc.deleterole(rid);
            location.reload();
        }
    }

}
