// visualization.js

// Function to create the line chart
import Chart from "chart.js/auto";
//import data from './data.json'
// visualization.js

// Function to create the line chart
export async function createLineChart() {
  // Extracting YQ and Value from the JSON data
  let data = await fetchData()

  console.log(data)

  const labels = data.map(item => item.YQ);
  const values = data.map(item => item.Value);

  console.log('Labels:', labels);
  console.log('Values:', values);
  // Creating a line chart
  const ctx = document.getElementById('viz');
  let chartStatus = Chart.getChart(ctx)
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Timeline Chart',
        data: values,
        borderColor: '#ff4081',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: '#ff4081',
      }]
    },
    options: {
      scales: {
        x: {
          type: 'category', // Use category scale for YQ values
          position: 'bottom',
          title: {
            display: true,
            text: 'YQ'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Value'
          }
        }
      }
    }
  });
}

async function fetchData() {
  const response = await import('/data/data');
  return await response;
}

// Fetch data from data.json and create the chart
createLineChart().then(r => console.log("done"))
