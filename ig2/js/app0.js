// I. Configuración
graf = d3.select('#graf')

ancho_total = graf.style('width').slice(0, -2)
alto_total = ancho_total * 9 / 16

graf.style('width', `${ ancho_total }px`)
    .style('height', `${ alto_total }px`)

margins = { top: 30, left: 50, right: 15, bottom: 120 }

ancho = ancho_total - margins.left - margins.right
alto  = alto_total - margins.top - margins.bottom

// II. Variables globales
svg = graf.append('svg')
          .style('width', `${ ancho_total }px`)
          .style('height', `${ alto_total }px`)

g = svg.append('g')
        .attr('transform', `translate(${ margins.left }, ${ margins.top })`)
        .attr('width', ancho + 'px')
        .attr('height', alto + 'px')

y = d3.scaleLinear()
          .range([alto, 0])


x = d3.scaleBand()
      .range([0, ancho])
      //
      .paddingInner(0.3)
      .paddingOuter(0.3)

color = d3.scaleOrdinal()
           //.range(['red', 'green', 'blue', 'yellow'])
          // https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
          .range(d3.schemeDark2)


xAxisGroup = g.append('g')
             .attr('transform', `translate(0, ${ alto })`)
             // .attr('class', 'eje')
yAxisGroup = g.append('g')
            //  .attr('class', 'eje')


titulo = g.append('text')
          .attr('x', `${ancho / 2}px`)
          .attr('y', '-5px')
          .attr('text-anchor', 'middle')
          .text('Sismos mayores a 7.5 grados de 1900-2020')
          //

dataArray = []

// III. render (update o dibujo)
function render(data) {
    bars = g.selectAll('rect')
            .data(data)

    bars.enter()
      .append('rect')
        .style('width', d => `${x.bandwidth()}px`)
        .style('x', d => (x(d.lugar)) + 'px')
        .style('fill', '#ccc')
        .style('height','0px')
        .style('y', `${y(0)}px`)
        .transition()
        .duration(2000)
        .style('y',d => (y(d.magnitud)) + 'px')
        .style('height', d => (alto - y(d.magnitud)) + 'px')
        .style('fill', d => color(d.estado))
    
      yAxisCall = d3.axisLeft(y)
                  .ticks(12)
                  .tickFormat(d => `${d} ML`)
      yAxisGroup.call(yAxisCall)

      xAxisCall = d3.axisBottom(x)
      xAxisGroup.call(xAxisCall)
                  .selectAll('text')
                  .attr('x', '-8px')
                  .attr('y', '-5px')
                  .attr('text-anchor', 'end')
                  .attr('transform', 'rotate(-90)')

}

// IV. Carga de datos
d3.csv('sismos0.csv')
.then(function(data) {
  console.log(data)
  data.forEach(d => {
    d.latitud = +d.latitud
    d.longitud = +d.longitud
    d.profundidad = +d.profundidad
    d.magnitud   = +d.magnitud
    d.profundidad = +d.profundidad
    d.mes = +d.mes
    d.ano = +d.ano
    d.hora = +d.hora
    d.minuto = +d.minuto
    d.id = +d.id
    // damos formato como números a los valores del archivo CSV
    })

     // data = data.slice(0,20)

    this.dataArray = data
    maxy = d3.max(data, d => d.magnitud)
    y.domain([0, maxy])
    x.domain(data.map(d => d.lugar))
    color.domain(data.map(d => d.estado))



      // V. Despliegue
    render(dataArray)
}).catch( e =>{
    console.log('No se tuvo acceso al archivo' + e.message)
})

   
