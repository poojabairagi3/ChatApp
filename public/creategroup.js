const token = localStorage.getItem("token");

async function showChatOnScreen(msgsgsgs) {
  console.log("Ye MAI HU");
  console.log(msgsgsgs);
  const parentElement = document.getElementById("msg");
  // console.log(parentElement);
  const childElement = document.createElement("li");
  // console.log(childElement);
  childElement.textContent = msgsgsgs.groupmessage;
  parentElement.appendChild(childElement);
}

async function showGroupsOnScreen(response) {
  console.log(response);
  
  const parentElement = document.getElementById("group");
  // console.log(parentElement);
  const childElement = document.createElement("li");
  // console.log(childElement);
  childElement.id = response.id;
  childElement.textContent = response.groupname;
  parentElement.appendChild(childElement);
  childElement.onclick = async () => {
    try {
      localStorage.setItem("currentGroupId",response.id);
      const msgsgsgs = await axios.get(
        `http://localhost:3000/groups/get-group-msg/${response.id}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(response.id);
      console.log(msgsgsgs);
      console.log(msgsgsgs.data.groupmsg);
     
      msgsgsgs.data.groupmsg.forEach((element) => {
          
        showChatOnScreen(element);
       
      });
      document.getElementById("msg")='';
    } catch (err) {
      console.log(err);
    }
  };
}

async function addtobackend(event) {
  event.preventDefault();
  const groupmessage = event.target.groupmessage.value;
  let currentGrpId=localStorage.getItem("currentGroupId");
  console.log(currentGrpId);
  const msgs = {
    groupmessage: groupmessage,
    groupId: currentGrpId,
  };
  try {
    const response = await axios.post(
      "http://localhost:3000/groups/msgsgroup",
      msgs,
      { headers: { Authorization: token } }
    );
    console.log(response);
    showMessageOnScreen(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function getgroupname() {
  try {
    const response = await axios.get(`http://localhost:3000/groups/get-group`, {
      headers: { Authorization: token },
    });
    console.log("Oye");
    console.log(response);
    response.data.getGroups.forEach((element) => {
      showGroupsOnScreen(element);
    });
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();

  getgroupname();
});
