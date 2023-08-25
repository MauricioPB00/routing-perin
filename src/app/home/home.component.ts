import { Component } from '@angular/core';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchId: string = '';
  searchResults: any[] = []; // Usamos "searchResults" em vez de "searchResult"

  constructor(private homeService: HomeService) { }

  onSubmit() {
    if (!this.searchId) {
      return;
    }
    console.log(`ID recebido do HTML: ${this.searchId}`);

    this.homeService.getDadosDoSearch(this.searchId).subscribe(data => {
      this.searchResults.push(data); // Adicionamos o resultado à matriz
    });
  }
}

