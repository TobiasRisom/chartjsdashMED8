// visualization.js

// Function to create the line chart
import Chart from "chart.js/auto";
import data from './data.json'
// visualization.js

// Function to create the line chart
function createLineChart(data) {
  // Extracting YQ and Value from the JSON data
  console.log(data)


  //const labels = data.map(entry => entry.YQ);
  //const values = data.map(entry => entry.Value);
  const labels = [];
  const values = [];

  // Iterate over the array
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    console.log(`Entry ${i + 1}:`, entry);

    if (entry && entry.YQ !== undefined && entry.Value !== undefined) {
      labels.push(entry.YQ);
      values.push(entry.Value);
    } else {
      console.error(`Invalid entry at index ${i}:`, entry);
    }
  }

  console.log('Labels:', labels);
  console.log('Values:', values);
  // Creating a line chart
  const ctx = document.getElementById('viz');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Value',
        data: values,
        borderColor: 'rgba(75, 190, 192, 1)', // You can customize the color
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear', // Assuming YQ is a numeric value, otherwise use 'category'
          position: 'bottom'
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Fetch data from data.json and create the chart
createLineChart(data)
