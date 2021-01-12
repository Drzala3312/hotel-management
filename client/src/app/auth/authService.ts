import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
    private cachedRequests: Array<HttpRequest<any>> = [];

    /**
     * [collectFailedRequest description]
     * @method  collectFailedRequest

     * @version [version]

     * @param   {[type]} request [description]
     */
    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    /**
     * [retryFailedRequests description]
     * @method  retryFailedRequests

     * @version [version]

     */
    public retryFailedRequests(): void {
        // Retry the requests, this method can be called after the token is refreshed
    }

    /**
     * [setToken description]
     * @method  setToken

     * @version [version]
     * @date    2017-11-09
     * @return  {string} [description]
     */
    public setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    /**
     * [getToken description]
     * @method  getToken

     * @version [version]

     * @return  {string} [description]
     */
    public getToken(): string {
        return localStorage.getItem('token');
    }

    /**
     * [isAuthenticated description]
     * @method  isAuthenticated

     * @version [version]

     * @return  {boolean} [description]
     */
    public isAuthenticated(): boolean {
        const token = this.getToken();
        return false;
    }

    /**
     * [removeToken description]
     * @method  removeToken

     * @version [version]
     * @date    2017-11-09
     */
    public removeToken(): void {
        localStorage.clear();
    }

    public decode(): any{
        return jwt_decode(this.getToken());
    }
}
