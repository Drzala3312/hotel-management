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

    // this.dropdownSettings={
    //     singleSelection: false,
    //     idField: 'item_id',
    //     textField: 'item_text',
    //     selectAllText: 'Select All',
    //     unSelectAllText: 'UnSelect All',
    //     itemsShowLimit: 3,
    //     allowSearchFilter: true
    //   };


  }
  onSubmit(item: any) {
    console.log(this.selectedPermissions);
  }
}
