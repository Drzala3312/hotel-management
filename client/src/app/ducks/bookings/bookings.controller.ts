import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BookingsController {
    /**
     * [constructor description]
     * @method  constructor

     * @version [version]
     * @date    2017-10-29
     * @param   {HttpClient} public http [description]
     * @return  {[type]} [description]
     */
    constructor(public http: HttpClient) {}

    /**
     * [getBookings description]
     * @method  getBookings

     * @version [version]

     * @return  {Observable<any>} [description]
     */
    public getBookings(): Observable<any> {
        return this.http.get<any>(environment.api_url + '/booking');
    }

    /**
     * [getBookingById description]
     * @method  getBookingById
     * @param   {number} bookingId [description]
     * @return  {Observable<any>} [description]
     */
    public getBookingById(bookingId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/booking/' + bookingId);
    }

    /**
     * [createBooking description]
     * @method  createBooking
     * @param   {any} booking [description]
     * @return  {[type]} [description]
     */
    public createBooking(booking: any) {
        return this.http.post(environment.api_url + '/booking', booking);
    }

    /**
     * [updateBooking description]
     * @method  updateBooking
     * @param   {number} bookingId [description]
     * @param   {[type]} booking [description]
     * @return  {Observable<any>} [description]
     */
    public updateBooking(bookingId: number, booking): Observable<any> {
        return this.http.put<any>(environment.api_url + '/booking/' + bookingId, booking);
    }

    public deleteBooking(bookingId: number){
        return this.http.delete(environment.api_url + '/booking/' + bookingId)
        .subscribe(()=> console.log("DELETED"));
    }

    public getPermission(userId: number): Observable<any> {
        return this.http.get<any>(environment.api_url + '/bookingPermission/' + userId);
    }

    public getBookingCounts(): Observable<any> {
        return this.http.get<any>(environment.api_url + '/bookingCount');
    }
}
