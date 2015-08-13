

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
        'text-valign': 'center',
        'text-halign': 'center'
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
        'target-arrow-shape': 'triangle'
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
    }
  ],
  
  
  layout: {
    name: 'cose',
    padding: 5
  }
});

// Add Nodes
for(i = 0 ; i < sourceNodes.length ; ++i){
  cy.add([

    { group: "nodes", data: { id: sourceNodes[i] }, position: { x: 600*(i+1), y: 400 } }
  
  ]);
  cy.nodes("[id=" + "'" + sourceNodes[i] + "'" + "]").style({
    'background-color': 'green',
    'width': '70px',
    'height': '30px',
    'font': 'vedana',
    'font-size': '5px'
  });
  
}

for(i = 0 ; i < epNodes.length ; ++i){
  cy.add([

    { group: "nodes", data: { id: epNodes[i] }, position: { x: 300*(i+1), y: 600 } }
  
  ]);

  cy.nodes("[id=" + "'" + epNodes[i] + "'" + "]").style({
    'background-color': 'yellow',
    'width': '70px',
    'height': '30px',
    'font': 'vedana',
    'font-size': '5px'
  });
}

for(i = 0 ; i < stageNodes.length ; ++i){
  cy.add([

    { group: "nodes", data: { id: stageNodes[i] }, position: { x: 400*(i+1), y: 200 } }
  
  ]);

  cy.nodes("[id=" + "'" + stageNodes[i] + "'" + "]").style({
    'background-color': 'gray',
    'width': '70px',
    'height': '30px',
    'font': 'vedana',
    'font-size': '5px'
  });
}


}