let messages = []
const localName = localStorage.getItem("name")
if (localName) {
    document.getElementById("your_name").value = localName
}

const sendMessage = () => {
    const name = document.getElementById("your_name").value || ""
    localStorage.setItem("name", name)
    const message = document.getElementById("typing").innerText || ""
    fetch("", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ name, message })
    })
        .then((response) => {
            response.json().then((j) => {
                addMessage(j)
                document.getElementById("typing").innerText = ""
            })
        });
}

const addMessage = ({ name, message, time }) => {
    messages.push({ name, message, time })
    const messagesContainer = document.getElementById("message_container")
    const messageDiv = document.createElement("div")
    messageDiv.classList.add("message")
    const toAdd = [time, name, message]
    toAdd.forEach(e => {
        const paragraph = document.createElement("p")
        paragraph.innerHTML = e
        messageDiv.appendChild(paragraph)
    });
    messagesContainer.appendChild(messageDiv)
    window.scrollTo(0, document.body.scrollHeight), 100
}

const checkForMessages = async () => {
    const thisPage = window.location.pathname.split("/").pop()
    const request = await fetch(`/data/${thisPage}.json`)
    const recentMessages = await request.json()
    if (messages.length !== recentMessages.length) {
        console.log(messages.length, recentMessages.length)
        const diff = recentMessages.length - messages.length
        const toAdd = []
        for (i=0; i<diff; i++) {
            toAdd.push(recentMessages.pop())
        }
        toAdd.reverse().forEach(e=>{
            addMessage(e)
        })
    }
}

document.getElementById("send").addEventListener("click", sendMessage)
checkForMessages()
setInterval(() => {
    checkForMessages()
}, 2000);