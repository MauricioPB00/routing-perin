import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  searchId: string = '';
  searchResults: any[] = []; // todos os ids da grid tao aqui
  totalPrice: number = 0;

  modalVisible: boolean = false;

  exibirCampoDesconto: boolean = false;
  exibirCampoCartao: boolean = false;
  exibirCampoCondi: boolean = false;

  desconto: number = 10;
  descontoFinal: number = 0;
  descontoAplicado: boolean = false;
  option: number = 0;

  numeroParcelas: string = '';
  numeroParcelass: string = '';

  today: Date = new Date();

  condiInput: string = '';


  constructor(private homeService: HomeService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.mostrarDataFormatada();
  }

  onSubmit() {
    console.log(this.numeroParcelas);
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
    this.exibirCampoDesconto = false;
    this.exibirCampoCartao = false;
  }

  toggleDesconto() {
    this.exibirCampoDesconto = !this.exibirCampoDesconto;
    if (this.exibirCampoDesconto) {
      this.exibirCampoCartao = false;
      this.exibirCampoCondi = false;
    }
  }

  toggleCartao() {
    this.exibirCampoCartao = !this.exibirCampoCartao;
    if (this.exibirCampoCartao) {
      this.exibirCampoDesconto = false;
      this.exibirCampoCondi = false;
    }
  }

  toggleCondi() {
    this.exibirCampoCondi = !this.exibirCampoCondi;
    if (this.exibirCampoCondi) {
      this.exibirCampoDesconto = false;
      this.exibirCampoCartao = false;
    }
  }

  aplicarDesconto() {
    if (!this.descontoAplicado) {
      const descontoDecimal = this.desconto / 100;
      this.totalPrice = this.totalPrice * (1 - descontoDecimal);
      this.totalPrice = parseFloat(this.totalPrice.toFixed(2));

      this.descontoAplicado = true;
    }
  }

  finalizarCompraCartao() {

    if (this.searchResults.length === 0) {
      return;
    }

    const dataFormatada = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const data = dataFormatada;
    const pricesArray = this.searchResults.map(result => result.price);
    const price = pricesArray.length > 0 ? pricesArray[0] : null; 
    const opcao = 2;

    if (data !== null && price !== null) {
      this.homeService.enviarDadosCartao(price, data, opcao, this.numeroParcelas).subscribe(
        postResponse => {
          console.log('Dados enviados com sucesso:', postResponse);
          this.executarExclusao();
        },
        postError => {
          console.error('Erro ao enviar dados:', postError);
        }
      );
    } else {
      console.error('A data ou o preço é nulo. Não é possível enviar dados.');
    }
  }

  mostrarDataFormatada() {
    const dataFormatada = this.datePipe.transform(this.today, 'dd/MM/yyyy');
    console.log('Data formatada:', dataFormatada);
  }
  excluirRegistros() {
    if (this.searchResults.length === 0) {
      return;
    }

    const dataFormatada = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const data = dataFormatada;
  
    const pricesArray = this.searchResults.map(result => result.price);
    const price = pricesArray.length > 0 ? pricesArray[0] : null; 
  
    const opcao = 1;
    const numeroParcelass: string = '0';
    if (data !== null && price !== null) {
      this.homeService.enviarDados(price, data, opcao, numeroParcelass).subscribe(
        postResponse => {
          console.log('Dados enviados com sucesso:', postResponse);
          this.executarExclusao();
        },
        postError => {
          console.error('Erro ao enviar dados:', postError);
        }
      );
    } else {
      console.error('A data ou o preço é nulo. Não é possível enviar dados.');
    }
  }


  
  executarExclusao() {
    const idsParaExcluir = this.searchResults.map(result => result.id);
    this.homeService.excluirRegistros(idsParaExcluir).subscribe(
      deleteResponse => {
        console.log('Registros excluídos com sucesso:', deleteResponse);
      },
      deleteError => {
        console.error('Erro ao excluir registros:', deleteError);
      }
    );
  }



  condi() {
    console.log(this.condiInput);
  
    if (this.searchResults.length === 0) {
      return;
    }
  
    const dataFormatada = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const data = dataFormatada;
  
    const pricesArray = this.searchResults.map(result => result.price);
    const sizesArray = this.searchResults.map(result => result.size);
    const idsArray = this.searchResults.map(result => result.id);
  
    console.log(data, pricesArray, sizesArray, idsArray);
  
    if (data !== null && pricesArray.length > 0) {
      this.homeService.enviarDadosCondi(pricesArray, data, this.condiInput, idsArray, sizesArray).subscribe(
        postResponse => {
          console.log('Dados enviados com sucesso:', postResponse);
        },
        postError => {
          console.error('Erro ao enviar dados:', postError);
        }
      );
    } else {
      console.error('A data ou o preço é nulo. Não é possível enviar dados.');
    }
  }
  

}
