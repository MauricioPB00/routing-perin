import { Component, OnInit } from '@angular/core';
import { CondiService } from '../service/condi.service';

interface CondiItem {
  id: number;
  name: string;
  idStore: string;
  price: string;
  size: string;
  date: string;
}

interface SummedItem {
  name: string;
  totalPrice: number;
}

@Component({
  selector: 'app-condi',
  templateUrl: './condi.component.html',
  styleUrls: ['./condi.component.css']
})
export class CondiComponent implements OnInit {
  CondiData: CondiItem[] = [];
  summedData: SummedItem[] = [];
  modalName: string | null = null; 
  modalVisible: boolean = false; 

  deletedItems: any[] = [];

  constructor(private condiService: CondiService) { }

  ngOnInit() {
    this.carregaCondi();
  }


  openModal(name: string | null) {
    if (name !== null) {
      this.modalName = name;
      this.modalVisible = true; // Abre o modal
    } else {
      this.modalName = null; // Redefine modalName para null ao fechar o modal
      this.modalVisible = false; // Fecha o modal
    }
  }

  closeModal() {
    this.modalName = null;
    this.modalVisible = false; // Fecha o modal
  }

  getItemsByNome(name: string): CondiItem[] {
    // Filtrar os itens por nome
    return this.CondiData.filter(item => item.name === name);
  }
  removeItem(index: number) {
    if (this.modalName) {
      const items = this.getItemsByNome(this.modalName);
      if (index >= 0 && index < items.length) {
        const itemToRemove = items[index];
        
        // Remove o item da matriz CondiData
        this.CondiData.splice(this.CondiData.indexOf(itemToRemove), 1);
  
        // Adiciona o item removido à matriz deletedItems
        this.deletedItems.push(itemToRemove);
  
        // Atualize a variável CondiData para refletir a remoção
        this.CondiData = [...this.CondiData];
      }
    }
  }
  


  carregaCondi() {
    this.condiService.getDadosDoCondi().subscribe((data: CondiItem[]) => {
      this.CondiData = data;
      this.sumData();
    });
  }

  getDataByNome(nome: string): string {
    // Procure o item correspondente em CondiData e retorne a data
    const item = this.CondiData.find(data => data.name === nome);
    return item ? item.date : '';
  }

  sumData() {
    const groupedData: { [key: string]: number } = {};

    // Agrupe os objetos por 'name' e some os 'prices'
    this.CondiData.forEach((item: CondiItem) => {
      const name = item.name;
      const price = parseFloat(item.price); // Converter o preço para número

      if (groupedData[name]) {
        groupedData[name] += price;
      } else {
        groupedData[name] = price;
      }
    });

    // Converta o objeto agrupado de volta para um array
    this.summedData = Object.keys(groupedData).map((name: string) => ({
      name: name,
      totalPrice: groupedData[name]
    }));
    
  }
}
