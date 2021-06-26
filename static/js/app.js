//Define json data url
var url = `./data/samples.json`

// Initializes the page with a default plot
function init() {

    d3.json(url).then(function(data) {
        //Test json data
        console.log(data);

        // Grab values from the data json object to build the drop down
        var IDs = data.metadata.map(row => row.id);
        
        buildDropDown(IDs);

        //Load data into Demographoce info
        buildPanel(data.metadata[0]);

        var samples= data.samples
        // console.log(samples);

        buildBarPlot(samples[0]);

        buildBubblePlot(samples[0]);
    });  
}

function buildDropDown(data){
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Add DropDown options
    for (i=0;i<data.length;i++){
        dropdownMenu.append("option").text(data[i]);
    } 
}

function buildPanel(sample_metadata){
    
      var ID = sample_metadata.id;
      var Ethnicity = sample_metadata.ethnicity;
      var Gender = sample_metadata.gender;
      var Age = sample_metadata.age;
      var Location = sample_metadata.location;
      var bbtype = sample_metadata.bbtype;
      var wfreq = sample_metadata.wfreq;

      var panel_body = d3.select("#sample-metadata");
      panel_body.append("p").text(`ID : ${ID}`);
      panel_body.append("p").text(`Ethnicity : ${Ethnicity}`);
      panel_body.append("p").text(`Gender : ${Gender}`);
      panel_body.append("p").text(`Age : ${Age}`);
      panel_body.append("p").text(`Location : ${Location}`);
      panel_body.append("p").text(`bbtype : ${bbtype}`);
      panel_body.append("p").text(`wfreq : ${wfreq}`);
}

function buildBarPlot(data){  
    console.log(data.sample_values);
    // Slice the first 10 objects for plotting
    sliced_OTU_Ids_Data = data.otu_ids.slice(0,10);
    sliced_sample_values_Data = data.sample_values.slice(0,10);


    // Reverse the array to accommodate Plotly's defaults
    OTU_Ids_reversedData = sliced_OTU_Ids_Data.reverse();
    sample_values_reversedData = sliced_sample_values_Data.reverse();

    console.log(OTU_Ids_reversedData);
    console.log(sample_values_reversedData);

    // Trace for Bar Plot
    var trace1 = {
        x: sample_values_reversedData,
        y: OTU_Ids_reversedData,
        text: OTU_Ids_reversedData,
        type: "bar",
        orientation: "h"
    };

    // data
    var data = [trace1];

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", data);
}

function buildBubblePlot(data){  
    console.log(data.sample_values);
    // Slice the first 10 objects for plotting
    sliced_OTU_Ids_Data = data.otu_ids.slice(0,10);
    sliced_sample_values_Data = data.sample_values.slice(0,10);

    // Trace for Bubble Plot
    var trace1 = {
        x: sliced_OTU_Ids_Data,
        y: sliced_sample_values_Data,
        mode: 'markers',
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          opacity: [1, 0.8, 0.6, 0.4],
          size: [40, 60, 80, 100]
        }
      };
      
      var data = [trace1];
      
    //   var layout = {
    //     title: 'Marker Size and Color',
    //     showlegend: false,
    //     height: 600,
    //     width: 600
    //   };
      
      Plotly.newPlot('bubble', data);

}






// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
  
//     // Initialize x and y arrays
//     var x = [];
//     var y = [];
  
//     .
//     .
//     .
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("bar", "x", [x]);
//     Plotly.restyle("bar", "y", [y]);

//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("bubble", "x", [x]);
//     Plotly.restyle("bubble", "y", [y]);
//   }
  
  init();