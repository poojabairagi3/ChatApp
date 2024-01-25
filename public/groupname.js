const groupList = []
const url = 'http://localhost:3000'

const config = {
    headers: {
        Authorization: localStorage.getItem('token'),
    }
}

const searchBtn = document.getElementById('searchBtn');
const createGroupBtn = document.getElementById('createGroupBtn');

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const searchName = document.getElementById('searchName');
    const data = await axios.get(`${url}/user?name=${searchName.value}`)
    const listOfUsers = document.getElementById('listOfUsers');
    listOfUsers.innerHTML = "";
    console.log(data);
    data?.data?.data.map(ele => {
        displayUserList(ele);
    })
})

async function creategroup(event) {
  event.preventDefault();
  const groupname = event.target.groupname.value;
  const searchInput = event.target.searchInput.value;
  const obj = {
    groupname: groupname,
    searchInput: searchInput,
  };
  console.log(obj);
  try {
    const response = await axios.post(
      "http://localhost:3000/groupnam/postgroupname",
      obj,
      { headers: { Authorization: token } }
    );
    // response.data.
    showAllMembers(response.data.gp);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}


createGroupBtn.addEventListener('click',async(e)=>{
    e.preventDefault()
    const groupName = document.getElementById('groupName');
    const obj={
        groupname:groupName.value,
        userList:groupList,
    }
    const data=await axios.post(`${url}/group`,obj,config);
    console.log(data);
    const stringData=JSON.stringify(data?.data?.data);
    localStorage.setItem('groups',stringData);
    location=`${url}/index.html`
})

function displayUserList({ id, name }) {
    console.log(id);
    console.log(name);
    const listOfUsers = document.getElementById('listOfUsers');
    listOfUsers.innerHTML+=`<li id=`+`${id}`+`>`+`${name}`+
    `<button id=`+`btn${id}`+` onclick=`+`addtogroup(`+`${id}`+`)`+`>Add</button>`

}

function addtogroup(id){
    groupList.push(id);
    console.log(groupList);
}




const token = localStorage.getItem("token");

// async function creategroup(event) {
//   event.preventDefault();
//   const groupname = event.target.groupname.value;
//   const searchInput = event.target.searchInput.value;
//   const obj = {
//     groupname: groupname,
//     searchInput: searchInput,
//   };
//   console.log(obj);
//   try {
//     const response = await axios.post(
//       "http://localhost:3000/groupnam/postgroupname",
//       obj ,
//       { headers: { Authorization: token } }
//     );
//     // response.data.
//     showAllMembers(response.data.gp);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// }

const addMemberBtn = document.getElementById("add-member");
console.log(addMemberBtn);
addMemberBtn.addEventListener("click", async () => {
  try {
    const searchMmbr = document.getElementById("search");
    const searchInput = await axios.get(
      `http://localhost:3000/groupnam/${searchMmbr.value}`,
      {
        headers: { Authorization: token },
      }
    );

    searchInput.data.searchInput.forEach(element=>{
      showAllMembers(element);
    })
    
    console.log(searchInput);
  } catch (err) {
    console.log(err);
  }
});


var Members=[];

async function showAllMembers(obj) {
  const parentElement = document.getElementById("Members");
  const childElement = document.createElement("li");
  childElement.textContent =obj.name + ' - ';
  parentElement.appendChild(childElement);

  const checkBtn = document.createElement("input");
  checkBtn.type = "checkbox";
  checkBtn.className = "form-check-input";
  checkBtn.value = "";
 checkBtn.id=obj.id;
  childElement.appendChild(checkBtn);
  parentElement.appendChild(childElement);

}

// const groupList = []
// const url = 'http://localhost:3000'

// const config = {
//     headers: {
//         Authorization: localStorage.getItem('token'),
//     }
// }

// const searchBtn = document.getElementById('searchBtn');
// const createGroupBtn = document.getElementById('createGroupBtn');

// searchBtn.addEventListener('click', async (e) => {
//     e.preventDefault()
//     const searchName = document.getElementById('searchName');
//     const data = await axios.get(`${url}/user?name=${searchName.value}`)
//     const listOfUsers = document.getElementById('listOfUsers');
//     listOfUsers.innerHTML = "";
//     console.log(data);
//     data?.data?.data.map(ele => {
//         displayUserList(ele);
//     })
// })

// createGroupBtn.addEventListener('click',async(e)=>{
//     e.preventDefault()
//     const groupName = document.getElementById('groupName');
//     const obj={
//         groupname:groupName.value,
//         userList:groupList,
//     }
//     const data=await axios.post(`${url}/group`,obj,config);
//     console.log(data);
//     const stringData=JSON.stringify(data?.data?.data);
//     localStorage.setItem('groups',stringData);
//     location=`${url}/index.html`
// })

// function displayUserList({ id, name }) {
//     console.log(id);
//     console.log(name);
//     const listOfUsers = document.getElementById('listOfUsers');
//     listOfUsers.innerHTML+=`<li id=`+`${id}`+`>`+`${name}`+
//     `<button id=`+`btn${id}`+` onclick=`+`addtogroup(`+`${id}`+`)`+`>Add</button>`

// }

// function addtogroup(id){
//     groupList.push(id);
//     console.log(groupList);
// }