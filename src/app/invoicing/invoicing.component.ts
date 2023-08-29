import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { InvoicingService } from '../service/invoicing.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.css']
})
export class InvoicingComponent implements AfterViewInit {
  @ViewChild('chart', { static: false }) private chartContainer!: ElementRef<HTMLCanvasElement>;

  chartWidth = 400; // Largura da div do gráfico
  chartHeight = 600; // Altura da div do gráfico

  constructor(private invoicingService: InvoicingService) { }

  ngAfterViewInit() {
    this.createPieChart();
  }

  private createPieChart() {
    const canvas: HTMLCanvasElement = this.chartContainer.nativeElement;

    this.invoicingService.getDadosDaVenda().subscribe((data: any[]) => {
      const pieData = data.map(item => {
        return {
          option: parseInt(item.option),
          price: parseFloat(item.price)
        };
      });

      const groupedData = d3.rollup(
        pieData,
        v => ({
          option: v[0].option,
          price: d3.sum(v, d => d.price),
        }),
        d => d.option
      );

      const consolidatedData = Array.from(groupedData.values());

      const hasNaN = consolidatedData.some(d => isNaN(d.price));

      if (hasNaN) {
        console.error('Dados inválidos encontrados.');
      } else {
        console.log('Dados convertidos:', consolidatedData);

        const total = consolidatedData.reduce((acc, curr) => acc + curr.price, 0);

        const legendXOffset = -200; // Ajuste a posição horizontal da legenda
        const legendYOffset = -100; // Ajuste a posição vertical da legenda
        const svgWidth = 350; // Largura da svg, incluindo a margem esquerda
        const svgHeight = 550; // Altura da svg, ajuste conforme necessário
        const marginLeft = 300; // Margem à esquerda
        
        

        const color = d3.scaleOrdinal()
          .domain(consolidatedData.map(d => d.option.toString()))
          .range(d3.schemeCategory10);



          const svg = d3.select(canvas)
          .append('svg')
          .attr('width', svgWidth + marginLeft) // Largura da svg incluindo a margem
          .attr('height', svgHeight)
          .append('g')
          .attr('transform', `translate(${marginLeft},${svgHeight / 2})`); // Ajuste a transformação aqui
        
        

        const pie = d3.pie<any>()
          .value(d => d.price);

        const arcs = pie(consolidatedData);

        const arcGenerator = d3.arc<any>()
          .innerRadius(0)
          .outerRadius(Math.min(svgWidth, svgHeight) / 2 - 10);

        const arc = svg.selectAll('.arc')
          .data(arcs)
          .enter().append('g')
          .attr('class', 'arc');

        arc.append('path')
          .attr('d', (d: any) => arcGenerator(d) as string)
          .style('fill', (d: any) => {
            const optionString = d.data.option.toString();
            return color(optionString) as string;
          });

        arc.append('text')
          .attr('transform', (d: any) => `translate(${arcGenerator.centroid(d)})`)
          .attr('dy', (d: any) => {
            const percentage = ((d.data.price / total) * 100).toFixed(1);
            return 0;
          })
          .text((d: any) => `${((d.data.price / total) * 100).toFixed(1)}%`);

          const legend = svg
          .selectAll('.legend')
          .data(consolidatedData)
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', (d, i) => `translate(${i * 90 + legendXOffset}, ${svgHeight / 2 + 50 + legendYOffset})`);
        
        legend
          .append('rect')
          .attr('x', 90)
          .attr('width', 18)
          .attr('height', 18)
          .style('fill', (d: any) => color(d.option.toString()) as string);
        
        legend
          .append('text')
          .attr('x', 114)
          .attr('y', 9)
          .attr('dy', '.35em')
          .style('text-anchor', 'start')
          .text((d: any) => {
            const optionLabels: { [key: number]: string } = {
              1: 'Vendido',
              2: 'Cartão',
              3: 'Condi'
            };
        
            return optionLabels[d.option];
          });

      }
    });
  }



}
