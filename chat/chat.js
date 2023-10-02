const token=localStorage.getItem('token');
async function send(event) {
    event.preventDefault();
    const name=event.target.name.value;
    const message = event.target.message.value;
    const chats={
        name:name,
        message:message
    }
    // console.log(chats);
    try{
        const response=await axios.post('http://localhost:3000/chat/chatmessage',chats,{headers:{'Authorization':token}})
    console.log(response);
    showMessageOnScreen(response.data)
    
    }
    catch(err){
        console.log(err);
    }
}


async function showMessageOnScreen(response){
    const parentElement=document.getElementById('Msgs');
    // console.log(parentElement);
    const childElement=document.createElement('li');
    // console.log(childElement);
    childElement.textContent=response.name +' : '+response.message;
    parentElement.appendChild(childElement);
}