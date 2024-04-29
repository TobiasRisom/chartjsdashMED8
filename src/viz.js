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
  data.sort((a, b) => a.Value_x - b.Value_x);

  //const labels = data.map(item => item.YQ);
  let x_values = data.map(item => item.Value_x);
  let y_values = data.map(item => item.Value_y);

  // Only bucket data if we are dealing with a comparison

  if(args.visualization.data_type === "comparison")
  {
    // Create an object to store sum and count for each unique x_value
    const sumCountMap = {};

// Iterate through the pairs and populate sumCountMap
    for (let i = 0; i < x_values.length; i++) {
      const x = x_values[i];
      const y = y_values[i];

      if (sumCountMap[x]) {
        sumCountMap[x].sum += y;
        sumCountMap[x].count++;
      } else {
        sumCountMap[x] = { sum: y, count: 1 };
      }
    }

// Replace x_values and y_values with unique x_values and their average y_values
    x_values = Object.keys(sumCountMap).map(Number);
    y_values = x_values.map(x => sumCountMap[x].sum / sumCountMap[x].count);
  }

  // Creating a line chart
  const ctx = document.getElementById('viz');
  ctx.width = ctx.clientWidth; // Set canvas width to its client width
  ctx.height = ctx.clientHeight; // Set canvas height to its client height

  const fakeSubjectData = {
    "subject_id": args.visualization.subject_id,
    "age": args.visualization.FakePatient_age,
    "nihss_score": args.visualization.FakePatient_nihss_score,
    "covid_test": args.visualization.FakePatient_covid_test,
    "door_to_imaging": args.visualization.FakePatient_door_to_imaging,
    "bleeding_source": args.visualization.FakePatient_bleeding_source,
    "risk_smoker": args.visualization.FakePatient_risk_smoker,
    "cholesterol": args.visualization.FakePatient_cholesterol
  };
  // Extracting keys and values from the data object
  const fakekeys = Object.keys(fakeSubjectData);
  const fakevalues = Object.values(fakeSubjectData);

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
            text: args.visualization['x-value']
          }
        },
        y: {
          title: {
            display: true,
            text: args.visualization['y-value']
          }
        }
      },
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
