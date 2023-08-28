import { Component } from '@angular/core';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchId: string = '';
  searchResults: any[] = [];
  totalPrice: number = 0;

  modalVisible: boolean = false;

  exibirCampoDesconto: boolean = false;
  exibirCampoCartao: boolean = false;
  exibirCampoCondi: boolean = false;

  desconto: number = 10;
  descontoFinal: number = 0;

  numeroParcelas: number = 1;

  constructor(private homeService: HomeService) { }

  onSubmit() {
    if (!this.searchId) {
      return;
    }
    console.log(`ID recebido do HTML: ${this.searchId}`);

    this.homeService.getDadosDoSearch(this.searchId).subscribe(data => {
      this.searchResults.push(data);
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.searchResults.reduce((total, result) => total + parseFloat(result.price), 0);
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  removeRow(id: string) {
    const index = this.searchResults.findIndex(result => result.id === id);
    if (index !== -1) {
      this.searchResults.splice(index, 1);
    }
  }

  abrirModal() {
    this.modalVisible = true;
  }

  fecharModal() {
    this.modalVisible = false;
    this.exibirCampoDesconto = false; // Certifique-se de fechar o campo de desconto ao fechar o modal
    this.exibirCampoCartao = false; // Certifique-se de fechar o campo de cartão ao fechar o modal
  }

  toggleDesconto() {
    this.exibirCampoDesconto = !this.exibirCampoDesconto;
    if (this.exibirCampoDesconto) {
      this.exibirCampoCartao = false; // Garante que apenas um campo seja exibido por vez
      this.exibirCampoCondi = false; // Garante que apenas um campo seja exibido por vez
    }
  }

  toggleCartao() {
    this.exibirCampoCartao = !this.exibirCampoCartao;
    if (this.exibirCampoCartao) {
      this.exibirCampoDesconto = false; // Garante que apenas um campo seja exibido por vez
      this.exibirCampoCondi = false; // Garante que apenas um campo seja exibido por vez
    }
  }

  toggleCondi() {
    this.exibirCampoCondi = !this.exibirCampoCondi;
    if (this.exibirCampoCondi) {
      this.exibirCampoDesconto = false; // Garante que apenas um campo seja exibido por vez
      this.exibirCampoCartao = false; // Garante que apenas um campo seja exibido por vez
    }
  }

  aplicarDesconto() {
   this.descontoFinal = this.totalPrice * ( this.desconto / 100);
   this.desconto = 0;
   this.desconto = this.totalPrice - this.descontoFinal 
   console.log(this.descontoFinal);
   console.log(this.desconto);
   return this.desconto;
  }

  finalizarCompraCartao() {
      
  }
}
