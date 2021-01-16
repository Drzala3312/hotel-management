import { Component, OnInit } from '@angular/core';
import { RoleController } from '../../../ducks/roles/role.controller';
import { PermissionController } from '../../../ducks/permissions/permission.controller';
import _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
//import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  public id: number;
  dropdownList = [];
  //dropdownSettings :IDropdownSettings;
  public dropdownSettings: any = {
    singleSelection: false,
    text: 'Select Permissions',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'multiselect'
  };
  isNoData = false;
  public availablePermissions: any[];
  public selectedPermissions: any[];
  public form: any = {
    rolename: null,
    permission: null
  };
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private pc: PermissionController,
    private rc: RoleController,
  ) {
    this.pc.getPermissions().subscribe((permission) => {
      this.isNoData = permission ? (permission.length === 0 ? true : false) : false;
      if (permission.length > 0) {
        this.availablePermissions = _.map(permission, (item) => {
          return {
            id: item.pid,
            itemName: item.pname
          };
        });
      }
    }, (error: any) => {
      console.log(error);
    })

  }

  ngOnInit(): void {

  }
  onSubmit(item: any) {
      var permissionIds = [];
    console.log(this.selectedPermissions);
    for(var i =0;i< this.selectedPermissions.length;i++){
        permissionIds.push(this.selectedPermissions[i].id);
    }
    this.form.permission = permissionIds;
    if (isNaN(this.id)){
         // request create permission
         this.rc.createrole(this.form).subscribe((data: any) => {
             console.log("roles create successfully")
             for(var i =0;i< this.selectedPermissions.length;i++){
               this.rc.createRolePermission({rid:data.rid,pid:this.selectedPermissions[i].id});
            }
          //  this._router.navigate(['/roles']);
        }, (error: any) => {
           console.error(error);
        });
    }
  }
}
