import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, from, Observable, tap } from 'rxjs';
import { db,Exercise } from './database.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKey = '1zMgkNFeKNUrtC+NhkEcpw==563vnlemN3cEU9Vd';
  private apiUrl = 'https://api.api-ninjas.com/v1/exercises';

  constructor(private http: HttpClient) { }

  async getFromIndexedDB(): Promise<Exercise[]>{
    return await db.exercises.where('muscle').equals('biceps').toArray();
  }

  // getPosts(): Observable<any[]>{
  //   const headers = new HttpHeaders({'X-Api-Key': this.apiKey});
  //   const url = `${this.apiUrl}?muscle=biceps`;
  //   return this.http.get<any[]>(url, { headers }).pipe();
  // };

  getPosts(): Observable<Exercise[]>{
    return from(this.getFromIndexedDB()).pipe(
      tap(async (cachedData) => {
        if (cachedData.length === 0){
          const headers = new HttpHeaders({'X-Api-Key': this.apiKey});
          const url = `${this.apiUrl}?muscle=biceps`;

          this.http.get<Exercise[]>(url, { headers }).subscribe(
            async (apiData) => {
              await db.exercises.bulkAdd(apiData);
            },
            error => console.error('Error fetching from API:',error)
          );
        }
      }),
      catchError(error => {
        console.error('Error accessing IndexedDB:', error);

        const headers = new HttpHeaders({'X-Api-Key': this.apiKey});
        const url = `${this.apiUrl}?muscle=biceps`;
        return this.http.get<Exercise[]>(url, {headers});
      })
    );
  }

}
