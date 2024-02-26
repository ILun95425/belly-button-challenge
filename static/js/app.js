const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
mydata = d3.json(url).then(response => console.log(response))


// dropdown menue

function initializeDashboard() {
    data = d3.json(url).then(response =>{
        let names= response.names;
        
let selector = d3.select("#selDataset");
for(let i=0; i <= names.length ; i++){
    selector.append("option").text(names[i]).property("values", names[i])
}
let sampleName0= names[0];

drawBarChart(sampleName0)
drawBubbleChart(sampleName0)
drawDemographicInfo(sampleName0)
});
}



// horizontal bar chart

function drawBarChart(SampleName){
    data = d3.json(url).then(response =>{
        
        let samplesList = response.samples;
        let dataset= samplesList.filter( sample => sample.id == SampleName)[0];
        
        console.log(dataset.samples)
    let trace1 = {
        x: dataset.sample_values.slice(0,10).reverse(),
        y: dataset.otu_ids.map( record => `OTU ${record}`).slice(0,10).reverse(),
        text: dataset.otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
    
        
};
Plotly.newPlot("bar",[trace1])
})
}


// bubble chart

function drawBubbleChart(SampleName){
     data = d3.json(url).then(response => {
let bubbleList = response.samples;
let dataset = bubbleList.filter(sample => sample.id == SampleName)[0];
let trace2 ={
    x: dataset.otu_ids,
    y: dataset.sample_values,
    text: dataset.otu_labels,
    type: 'scatter',
    mode: 'markers',
    marker: {
        size: dataset.sample_values,
        colour: dataset.otu_ids,
        colourscale: 'Bluered'
    }
};
layout ={ xaxis: {
    title: 'OTU ID'}};

Plotly.newPlot("bubble",[trace2],layout)
})
}


//demographic display

function drawDemographicInfo(SampleName){
    data = d3.json(url).then(response =>{
    let demoList = response.metadata;
    let dataset = demoList.filter(sample => sample.id == SampleName)[0];
    let demoDiv = d3.select("#sample-metadata");
    demoDiv.html("")
    console.log(dataset)
    for (let i in dataset ) {
        
        demoDiv.append("p").text(`${i} : ${dataset[i]}`)  
    }
})
}

initializeDashboard()
function optionChanged(sampleID){
    console.log(sampleID);
    drawBarChart(sampleID);
    drawBubbleChart(sampleID);
    drawDemographicInfo(sampleID)
}