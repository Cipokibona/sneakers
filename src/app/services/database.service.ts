import { Injectable } from '@angular/core';
import Dexie, {Table} from 'dexie';


export interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipement: string;
  difficulty: string;
  instructions: string;
}

export class AppDB extends Dexie {
  exercises!: Table<Exercise>;

  constructor(){
    super('ExercisesDB');
    this.version(1).stores({
      exercises: '++id, name, muscle'
    });
  }
}

export const db = new AppDB();

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
}
