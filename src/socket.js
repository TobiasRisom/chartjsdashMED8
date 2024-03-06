/*
// socket.js

const socket = new WebSocket("ws://your-server-address");

socket.addEventListener("open", function(event) {
  console.log("Connected to WebSocket");
});

socket.addEventListener("message", function(event) {
  const messagesContainer = document.getElementById("messages");
  const message = document.createElement("div");

  // Received message styling
  message.classList.add("received-message");
  message.textContent = event.data;

  messagesContainer.appendChild(message);
});

// Function to send messages to the server
export function sendMessageToServer(message) {
  socket.send(message);
}
*/
function sendMessage() {
  const url = 'http://localhost:5005/webhooks/rest/webhook';
  const data = {
    message: 'info'
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
