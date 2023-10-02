async function login(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const loginDetails = {

        email: email,
        password: password
    }
   
    try {

        let response = await axios.post('http://localhost:3000/user/login', loginDetails)
        if (response.status === 201){
            alert(response.data.message);
            localStorage.setItem('token',response.data.token);
            window.location.href="../chat/chat.html"
            console.log(response.data);
        }
        else if (response.status === 400) {
            alert(response.data.message);
        }
        else if (response.status === 401) {
            alert(response.data.message);
        }
        else {
            throw new Error(response.data.message)
        }

       
    }
    catch (err) {
        document.body.innerHTML += `<div style="color:red;">${err} </div>`
    }
}

