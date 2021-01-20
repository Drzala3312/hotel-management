import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoleController } from '../../../ducks/roles/role.controller';
import { PermissionController } from '../../../ducks/permissions/permission.controller';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
    displayColumns: string[] = ['id', 'name', 'permissions','action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public selectedPermissions: any[] = [];
    isNoData = false;
  constructor(private rc: RoleController,
    private pc: PermissionController,) { }

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
                for( var i =0; i< role.length;i++){
                    this.getPermissionList(role[i].rid);
                }
            }
        }, (error: any) => {
            console.log(error);
        })
    }
    getPermissionList(rid: any) {
        this.rc.getRolePermissionByID(rid).subscribe((data:any)=>{
            if(data.length>0){
                for(let i = 0;i<data.length;i++){

                    this.pc.getPermissionById(data[i].pid).subscribe((per:any)=>{
                        this.selectedPermissions.push({
                            rid: rid,
                            id: per.pid,
                            itemName: per.pname
                        })

                    })
                }

            }
            console.log(data);
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
            for(var i = 0; i <this.selectedPermissions.length;i++){
                const rolePId = this.selectedPermissions[i];
                if(rolePId.rid == rid){
                    this.rc.deleterolePermission(rolePId.rid,rolePId.id);
                }
            }
            this.rc.deleterole(rid).subscribe((data:any)=> {
                console.log("Role DELETED")
                location.reload();
            },(err)=>{
                console.log(err)});
        }
    }

}
