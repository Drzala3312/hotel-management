import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class RoleController {

 /**
     * [constructor description]
     * @method  constructor
     * @version [version]

     * @param   {HttpClient} publichttp [description]
     * @return  {[type]} [description]
     */
    constructor(public http: HttpClient) {}

    /**
     * [getroles description]
     * @method  getroles
     * @version [version]

     * @return  {Observable<any>} [description]
     */
    public getroles(): Observable<any> {
        return this.http.get<any>(environment.api_url + '/roles');
    }

    /**
     * [getroleById description]
     * @method  getroleById
     * @version [version]
     * @param   {number} roleId [description]
     * @return  {Observable<any>} [description]
     */
    public getroleById(roleId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/roles/' + roleId);
    }

    /**
     * [createrole description]
     * @method  createrole
     * @version [version]
     * @param   {any} role [description]
     * @return  {[type]} [description]
     */
    public createrole(role: any) {
        return this.http.post(environment.api_url + '/roles', role);
    }

    createRolePermission(role: any) {
        return this.http.post(environment.api_url + '/rolePermissions', role);
    }

    // public deleterolePermission(role: any){
    //     return this.http.delete(environment.api_url + '/rolePermissions/' + role)
    //     .subscribe(()=> console.log("DELETED"));
    // }


    /**
     * [updaterole description]
     * @method  updaterole
     * @version [version]
     * @param   {number} roleId [description]
     * @param   {any} role [description]
     * @return  {Observable<any>} [description]
     */
    public updaterole(roleId: number, role: any): Observable<any> {
        return this.http.put<any>(environment.api_url + '/roles/' + roleId, role);
    }
    public deleterole(roleId: number){
        return this.http.delete(environment.api_url + '/roles/' + roleId)
        .subscribe(()=> console.log("DELETED"));
    }
}
