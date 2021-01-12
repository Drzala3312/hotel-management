import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class RoomsController {

    constructor(public http: HttpClient) {}

    public getRooms(status: string = ''): Observable<any> {
        let params = new HttpParams();
        params = params.append('status', status);
        return this.http.get<any>(environment.api_url + '/room', {
            params: params
        });
    }

    public getRoomById(roomId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/room/' + roomId);
    }

    public createRoom(room: any) {
        return this.http.post(environment.api_url + '/room', room);
    }

    public updateRoom(roomId: number, room: any): Observable<any> {
        return this.http.put<any>(environment.api_url + '/room/' + roomId, room);
    }

    public deleteRoom(roomId: number){
        return this.http.delete(environment.api_url + '/room/' + roomId)
        .subscribe(()=> console.log("DELETED"));
    }

    public getPermission(userId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/roomPermission/' + userId);
    }
}
