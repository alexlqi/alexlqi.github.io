// cargamos los datos de PIB estatales por año
var graf,ancho_total,alto_total,margins,ancho,alto,svg,g,y,x,color,xAxisGroup,yAxisGroup,titulo
metricaSelect = d3.select('#metrica')
metrica2 = metricaSelect.node().value
Anio=2003
anioTI=0
transitionTime=1000
changeYearTime=2000

d3.csv('tarea2_1.csv')
.then(function(data) {
  // limpiamos los datos
  data.forEach(d => {
    d.PIB = +d.PIB
    d.PIBperCapita = +d.PIBperCapita
    d.Poblacion = +d.Poblacion
    d.PIB = +d.PIB
    d.Anio = +d.Anio
  })
  
  dataArray = data

  color.domain(data.map(d => d.Estado))
  
  frame2(2003);

  // V. Despliegue
  //frame()
})

function getTitulo(){
  str=''
  switch(metricaSelect.node().value){
    case 'PIB':
      str='PIB Estatal Anual ('
    break
    case 'PIBperCapita':
      str='PIB per Cápita Estatal Anual ('
    break
    case 'Poblacion':
      str='Población Estatal Anual ('
    break
  }

  return str;
}

function start(){
  metrica2 = metricaSelect.node().value
  Anio++
  frame2(Anio)
  anioTI=setInterval(function(){
    frame2(Anio);
    Anio++
    if(Anio==2019) clearInterval(anioTI)
  },changeYearTime);
}

function stop(){
  clearInterval(anioTI)
}

function reset(){
  Anio=2003
  metrica2 = metricaSelect.node().value
  frame2(Anio);
}

function frame2(Anio){
  dataframe = dataArray
  dataframe = d3.filter(dataArray, d => d.Anio == Anio)

  titulo.text(getTitulo() + Anio + ')')

  dataframe.sort((a, b) => {
    return d3.descending(a[metrica2], b[metrica2])
  })

  // Calcular la altura más alta dentro de
  // los datos (columna "oficial")
  maxy = d3.max(dataframe, d => d[metrica2])
  // Creamos una función para calcular la altura
  // de las barras y que quepan en nuestro canvas
  y.domain([0, maxy])
  x.domain(dataframe.map(d => d.Estado))

  render2(dataframe)
}

function render2(data) {
  // function(d, i) { return d }
  // (d, i) => d
  bars = g.selectAll('rect')
            .data(data, d => d.Estado)

  bars.enter()
      .append('rect')
        .style('width', '0px')
        .style('height', '0px')
        .style('y', `${y(0)}px`)
        .style('fill', '#000')
        .style('x', d => x(d.Estado) + 'px')
      .merge(bars)
        .transition()
        // https://bl.ocks.org/d3noob/1ea51d03775b9650e8dfd03474e202fe
        // .ease(d3.easeElastic)
        .duration(2000)
          .style('x', d => x(d.Estado) + 'px')
          .style('y', d => (y(d[metrica2])) + 'px')
          .style('height', d => (alto - y(d[metrica2])) + 'px')
          .style('fill', d => color(d.Estado))
          .style('width', d => `${x.bandwidth()}px`)

  bars.exit()
      .transition()
      .duration(2000)
        .style('height', '0px')
        .style('y', d => `${y(0)}px`)
        .style('fill', '#000000')
      .remove()


  yAxisCall = d3.axisLeft(y)
                .ticks(3)
                .tickFormat((d) => {
                  switch(metricaSelect.node().value){
                    case 'PIB':
                      str='$' + d/1000000 + 'mdp'
                    break
                    case 'PIBperCapita':
                      str='$' + d
                    break
                    case 'Poblacion':
                      str= d
                    break
                  }
                  return str 
                })
  yAxisGroup.transition()
            .duration(2000)
            .call(yAxisCall)

  xAxisCall = d3.axisBottom(x)
  xAxisGroup.transition()
            .duration(2000)
            .call(xAxisCall)
            .selectAll('text')
            .attr('x', '-8px')
            .attr('y', '-5px')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-70)')
}

// I. Configuración
config()

dataArray = []

// (1) Variables globales para determinar que mostrar y
//     poder obtener los datos del select
region = 'todas'
regionSelect = d3.select('#region')

metrica = 'oficial'
metricaSelect = d3.select('#metrica')

ascendente = false

// III. render (update o dibujo)

// IV. Carga de datos
regionSelect.on('change', () => {
  region = regionSelect.node().value
  reset()
})

metricaSelect.on('change', () => {
  metrica = metricaSelect.node().value
  reset()
})

function cambiaOrden() {
  ascendente = !ascendente
  reset()
}

window.addEventListener('resize', ()=>{
  config()
  frame2(Anio)
});

function config(){
  var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
  graf = d3.select('#graf')
  contenedor = d3.select('#contenedor')

  ancho_total = contenedor.style('width').slice(0, -2) - contenedor.style('padding-left').slice(0, -2)*2
  alto_total = ancho_total * 9 / 16


  graf.style('width', `${ ancho_total }px`)
      .style('height', `${ alto_total }px`)

  switch(orientation){
    case 'landscape-primary':
    case 'landscape-secondary':
      margins = { top: 30, left: 60, right: 15, bottom: 130 }
      fontSize = '1.5em'
    break
    case 'portrait-secondary':
    case 'portrait-primary':
      margins = { top: 30, left: 60, right: 15, bottom: 130 }
      fontSize = '1.1em'
    break
    case 'undefined':
    default:
      margins = { top: 30, left: 50, right: 15, bottom: 130 }
      fontSize = '1em'
    break
  }

  ancho = ancho_total - margins.left - margins.right
  alto  = alto_total - margins.top - margins.bottom

  // II. Variables globales
  if(typeof svg == "object") svg.remove()

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
        .paddingInner(0.1)
        .paddingOuter(0.3)

  color = d3.scaleOrdinal()
            // .range(['red', 'green', 'blue', 'yellow'])
            // https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
            .range(d3.schemeDark2)

  xAxisGroup = g.append('g')
                .attr('transform', `translate(0, ${ alto })`)
                .attr('class', 'eje')
  yAxisGroup = g.append('g')
                .attr('class', 'eje')

  titulo = g.append('text')
            //.attr('x', `${ancho / 8}px`)
            .attr('x', `0px`)
            .attr('y', '0')
            .attr('text-anchor', 'right')
            .text('PIB estatal anual')
            .attr('class', 'titulo-grafica')
            .style('font-size',fontSize)
}