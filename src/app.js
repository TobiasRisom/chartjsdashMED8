document.addEventListener("DOMContentLoaded", function() {
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

  function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;

    if (message.trim() !== "") {
      const messagesContainer = document.getElementById("messages");
      const userMessage = document.createElement("div");

      // User message styling
      userMessage.classList.add("user-message");
      userMessage.textContent = message;

      messagesContainer.appendChild(userMessage);

      socket.send(message);
      messageInput.value = "";
    }
  }

  document.getElementById("messageInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});
