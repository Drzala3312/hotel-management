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
  public sub: any;
  isCreate = true;
  public availablePermissions: any[];
  public selectedPermissions: any[] = [];
  public oldPid: any[] = [];
  public form: any = {
    rolename: null
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

    this.sub = this.route.params.subscribe(params => {
        this.id = Number(params['id']);

        if (!isNaN(this.id)) {
            this.isCreate = false
            this.rc.getroleById(this.id).subscribe((data: any) => {
                this.form = {
                    rolename: data.name,

                };
            }, (error: any) => {
                console.error(error);
            });
            this.rc.getRolePermissionByID(this.id).subscribe((data:any)=>{
                if(data.length>0){
                    for(let i = 0;i<data.length;i++){
                        this.oldPid.push({rid:data[i].rid,pid:data[i].pid});
                        this.pc.getPermissionById(data[i].pid).subscribe((per:any)=>{
                            this.selectedPermissions.push({
                                id: per.pid,
                                itemName: per.pname
                            })

                        })
                    }

                }
                console.log(data);
            })
        }
    });






  }
  onSubmit(item: any) {

    if (isNaN(this.id)){
         // request create permission
         this.rc.createrole(this.form).subscribe((data: any) => {
             console.log("roles create successfully")
            this.id = data.rid;
            for(var i =0;i< this.selectedPermissions.length;i++){
                this.rc.createRolePermission({rid:this.id,pid:this.selectedPermissions[i].id}).subscribe((p:any)=>{
                    console.log("permission map successfully");
                },(err:any)=>{
                    console.error(err);
                });
             }
            this._router.navigate(['/roles']);
        }, (error: any) => {
           console.error(error);
        });

  }else{

      this.rc.updaterole(this.id,this.form).subscribe((data:any)=>{
        for(var i =0;i<this.oldPid.length;i++){
            const p = this.oldPid[i];
            //console.log(p);
          //  console.log("old pid"+this.oldPid);
            this.rc.deleterolePermission(p.rid,p.pid);
        }
          console.log("role updated successfully");
          for(var i =0;i< this.selectedPermissions.length;i++){
            this.rc.createRolePermission({rid:this.id,pid:this.selectedPermissions[i].id}).subscribe((p:any)=>{

               if(i == this.selectedPermissions.length-1){

               }
                console.log("permission map successfully");

            },(err:any)=>{
                console.error(err);
            });
         }
         this._router.navigate(['/roles']);

      }, (error: any) => {
        console.error(error);
     })
  }
}
}
