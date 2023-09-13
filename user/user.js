async function signup(e){
 e.preventDefault();
 const name=e.target.name.value;
 const email=e.target.email.value;
 const phonenumber=e.target.phonenumber.value;
 const password=e.target.password.value;
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
    }
    else{
        throw new Error("Failed to Login")
    }
 }
 catch(err){
    console.log(err);
 }
}