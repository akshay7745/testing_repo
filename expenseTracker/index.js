const form = document.querySelector("form");
let categoryInp = document.querySelector("#category");
let amountInp = document.querySelector("#amount");
let descriptionInp = document.querySelector("#description");
let users = JSON.parse(localStorage.getItem("userdata")) || [];
const ul = document.querySelector("ul");
let isEdited = false;
function getList(users){
    ul.innerHTML =``;
    users.forEach((val)=>{
        const {amount,description,category,id}=val;
    const li = document.createElement("li");
    li.setAttribute('id',id);
    li.setAttribute("class","d-flex")
    li.setAttribute("class","list-group-item")
    // li.setAttribute("class","justify-content-between")
    // li.setAttribute("class","align-items-center")
    li.innerHTML = `<span class="">${amount}</span> - <span class="">${category}</span> <p>${description}</p>`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent="Delete";
    li.appendChild(deleteBtn);
    deleteBtn.classList.add("dltBtn","btn","btn-sm","me-1","btn-outline-primary")
    // deleteBtn.setAttribute("class","btn")
    // deleteBtn.setAttribute("class","btn-outline-primary")
  
    const editBtn = document.createElement("button");
    editBtn.classList.add("edtBtn","btn","btn-sm","btn-outline-primary");
    // editBtn.setAttribute("class","btn");
    // editBtn.setAttribute("class","btn-outline-primary");
    editBtn.textContent="Edit";
    li.appendChild(editBtn);
   
    ul.appendChild(li);
    })
}


ul.addEventListener("click",(e)=>{
    if(e.target.classList.contains("dltBtn")){
  let elementId = e.target.parentElement.getAttribute("id");
  users = JSON.parse(localStorage.getItem("userdata"))
let newUserList = users.filter((val)=>{
if(val.id!== elementId){
    return val;
}
})
users = newUserList
localStorage.setItem("userdata",JSON.stringify(users));
getList(users);
    }
    else if(e.target.classList.contains("edtBtn")){
        let elementId = e.target.parentElement.id;
        isEdited = elementId;
        users = JSON.parse(localStorage.getItem("userdata"))
    let userDataToEdit=  users.filter((val)=>val.id===elementId);
    let [obj] =userDataToEdit;
    let {amount,description}= obj;
    amountInp.value = amount;
    descriptionInp.value = description;
    
    }
})
getList(users);
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    users = JSON.parse(localStorage.getItem("userdata") )|| [];
    const category =e.target.category.value;
    const amount =e.target.amount;
    const description =e.target.description;
    const id = `${category.value}${amount.value}`;
    const userData = {category:category,amount:amount.value,description:description.value,id};
//edit
 if(isEdited){
    let newUserList = users.map((val)=>{
        if(val.id === isEdited){
            return {id:isEdited,amount:amount.value,description:description.value,category};
        }else{
          return val;
        }
        });
        localStorage.setItem('userdata',JSON.stringify(newUserList));
        users = newUserList
        getList(users);
        amount.value= "";
        description.value ="";
    isEdited = false;
    return ;
 }
 
users.push(userData);
localStorage.setItem('userdata',JSON.stringify(users));
amount.value= "";
description.value ="";
getList(users);

}

 )