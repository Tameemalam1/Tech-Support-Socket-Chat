const socket = io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// var audio = new Audio('ping-43537.mp3');

// const corsOptions = {
//     origin: 'http://localhost:8000', // Replace with the domain you want to allow
//     optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
//   };
  
// app.use(cors(corsOptions));
  
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // if(position == 'left'){
    //     audio.play();
    // }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault
    const message = messageInput.value;
    append(`You: ${message}` , 'right');
    socket.emit('send', message);
    messageInput.value = ''
});

const name = prompt("Enter your name to join");
socket.emit('new-user-joined');

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
});

socket.on('receive', data =>{
    append(`${data.name}: ${data.user}`, 'left')
});

socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
});