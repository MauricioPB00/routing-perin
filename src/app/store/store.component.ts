import { Component, OnInit } from '@angular/core';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  modalVisible: boolean = false;
  storeData: any[] = [];
  totalPrice: number = 0; 
  itemQuantities: { [id: number]: number } = {}; // Mapa para rastrear a quantidade de itens por ID
  totalQuantity: number = 0; 
  nextId: number = 1;

  size!: string;
  price!: string;
  name!: string;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.carregarStore();
  }

  abrirModal() {
    this.modalVisible = true;
  }

  fecharModal() {
    this.modalVisible = false;
  }

  carregarStore() {
    this.storeService.getDadosDoStore().subscribe(data => {
      console.log(data);
      this.storeData = data;
      console.log("store:", this.storeData);

      const highestId = Math.max(...this.storeData.map(item => item.id));
      this.nextId = highestId + 1;

      this.totalPrice = this.storeData.reduce((total, item) => total + item.price, 0);

          this.calcularQuantidades();
    });
  }
  calcularQuantidades() {
    this.itemQuantities = {}; 
  
    // Calcula a quantidade de itens por ID
    for (const item of this.storeData) {
      const id = item.id;
      if (this.itemQuantities[id]) {
        this.itemQuantities[id]++;
      } else {
        this.itemQuantities[id] = 1;
      }
    }

    this.totalQuantity = Object.values(this.itemQuantities).reduce((total, quantity) => total + quantity, 0);
  }


  onOKButtonClick() {
    const dados = {
      name: this.name,
      price: this.price,
      size: this.size
    };

    // Formate os dados como JSON
    const dadosJSON = JSON.stringify(dados);

    console.log("Dados formatados como JSON:", dadosJSON);

    this.storeService.enviarDadosParaPHP(dadosJSON).subscribe(response => {
      console.log("Resposta do servidor PHP:", response);
      // Lógica adicional após receber a resposta do servidor
    });
}

}
