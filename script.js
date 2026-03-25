import GROQ_CONFIG from './config.js';

const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_CONFIG.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: message }],
                model: GROQ_CONFIG.MODEL,
                max_tokens: GROQ_CONFIG.MAX_TOKENS,
                temperature: GROQ_CONFIG.TEMPERATURE
            })
        });

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        appendMessage('bot', aiMessage);
    } catch (error) {
        console.error("Error calling Groq API:", error);
        appendMessage('bot', "Error: Could not connect to the Neurosentix engine.");
    }
}

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', `${sender}-message`);
    msgDiv.textContent = text;
    chatDisplay.appendChild(msgDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
