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

  constructor(private dataService: ApiService){}

  showFullInstructions: { [key: string]: boolean } = {};

  toggleInstructions(name: string, event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page
    this.showFullInstructions[name] = !this.showFullInstructions[name];
  }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe(
      data => this.datasSneakers = data,
      error => console.error("Erreur API:", error)
    );
  }

}
