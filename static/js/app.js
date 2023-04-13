const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
// Fetch the JSON data and console log it

d3.json(url).then(data=> {
let names=data.names;
let dat1= [{
  x: data.samples[0].sample_values.slice(0, 10),
  y: otus(data.samples[0].otu_ids),
  type: "bar",
  text: data.samples[0].otu_labels,
  orientation: "h"}];
//call for an anitial bar chart 
barch(dat1);

let dat2 = [{
  x: data.samples[0].otu_ids,
  y: data.samples[0].sample_values,
  text: data.samples[0].otu_labels,
  mode: 'markers',
  marker: {
  color: data.samples[0].otu_ids,
  size: data.samples[0].sample_values}}];
//call for an initial bubble chart 
bubblech(dat2);
console.log(data.metadata[0]);
let dat3 = [{
  type: "indicator",
  mode: "gauge+number",
  title: {text: "Belly Button Washing Frequenchy (Scrubs per week)", font: { size: 16}},
  value: data.metadata[0].wfreq,
  gauge: {
      axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 1], color: "lightgray" },
        { range: [1, 2], color: "lightgray" },
        { range: [2, 3], color: "lightgray" },
        { range: [3, 4], color: "gray" },
        { range: [4, 5], color: "gray" },
        { range: [5, 6], color: "gray" },
        { range: [6, 7], color: "darkgray" },
        { range: [7, 8], color: "darkgray" },
        { range: [8, 9], color: "darkgray" }
      ]}}];
//call for an initial gauge chart 
gauch(dat3);

d3.select("#sample-metadata").insert("p").text("id: "+data.metadata[0].id)
     .insert("p").text("ethnicity: "+data.metadata[0].ethnicity)
     .insert("p").text("gender: "+data.metadata[0].gender)
     .insert("p").text("age: "+data.metadata[0].age)
     .insert("p").text("location: "+data.metadata[0].location)
     .insert("p").text("bbtype: "+data.metadata[0].bbtype)
     .insert("p").text("wfreq: "+data.metadata[0].wfreq);
   
for (let j = 0; j < names.length; j++) {
    d3.select('#selDataset').append('option').text(names[j]);}
//console.log(data);

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", function optionChanged(){
  d3.select("#sample-metadata").selectAll("p").remove(); 
  var curr_id = d3.select("#selDataset").property('value');
   //console.log(names.indexOf(curr_id)) 
   
  sample=data.samples[names.indexOf(curr_id)];
  meta=data.metadata[names.indexOf(curr_id)];
         
        //meta.forEach(function(value, key){
    //d3.select('#sample-metadata').append('p').text(key+value);});                           
    let dat1= [{
      x: sample.sample_values.slice(0, 10),
      y: otus(sample.otu_ids),
      type: "bar",
      text: sample.otu_labels,
      orientation: "h"   
    }];
//call for a bar chart 
barch(dat1);
    let dat2 = [{
      x: sample.otu_ids,
      y: sample.sample_values,
      text: sample.otu_labels,
      mode: 'markers',
      marker: {
      color: sample.otu_ids,
      size: sample.sample_values
        }
    }];
    
 //call for a bubble chart    
 bubblech(dat2);

 let dat3 = [{
  type: "indicator",
  mode: "gauge+number",
  title: {text: "Belly Button Washing Frequenchy (Scrubs per week)", font: { size: 16}},
  value: meta.wfreq,
  gauge: {
      axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 1], color: "lightgray" },
        { range: [1, 2], color: "lightgray" },
        { range: [2, 3], color: "lightgray" },
        { range: [3, 4], color: "gray" },
        { range: [4, 5], color: "gray" },
        { range: [5, 6], color: "gray" },
        { range: [6, 7], color: "darkgray" },
        { range: [7, 8], color: "darkgray" },
        { range: [8, 9], color: "darkgray" }
      ]}}];
//call for a gauge chart 
gauch(dat3);

    d3.select("#sample-metadata").insert("p").text("id: "+meta.id)
     .insert("p").text("ethnicity: "+meta.ethnicity)
     .insert("p").text("gender: "+meta.gender)
     .insert("p").text("age: "+meta.age)
     .insert("p").text("location: "+meta.location)
     .insert("p").text("bbtype: "+meta.bbtype)
     .insert("p").text("wfreq: "+meta.wfreq);
    });
    
    //console.log(meta)
 
// LABELS FOR BAR CHARTS   
function otus(otu_ids){
  //get labels for selected OTUs
  let otu=[];
  for (let j = 0; j < 10; j++) {
   otu.push("OTU " +otu_ids[j]+ "  ");}
return otu}   

// CONSTRUCTING A BAR CHART
function barch(data) {
   let layout = {title: "top 10 OTUs" };
 Plotly.newPlot("bar", data, layout);} 

// CONSTRUCTING A BUBBLE CHART
function bubblech(data) {
  let layout = {showlegend: false}; 
Plotly.newPlot('bubble', data, layout);}                                  


// CONSTRUCTING A GAUGE CHART
function gauch(data) {
 let layout = {margin: { t: 0, b: 0 }};
Plotly.newPlot('gauge', data, layout);}

});
