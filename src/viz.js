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

  // Sorts the data if needed
  data.sort((a, b) => a.x_value - b.x_value);

  const labels = data.map(item => item.YQ);
  const x_values = data.map(item => item.x_value);
  const y_values = data.map(item => item.y_value)

  // Creating a line chart
  const ctx = document.getElementById('viz');
  ctx.width = ctx.clientWidth; // Set canvas width to its client width
  ctx.height = ctx.clientHeight; // Set canvas height to its client height

  const colorMap = {
    'red': 'rgba(255, 0, 0, 0.5)',
    'blue': 'rgba(0, 0, 255, 0.5)',
    'green': 'rgba(0, 128, 0, 0.5)'
  };

  let chartStatus = Chart.getChart(ctx)
  if (chartStatus !== undefined) {
    chartStatus.destroy();
  }
  new Chart(ctx, {
    type: args.visualization.type,
    data: {
      labels: x_values,
      datasets: [
        {
        label: args.visualization.variable,
        data: y_values,
        borderColor: colorMap[args.visualization.color],
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: colorMap[args.visualization.color],
      },
      ]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "x_value"
          }
        },
        y: {
          title: {
            display: true,
            text: "y_value"
          }
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
