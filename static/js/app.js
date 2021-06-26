//Define json data url
var url = `./data/samples.json`

// Initializes the page with a default plot
function init() {

    d3.json(url).then(function(data) {
        //Test json data
        console.log(data);

        // Grab values from the data json object to build the drop down
        names = data.names;
        console.log(names);
                
        buildDropDown(names);

        //Load data into Demographoce info
        buildPanel(data.metadata[0]);

        //Plot unsing initial dataset (name & ID: 940 with index of 0)
        buildBarPlot(data.samples[0]);

        buildBubblePlot(data.samples[0]);
    });  
}

// Build the dropdown menu
function buildDropDown(data){
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Add DropDown options
    for (i=0;i<data.length;i++){
        dropdownMenu.append("option").text(data[i]).property("value", i);
    } 
}

// Build the Demographoce info section of the page
function buildPanel(sample_metadata){
    // Grab values(required sample info) from the sample_metadata object to build the panel
      var ID = sample_metadata.id;
      var Ethnicity = sample_metadata.ethnicity;
      var Gender = sample_metadata.gender;
      var Age = sample_metadata.age;
      var Location = sample_metadata.location;
      var bbtype = sample_metadata.bbtype;
      var wfreq = sample_metadata.wfreq;

    // Use D3 to select the sample_metadata panel
      var panel_body = d3.select("#sample-metadata"); 

    // Remove previous content if exist
      panel_body.html("");

    // Add values to the sample_metadata panel
      panel_body.append("p").text(`ID : ${ID}`);
      panel_body.append("p").text(`Ethnicity : ${Ethnicity}`);
      panel_body.append("p").text(`Gender : ${Gender}`);
      panel_body.append("p").text(`Age : ${Age}`);
      panel_body.append("p").text(`Location : ${Location}`);
      panel_body.append("p").text(`bbtype : ${bbtype}`);
      panel_body.append("p").text(`wfreq : ${wfreq}`);
}

// Plot the bar chart
function buildBarPlot(data){  
    console.log(data.sample_values);
    // Slice the first 10 samples for plotting
    sliced_OTU_Ids_Data = data.otu_ids.slice(0,10);
    sliced_sample_values_Data = data.sample_values.slice(0,10);
    sliced_labels = data.otu_labels.slice(0,10);


    // Reverse the array to accommodate Plotly's defaults
    OTU_Ids_reversedData = sliced_OTU_Ids_Data.reverse();
    sample_values_reversedData = sliced_sample_values_Data.reverse();
    labels_reversedData = sliced_labels.reverse();

    plot_otu_ids = OTU_Ids_reversedData.map(i =>"OTU "+ i);

    console.log(plot_otu_ids);
    console.log(sample_values_reversedData);
    console.log(labels_reversedData);

    // Trace for Bar Plot
    var trace1 = {
        x: sample_values_reversedData,
        y: plot_otu_ids,
        text: labels_reversedData,
        marker: {
            color: '#1179b0'},
        type: "bar",
        orientation: "h"
    };

    // data
    var data = [trace1];

    // create layout variable to set plots layout
    var layout = {
        title: "Top 10 OTUs"
    }

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", data,layout);
}

// Plt the bubble chart
function buildBubblePlot(data){  
    console.log(data.sample_values);

    // Trace for Bubble Plot
    var trace1 = {
        x: data.otu_ids,
        y: data.sample_values,
        mode: 'markers',
        marker: {
          color: data.otu_ids,
          size: data.sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        xaxis: {title: "OTU ID"}
      };
      
      Plotly.newPlot('bubble', data,layout);

}






// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    
    console.log(dataset);

    d3.json(url).then(function(data) {

        buildPanel(data.metadata[dataset]);

        buildBarPlot(data.samples[dataset]);

        buildBubblePlot(data.samples[dataset]);

    });
  }
  
  init();