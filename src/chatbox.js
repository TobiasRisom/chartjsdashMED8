// chatbox.js

function createChatbox() {
  console.log("createChatbox function called");

  const chatContainer = document.createElement("div");
  chatContainer.id = "chat-container";

  const chatbox = document.createElement("div");
  chatbox.id = "chatbox";

  const messagesContainer = document.createElement("div");
  messagesContainer.id = "messages";

  const inputContainer = document.createElement("div");
  inputContainer.id = "input-container";

  const messageInput = document.createElement("input");
  messageInput.type = "text";
  messageInput.id = "messageInput";
  messageInput.placeholder = "Type your message...";

  const sendButton = document.createElement("button");
  sendButton.textContent = "Send";
  sendButton.onclick = sendMessage;

  inputContainer.appendChild(messageInput);
  inputContainer.appendChild(sendButton);

  chatbox.appendChild(messagesContainer);
  chatbox.appendChild(inputContainer);
  chatContainer.appendChild(chatbox);

  var targetContainer = document.getElementById('main-container');
  if (targetContainer) {
    targetContainer.appendChild(chatContainer);

  } else {
    console.error("Target container not found!");
  }
  //document.body.appendChild(chatContainer);
}

/*document.addEventListener("DOMContentLoaded", function() {
  createChatbox();
});*/


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

    // Call the send function from the imported socket script
    //sendMessageToServer(message);

    messageInput.value = "";
  }
}

createChatbox()

// Import the socket script
//import { sendMessageToServer } from "./socket.js";
