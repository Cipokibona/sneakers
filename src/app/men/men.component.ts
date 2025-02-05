import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Exercise } from '../services/database.service';

@Component({
  selector: 'app-men',
  imports: [CommonModule],
  templateUrl: './men.component.html',
  styleUrl: './men.component.scss'
})
export class MenComponent implements OnInit{

  datasSneakers: Exercise[]=[];
  error: string | null = null;
  loading: boolean = true;
  showFullInstructions: { [key: string]: boolean } = {};

  constructor(private dataService: ApiService){}

  toggleInstructions(name: string, event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page
    this.showFullInstructions[name] = !this.showFullInstructions[name];
  }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe({
      next: (data) => {
        this.datasSneakers = data;
        this.loading = false;
        this.error = null;
      },
      error: (error) => {
        this.error = 'Echec du chargement. Reessayer plus tard.';
        this.loading = false;
        console.error('API Error', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}
