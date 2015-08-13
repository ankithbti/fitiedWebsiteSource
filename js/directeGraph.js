

function redraw(){
  cy.destroy(); // Removes the cy element
  var newDiv = document.createElement('div');
  $(".directedGraphDisplay").append(newDiv);
  newDiv.id  = "cy";
  drawDirectedGraph();
}

var sourceNodes = [];
var epNodes = [];
var stageNodes = [];
var numOfNodes = 0;

var cy;

$(function(){ // on dom ready

  
  drawDirectedGraph();

  var bfs = cy.elements().bfs('#SampleSource', function(){}, true);

var i = 0;
var highlightNextEle = function(){
  bfs.path[i].addClass('highlighted');
  
  if( i < bfs.path.length ){
    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();



}); // on dom ready

function drawDirectedGraph(){

  xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET","books.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
if(xmlDoc == undefined ){
  alert("Error");
  return;
}


var jediElements = xmlDoc.getElementsByTagName("Source");
for (i=0;i<jediElements.length;i++)
{
  var source = jediElements[i].getAttribute('name');
  var className = xmlDoc.getElementsByTagName(source)[0].getAttribute('class');
  sourceNodes.push(className);
  ++numOfNodes;
}

jediElements = xmlDoc.getElementsByTagName("EntryPoint");
for (i=0;i<jediElements.length;i++)
{
  var source = jediElements[i].getAttribute('name');
  var className = xmlDoc.getElementsByTagName(source)[0].getAttribute('class');
  epNodes.push(className);
  ++numOfNodes;
}

jediElements = xmlDoc.getElementsByTagName("Stage");
for (i=0;i<jediElements.length;i++)
{
  var source = jediElements[i].getAttribute('name');
  var className = xmlDoc.getElementsByTagName(source)[0].getAttribute('class');
  stageNodes.push(className);
  ++numOfNodes;
}

//alert(sourceNodes + " || " + epNodes + " || " + stageNodes + " || numOfNodes : " + numOfNodes);

cy = cytoscape({
  container: document.getElementById('cy'),
  
  style: [
    {
      selector: 'node',
      css: {
        'content': 'data(id)',
      }
    },
    {
      selector: '$node > node',
      css: {
        'padding-top': '10px',
        'padding-left': '10px',
        'padding-bottom': '10px',
        'padding-right': '10px',
        'text-valign': 'top',
        'text-halign': 'center'
      }
    },
    {
      selector: 'edge',
      css: {
        'target-arrow-shape': 'triangle',
        'width': 4,
        'line-color': '#ddd',
        'target-arrow-color': '#ddd'
      }
    },
    {
      selector: ':selected',
      css: {
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black'
      }
    },
    {
      selector: '.highlighted',
      css: {
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      }
    }
  ],
  
  
  layout: {
    name: 'cose',
    padding: 50,
    directed: true,
    roots: '#SampleSource'
  }
});

// Add Nodes
for(i = 0 ; i < sourceNodes.length ; ++i){
  cy.add([

    { group: "nodes", data: { id: sourceNodes[i] }, position: { x: 600*(i+1), y: 200 } }
  
  ]);
  cy.nodes("[id=" + "'" + sourceNodes[i] + "'" + "]").style({
    'background-color': 'green',
    'width': 'auto',
    'font': 'vedana',
    'font-size': '5px'
  });
  
}

for(i = 0 ; i < epNodes.length ; ++i){
  cy.add([

    { group: "nodes", data: { id: epNodes[i] }, position: { x: 300*(i+1), y: 400 } }
  
  ]);

  cy.nodes("[id=" + "'" + epNodes[i] + "'" + "]").style({
    'background-color': 'yellow',
    'width': 'auto',
    'font': 'vedana',
    'font-size': '5px'
  });
}

for(i = 0 ; i < stageNodes.length ; ++i){
  cy.add([

    { group: "nodes", data: { id: stageNodes[i] }, position: { x: 400*(i+1), y: 600 } }
  
  ]);

  cy.nodes("[id=" + "'" + stageNodes[i] + "'" + "]").style({
    'background-color': 'gray',
    'width': 'auto',
    'font': 'vedana',
    'font-size': '5px'
  });
}


}