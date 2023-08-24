import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('inputField') inputField: ElementRef; // Decorador ViewChild para acessar o elemento de entrada

  onSubmit() {
    const inputValue = this.inputField.nativeElement.value; // Obtém o valor do campo de entrada
    console.log("Valor do campo de entrada:", inputValue); // Registra o valor no console
  }
}
