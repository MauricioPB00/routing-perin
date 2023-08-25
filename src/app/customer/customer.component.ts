import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  modalVisible: boolean = false;
  name!: string;
  phone!: string;
  addres!: string;
  cpf!: string;
  rg!: string;
  obs!: string;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {

  }

  abrirModal() {
    this.modalVisible = true;
  }

  fecharModal() {
    this.modalVisible = false;
  }

  onButtonClick() {
    const dados = {
      name: this.name,
      phone: this.phone,
      addres: this.addres,
      cpf: this.cpf,
      rg: this.rg,
      obs: this.obs,
    };

    // Formate os dados como JSON
    const dadosJSON = JSON.stringify(dados);

    console.log("Dados formatados como JSON:", dadosJSON);

    this.customerService.enviarDadosClientePHP(dadosJSON).subscribe(response => {
      console.log("Resposta do servidor PHP:", response);
    });
  }
}
