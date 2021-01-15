import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class PermissionController {

 /**
     * [constructor description]
     * @method  constructor
     * @version [version]

     * @param   {HttpClient} publichttp [description]
     * @return  {[type]} [description]
     */
    constructor(public http: HttpClient) {}

    /**
     * [getPermissions description]
     * @method  getPermissions
     * @version [version]

     * @return  {Observable<any>} [description]
     */
    public getPermissions(): Observable<any> {
        return this.http.get<any>(environment.api_url + '/permission');
    }

    /**
     * [getPermissionById description]
     * @method  getPermissionById
     * @version [version]
     * @param   {number} permissionId [description]
     * @return  {Observable<any>} [description]
     */
    public getPermissionById(permissionId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/permission/' + permissionId);
    }

    /**
     * [createPermission description]
     * @method  createPermission
     * @version [version]
     * @param   {any} permission [description]
     * @return  {[type]} [description]
     */
    public createPermission(permission: any) {
        console.log(permission);
        return this.http.post(environment.api_url + '/permission', permission);
    }

    /**
     * [updatePermission description]
     * @method  updatePermission
     * @version [version]
     * @param   {number} permissionId [description]
     * @param   {any} permission [description]
     * @return  {Observable<any>} [description]
     */
    public updatePermission(permissionId: number, permission: any): Observable<any> {
        return this.http.put<any>(environment.api_url + '/permission/' + permissionId, permission);
    }
    public deletePermission(permissionId: number){
        return this.http.delete(environment.api_url + '/permission/' + permissionId)
        .subscribe(()=> console.log("DELETED"));
    }
}
