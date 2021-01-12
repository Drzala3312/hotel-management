import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersController {
    /**
     * [constructor description]
     * @method  constructor
     * @version [version]

     * @param   {HttpClient} publichttp [description]
     * @return  {[type]} [description]
     */
    constructor(public http: HttpClient) {}

    /**
     * [getUsers description]
     * @method  getUsers
     * @version [version]

     * @return  {Observable<any>} [description]
     */
    public getUsers(): Observable<any> {
        return this.http.get<any>(environment.api_url + '/user');
    }

    /**
     * [getUserById description]
     * @method  getUserById

     * @version [version]

     * @param   {number} userId [description]
     * @return  {Observable<any>} [description]
     */
    public getUserById(userId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/user/' + userId);
    }

    /**
     * [createUser description]
     * @method  createUser

     * @version [version]

     * @param   {any} user [description]
     * @return  {[type]} [description]
     */
    public createUser(user: any) {
        return this.http.post(environment.api_url + '/user', user);
    }

    /**
     * [updateUser description]
     * @method  updateUser

     * @version [version]

     * @param   {number} userId [description]
     * @param   {any} user [description]
     * @return  {Observable<any>} [description]
     */
    public updateUser(userId: number, user: any): Observable<any> {
        return this.http.put<any>(environment.api_url + '/user/' + userId, user);
    }
    public deleteUser(userId: number){
        return this.http.delete(environment.api_url + '/user/' + userId)
        .subscribe(()=> console.log("DELETED"));
    }
}
