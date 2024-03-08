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

}

/*document.addEventListener("DOMContentLoaded", function() {
  createChatbox();
});*/


async function sendMessage() {
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

    const url = 'http://dashboards.create.aau.dk:5005/webhooks/rest/webhook';
    const data = {
      message: message
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const responseDataArray = responseData.messages || []


      responseData.forEach(message => {
        console.log(message.text);
        const botMessage = document.createElement("div");
        botMessage.classList.add("received-message");
        botMessage.textContent = message.text;
        messagesContainer.appendChild(botMessage);
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed, e.g., show an error message to the user
    }
  }
}

createChatbox()

async function getURL () {
  const url = 'https://dashboards.create.aau.dk:5005/status';

  const response = await fetch(url);
  if(response.status === 200) {
    return "http://localhost:5005"
  } else {
    return "https://dashboards.create.aau.dk:5005"
  }
}
