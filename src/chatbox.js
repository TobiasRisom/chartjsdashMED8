// chatbox.js

function setupEventListeners() {
  const messageInput = document.getElementById("input");
  messageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  const sendButton = document.getElementById("send");
  sendButton.onclick = sendMessage;
  const menuButton = document.getElementById("pop-up-button");
  menuButton.onclick = openMenu;
};

function openMenu() {
  const menu = document.getElementById("pop-up");
  const menuButton = document.getElementById("pop-up-button");
  if (menu.classList.contains("pop-up-expanded")) {
    menu.classList.remove("pop-up-expanded");
    menuButton.classList.remove("rotate");
  } else {
    menu.classList.add("pop-up-expanded");
    menuButton.classList.add("rotate");
  }
}

async function sendMessage() {
  const messageInput = document.getElementById("input");

  const message = messageInput.value;

  if (message.trim() !== "") {
    const chatContainer = document.getElementById("chat");
    const userMessageContainer = document.createElement("div");
    userMessageContainer.classList.add("message-container");
    const chatbotMessageContainer = document.createElement("div");
    chatbotMessageContainer.classList.add("ca-message-container");

    // User message
    const userMessage = document.createElement("p");
    userMessage.classList.add("user-message");
    userMessage.textContent = message;

    const messengerID = document.createElement("p");
    messengerID.classList.add("messenger-id");
    messengerID.textContent = "User:";

    userMessageContainer.appendChild(messengerID);
    userMessageContainer.appendChild(userMessage);

    // Ship it to frontend
    chatContainer.appendChild(userMessageContainer);

    messageInput.value = "";

    // Bot message
    const botMessage = document.createElement("p");
    botMessage.classList.add("received-message");
    botMessage.textContent = "I am a bot";

    const botMessengerID = document.createElement("p");
    botMessengerID.classList.add("chatbot-id");
    botMessengerID.textContent = "Chatbot:";

    chatbotMessageContainer.appendChild(botMessengerID);
    chatbotMessageContainer.appendChild(botMessage);

    chatContainer.appendChild(chatbotMessageContainer);
    return

    const url = 'http://localhost:5005/webhooks/rest/webhook';//'https://dashboards.create.aau.dk/webhooks/rest/webhook';
    //const url = 'https://dashboards.create.aau.dk/webhooks/rest/webhook';
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
        chatContainer.appendChild(botMessage);
      })
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed, e.g., show an error message to the user
    }
    import("./viz").then(function (viz) {
      console.log("I am called")
      viz.createLineChart()
    });
  }
}

setupEventListeners();


async function getURL() {
  const url = 'https://dashboards.create.aau.dk/webhooks/rest/webhook/status';

  const response = await fetch(url);
  if (response.status === 200) {
    return "http://localhost:5005"
  } else {
    return "https://dashboards.create.aau.dk:5005"
  }
}
