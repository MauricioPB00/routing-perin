import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  modalVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  abrirModal( ) {
    console.log('1111');
    this.modalVisible = true;
  }

  fecharModal() {
    console.log('2222')
    this.modalVisible = false;
  }

  onSubmit() {
    console.log('111');
    this.abrirModal();
  }
}
