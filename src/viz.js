// visualization.js

// Function to create the line chart
import Chart from "chart.js/auto";
//import data from './data.json'
// visualization.js

// Function to create the line chart
export async function createLineChart() {
  // Extracting YQ and Value from the JSON data

  let data
  let args

  await fetchData()
    .then(fetched_data => {
      data = fetched_data.data;
      args = fetched_data.args;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });


  const labels = data.map(item => item.YQ);
  const values = data.map(item => item.Value);

  // Creating a line chart
  const ctx = document.getElementById('viz');
  let chartStatus = Chart.getChart(ctx)
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }

  new Chart(ctx, {
    type: args.visualization.type,
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
          },
          beginAtZero: true
        }
      }
    }
  });
}

async function fetchData(filename) {
  return fetch('http://localhost:4000/data-webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({}) // Empty body since no parameters are required
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response body as JSON
    })
    .then(data => {
      return data; // Return the fetched data
    })
    .catch(error => {
      console.error('There was a problem fetching JSON data:', error);
      throw error;
    });
}

// Fetch data from data.json and create the chart
createLineChart().then(r => console.log("Chart created"))
