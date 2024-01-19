const token = localStorage.getItem("token");

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
      obj ,
      { headers: { Authorization: token } }
    );
    // response.data.
    showAllMembers(response.data.gp);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

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
 checkBtn.id="checkId";
  childElement.appendChild(checkBtn);
  parentElement.appendChild(childElement);

}