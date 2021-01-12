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
        return this.http.get<any>(environment.api_url + '/user');
    }

    /**
     * [getPermissionById description]
     * @method  getPermissionById
     * @version [version]
     * @param   {number} userId [description]
     * @return  {Observable<any>} [description]
     */
    public getPermissionById(userId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/user/' + userId);
    }

    /**
     * [createPermission description]
     * @method  createPermission
     * @version [version]
     * @param   {any} user [description]
     * @return  {[type]} [description]
     */
    public createPermission(user: any) {
        return this.http.post(environment.api_url + '/user', user);
    }

    /**
     * [updatePermission description]
     * @method  updatePermission
     * @version [version]
     * @param   {number} userId [description]
     * @param   {any} user [description]
     * @return  {Observable<any>} [description]
     */
    public updatePermission(userId: number, user: any): Observable<any> {
        return this.http.put<any>(environment.api_url + '/user/' + userId, user);
    }
    public deletePermission(userId: number){
        return this.http.delete(environment.api_url + '/user/' + userId)
        .subscribe(()=> console.log("DELETED"));
    }
}
