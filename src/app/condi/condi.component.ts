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
    return this.CondiData.filter(item => item.name === name);
  }
  removeItem(index: number) {
    if (this.modalName) {
      console.log(this.modalName)
      var items = this.getItemsByNome(this.modalName);

      if (index >= 0 && index < items.length) {
        var itemToRemove = items[index];

        this.CondiData.splice(this.CondiData.indexOf(itemToRemove), 1);
        this.CondiData = [...this.CondiData];

        items.splice(items.indexOf(itemToRemove), 1);
        this.deletedItems.push(itemToRemove);
        items = [...items];

        console.log("delete", this.deletedItems);
      }
    }
  }

  carregaCondi() {
    this.condiService.getDadosDoCondi().subscribe((data: CondiItem[]) => {
      this.CondiData = data;
      console.log(this.CondiData)
      this.sumData();
      this.formatarDatas();

    });
  }
  formatarDatas() {
    for (const item of this.CondiData) {
      const date = new Date(item.date);
      item.date = this.formatarData(date);
    }
  }

  formatarData(data: Date): string {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString().slice(-2);
    return `${dia}/${mes}/${ano}`;
  }

  getDataByNome(nome: string): string {
    const item = this.CondiData.find(data => data.name === nome);
    return item ? item.date : '';
  }
  sumData() {
    const groupedData: { [key: string]: number } = {};

    this.CondiData.forEach((item: CondiItem) => {
      const name = item.name;
      const price = parseFloat(item.price); 

      if (groupedData[name]) {
        groupedData[name] += price;
      } else {
        groupedData[name] = price;
      }
    });

    this.summedData = Object.keys(groupedData).map((name: string) => ({
      name: name,
      totalPrice: groupedData[name]
    }));

  }
}
