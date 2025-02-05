import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, from, Observable, tap } from 'rxjs';
import { db,Exercise } from './database.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.api-ninjas.com/v1/exercises';

  constructor(private http: HttpClient) { }

  async getFromIndexedDB(): Promise<Exercise[]>{
    return await db.exercises.where('muscle').equals('biceps').toArray();
  }

  getPosts(): Observable<Exercise[]>{
    return from(this.getFromIndexedDB()).pipe(
      tap(async (cachedData) => {
        if (cachedData.length === 0){
          const url = `${this.apiUrl}?muscle=biceps`;

          this.http.get<Exercise[]>(url).subscribe(
            async (apiData) => {
              await db.exercises.bulkAdd(apiData);
            },
            error => console.error('Error fetching from API:',error)
          );
        }
      }),
      catchError(error => {
        console.error('Error accessing IndexedDB:', error);

        const url = `${this.apiUrl}?muscle=biceps`;
        return this.http.get<Exercise[]>(url);
      })
    );
  }

}
