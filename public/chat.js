const token = localStorage.getItem("token");

async function send(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const message = event.target.message.value;
  const chats = {
    name: name,
    message: message,
  };
  // console.log(chats);
  try {
    const response = await axios.post(
      "http://localhost:3000/chat/chatmessage",
      chats,
      { headers: { Authorization: token } }
    );
    console.log(response);
    showMessageOnScreen(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function showMessageOnScreen(response) {
  console.log(response);
  const parentElement = document.getElementById("Msgs");
  // console.log(parentElement);
  const childElement = document.createElement("li");
  // console.log(childElement);
  childElement.textContent = response?.name + " : " + response.message;
  parentElement.appendChild(childElement);
}

async function getchatmsg() {
  try {
    const response = await axios.get(`http://localhost:3000/chat/get-chat`, {
      headers: { Authorization: token },
    });
    console.log(response.data.mg.length);
    console.log("all-msg", response.data.mg);

    let array = new Array();
    console.log(array);
    if (response.data.mg.length > 100) {
      let n = response.data.mg.length - 1;

      console.log(response.data.mg[n]);
      while (array.length < 100) {
        array.push(response.data.mg[n]);
        n--;
      }
    } else {
      array = response.data.mg.reverse();
    }

    array = array.reverse();
    console.log("array", array);
    localStorage.setItem("msgs", JSON.stringify(array));
    response.data.mg.forEach((element) => {
      showMessageOnScreen(element);
    });
  } catch (err) {
    console.log(err);
  }
}

setInterval(async () => {
  let getOldMsgs = localStorage.getItem("msgs");
  const array = JSON.parse(getOldMsgs);
  console.log(array);
  let lastmsgid;
  if (array.length == undefined) {
    lastmsgid = -1;
  } else {
    lastmsgid = array[array.length - 1].id;
  }
  console.log("aaa");
  console.log(lastmsgid);

  const usermsg = await axios.get(
    `http://localhost:3000/chat/get-chat?id=${lastmsgid}`,
    {
      headers: { Authorization: token },
    }
  );
  console.log("A");

  console.log(usermsg);

  const getFromLs = localStorage.getItem("msgs");
  const parsedGetFromLs = JSON.parse(getFromLs);
  console.log(parsedGetFromLs);

  const msg = usermsg.data.mg[lastmsgid];
  console.log("lastmsgid");
  console.log(msg);

  const mergedArray = parsedGetFromLs.concat(msg);
  console.log(mergedArray);

  localStorage.setItem("msgs", JSON.stringify(mergedArray));

  usermsg.data.mg.forEach((element) => {
    showMessageOnScreen(element);
  });
}, 1000);

window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();

  getchatmsg();
});

// const makeaGroup=document.getElementById('group');
// makeaGroup.onclick=async()=>{
//   try{
// const grp=await axios.get(`http://localhost:3000/group/getgroup`,)
// console.log(grp);

//   }
//   catch(err){
//     console.log(err);
//   }
// }

// const creategroup = document.getElementById("group");
// creategroup.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const groupName = prompt("Please enter the group name:", "");
// y
//   if (groupName.length === 0 || null || undefined) {
//     alert("group name is minimum of one character");
//   } else {
//     const response = await axios.post(
//       "http://localhost:3000/groups/group",
//       { groupName },
//       { headers: { Authorization: token } }
//     );
//     console.log("GroupName");
//     console.log(response);
//     window.location.href = "./creategroup.html";
//   }
// });
