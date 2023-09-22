async function signup(event){
 event.preventDefault();
 const name=event.target.name.value;
 const email=event.target.email.value;
 const phonenumber=event.target.phonenumber.value;
 const password=event.target.password.value;
 const obj={
    name:name,
    email:email,
    phonenumber:phonenumber,
    password:password
 }
 console.log(obj);

 try{
    let response=await axios.post('http://localhost:3000/user/sign-up',obj);
    if(response.status===201){
      window.location.href="../Login/login.html"
        alert(response.data.message);    }
    else if(response.status===200){
      
      alert(response.data.message)
       
    }else{
      throw new Error("Failed to Login")

    }
 }
 catch(err){
    console.log(err);
 }
}