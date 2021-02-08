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
    render0(dataArray)
}).catch( e =>{
    console.log('No se tuvo acceso al archivo' + e.message)
})

function selectData(elem){
	var btn=d3.select(elem).node(0)
	d3.selectAll('.descripcion1').classed('show',false)
	d3.select('.descripcion1.'+btn.dataset.ctrl).classed('show',true)

	d3.selectAll('.descripcion2').classed('show',false)
	d3.select('.descripcion2.'+btn.dataset.ctrl).classed('show',true)

	console.log(d3.select('.descripcion1.'+btn.dataset.ctrl));
	if(typeof svg == "object") svg.remove()
	switch(btn.dataset.ctrl){
		case 'index':
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
			    render0(dataArray)
			}).catch( e =>{
			    console.log('No se tuvo acceso al archivo' + e.message)
			})
		break
		case 'destructivos':
			svg = graf.append('svg')
			          .style('width', `${ ancho_total }px`)
			          .style('height', `${ alto_total }px`)

			g = svg.append('g')
			        .attr('transform', `translate(${ margins.left }, ${ margins.top })`)
			        .attr('width', ancho + 'px')
			        .attr('height', alto + 'px')

			y = d3.scaleLinear()
			          .range([alto, 0])

			// a. Para poner las barras vamos a utilizar un scaleBand()
			x = d3.scaleBand()
			      .range([0, ancho])
			      // d. Parámetros extras del escalador
			      .paddingInner(0.1)
			      .paddingOuter(0.3)
			      
			color = d3.scaleOrdinal()
			           .range(['#660000', '#990000','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CCCCCC','#CC0000'])
			          // https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
			          //.range(d3.schemeDark2)

			// i. Ejes lo primero es crear un "grupo"
			xAxisGroup = g.append('g')
			              .attr('transform', `translate(0, ${ alto })`)
			              .attr('class', 'eje')
			yAxisGroup = g.append('g')
			              .attr('class', 'eje')

			// j. Título superior de la gráfica
			titulo = g.append('text')
			          .attr('x', `${ancho / 2}px`)
			          .attr('y', '-5px')
			          .attr('text-anchor', 'middle')
			          .text('La profundidad de los sismos de mayor magnitud en México')
			          .attr('class', 'titulo-grafica')

			dataArray = []

			d3.csv('sismos3.csv')
			.then(function(data) {
			  data.forEach(d => {
			    d.profundidad = +d.profundidad
			    d.ano = +d.ano
			    d.puesto = +d.puesto
			  })

			  // e. Seleccionar los sismos mas altos
			  data = data.slice(0, 18)

			  this.dataArray = data

			  // Calcular la profundidad más alta dentro de
			  // los datos (columna "profundidad")
			  maxy = d3.max(data, d => d.profundidad)

			  // Creamos una función para calcular la altura
			  // de las barras y que quepan en nuestro canvas
			  y.domain([0, maxy])

			  // b. Poner el dominio del escalador x, convertir las fechas de los
			  //    sismos en valores de X para ubicar las barras
			  x.domain(data.map(d => d.fechamag))

			  // V. Despliegue
			  render2(dataArray)
			})
			.catch(e => {
			  console.log('No se tuvo acceso al archivo ' + e.message)
			})
		break
		case 'profundidad':
			svg = graf.append('svg')
			          .style('width', `${ ancho_total }px`)
			          .style('height', `${ alto_total }px`)

			g = svg.append('g')
			        .attr('transform', `translate(${ margins.left }, ${ margins.top })`)
			        .attr('width', ancho + 'px')
			        .attr('height', alto + 'px')

			y = d3.scaleLinear()
			          .range([alto, 0])

			// a. Para poner las barras vamos a utilizar un scaleBand()
			x = d3.scaleBand()
			      .range([0, ancho])
			      // d. Parámetros extras del escalador
			      .paddingInner(0.1)
			      .paddingOuter(0.3)
			      
			color = d3.scaleOrdinal()
			           .range(['#7FB3D5', '#5DADE2','#34495E'])
			          // https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
			          //.range(d3.schemeDark2)

			// i. Ejes lo primero es crear un "grupo"
			xAxisGroup = g.append('g')
			              .attr('transform', `translate(0, ${ alto })`)
			              .attr('class', 'eje')
			yAxisGroup = g.append('g')
			              .attr('class', 'eje')

			// j. Título superior de la gráfica
			titulo = g.append('text')
			          .attr('x', `${ancho / 2}px`)
			          .attr('y', '-5px')
			          .attr('text-anchor', 'middle')
			          .text('La profundidad de los sismos en México')
			          .attr('class', 'titulo-grafica')

			dataArray = []

			//d3.selectAll('.descripcion1.index').classed('show',false)
			// IV. Carga de datos
			d3.csv('sismos1.csv')
			.then(function(data) {
			  data.forEach(d => {
			    d.profundidad = +d.profundidad
			    d.ano = +d.ano
			    d.puesto = +d.puesto
			  })

			  // e. Seleccionar los sismos mas altos
			  data = data.slice(0, 4)

			  this.dataArray = data

			  // Calcular la profundidad más alta dentro de
			  // los datos (columna "profundidad")
			  maxy = d3.max(data, d => d.profundidad)

			  // Creamos una función para calcular la altura
			  // de las barras y que quepan en nuestro canvas
			  y.domain([0, maxy])

			  // b. Poner el dominio del escalador x, convertir las fechas de los
			  //    sismos en valores de X para ubicar las barras
			  x.domain(data.map(d => d.fechamag))

			  // V. Despliegue
			  render1(dataArray)
			})
			.catch(e => {
			  console.log('No se tuvo acceso al archivo ' + e.message)
			})
		break
		default:
		break
	}
}

// III. render (update o dibujo)
function render0(data) {
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

function render1(data) {
  // function(d, i) { return d }
  // (d, i) => d
  bars = g.selectAll('rect')
            .data(data)

  bars.enter()
      .append('rect')
        .style('width', '0px')
        .style('height', '0px')
        .style('y', `${y(0)}px`)
        .style('fill', '#000')
        .style('x', d => x(d.fechamag) + 'px')
      .transition()
      // https://bl.ocks.org/d3noob/1ea51d03775b9650e8dfd03474e202fe
      .ease(d3.easeElastic)
      .duration(1500)
        .style('y', d => (y(d.profundidad)) + 'px')
        .style('height', d => (alto - y(d.profundidad)) + 'px')
        .style('fill', d => color(d.region))
        .style('width', d => `${x.bandwidth()}px`)

      // j. call que sirve para crear los ejes
      yAxisCall = d3.axisLeft(y)
                    .ticks(3)
                    .tickFormat(d => `${d} Km.`)
      yAxisGroup.call(yAxisCall)

      xAxisCall = d3.axisBottom(x)
      xAxisGroup.call(xAxisCall)
                .selectAll('text')
                .attr('x', '-8px')
                .attr('y', '-5px')
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-90)')
}

// III. render (update o dibujo)
function render2(data) {
  // function(d, i) { return d }
  // (d, i) => d
  bars = g.selectAll('rect')
            .data(data)

  bars.enter()
      .append('rect')
        .style('width', '0px')
        .style('height', '0px')
        .style('y', `${y(0)}px`)
        .style('fill', '#000')
        .style('x', d => x(d.fechamag) + 'px')
      .transition()
      // https://bl.ocks.org/d3noob/1ea51d03775b9650e8dfd03474e202fe
      .ease(d3.easeElastic)
      .duration(1500)
        .style('y', d => (y(d.profundidad)) + 'px')
        .style('height', d => (alto - y(d.profundidad)) + 'px')
        .style('fill', d => color(d.region))
        .style('width', d => `${x.bandwidth()}px`)

      // j. call que sirve para crear los ejes
      yAxisCall = d3.axisLeft(y)
                    .ticks(3)
                    .tickFormat(d => `${d} Km.`)
      yAxisGroup.call(yAxisCall)

      xAxisCall = d3.axisBottom(x)
      xAxisGroup.call(xAxisCall)
                .selectAll('text')
                .attr('x', '-8px')
                .attr('y', '-5px')
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-90)')
}