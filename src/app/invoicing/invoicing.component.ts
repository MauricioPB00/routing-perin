import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { InvoicingService } from '../service/invoicing.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.css']
})
export class InvoicingComponent implements  AfterViewInit {
  @ViewChild('chart', { static: false }) private chartContainer!: ElementRef<HTMLCanvasElement>;

  constructor(private invoicingService: InvoicingService) { }

  ngAfterViewInit() {
    // Chame a função para criar o gráfico depois que a visualização do componente estiver pronta
    this.createPieChart();
  }

  private createPieChart() {
    const canvas: HTMLCanvasElement = this.chartContainer.nativeElement;
  
    this.invoicingService.getDadosDaVenda().subscribe((data: any[]) => {
      // Mapeie os dados da API para extrair os valores relevantes e faça a conversão
      const pieData = data.map(item => {
        return {
          option: parseInt(item.option), // Converte para número inteiro
          price: parseFloat(item.price) // Converte a string de preço para número de ponto flutuante
        };
      });
  
      // Verifique se há valores NaN nos dados
      const hasNaN = pieData.some(d => isNaN(d.price));
  
      if (hasNaN) {
        console.error('Dados inválidos encontrados.');
      } else {
        console.log('Dados convertidos:', pieData);
  
        // Calcule o total dos preços para todos os options
        const total = pieData.reduce((acc, curr) => acc + curr.price, 0);
  
        // Verifique as dimensões do canvas
        const width = 500; // Defina a largura desejada
        const height = 500; // Defina a altura desejada
  
        console.log('Largura do Canvas:', width);
        console.log('Altura do Canvas:', height);
  
        // Crie uma função geradora de cores para as partes do gráfico
        const color = d3.scaleOrdinal()
          .domain(pieData.map(d => d.option.toString()))
          .range(d3.schemeCategory10);
  
        // Use D3 para criar o gráfico de pizza
        const svg = d3.select(canvas)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);
  
        const pie = d3.pie<any>()
          .value(d => d.price);
  
        const arcs = pie(pieData);
  
        const arcGenerator = d3.arc<any>()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2 - 10);
      
        const arc = svg.selectAll('.arc')
        .data(arcs)
        .enter().append('g')
        .attr('class', 'arc');
      
      arc.append('path')
        .attr('d', (d: any) => arcGenerator(d) as string)
        .style('fill', (d: any) => {
          const optionString = d.data.option.toString();
          return color(optionString) as string; // Especificar o tipo de retorno como string
        });
      // Adicione rótulos com percentagens
      arc.append('text')
        .attr('transform', (d: any) => `translate(${arcGenerator.centroid(d)})`)
        .attr('dy', (d: any) => {
          const percentage = ((d.data.price / total) * 100).toFixed(1);
          return `${percentage}%`;
        })
        .text((d: any) => `${((d.data.price / total) * 100).toFixed(1)}%`);
        
      }
    });
  }



}
