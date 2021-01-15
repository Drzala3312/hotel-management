import { Component, OnInit} from '@angular/core';
import { RoleController } from '../../../ducks/roles/role.controller';
import { PermissionController } from '../../../ducks/permissions/permission.controller';
import _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
    public id: number;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings :IDropdownSettings;
    isNoData = false;
    public availablePermissions: any[];
    public selectedPermissions: any [];
    public form: any = {
        rolename: null,
        permission: null
    };
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
     private pc:PermissionController,
     private rc:RoleController,
  ) {

   }

  ngOnInit(): void {

    this.dropdownSettings={
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    this.pc.getPermissions().subscribe((permission) => {
        this.isNoData = permission ? (permission.length === 0 ? true : false) : false;
        if (permission.length > 0) {
            this.availablePermissions = _.map(permission, (item) => {
                return {
                    id: item.pid,
                    itemName: item.pname
                };
            });

            console.log(this.availablePermissions);
        }
    }, (error: any) => {
        console.log(error);
    })


  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onSubmit(item: any){

  }
}
