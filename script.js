// localStorage.clear();

const deleteData=(website)=>{
    let arr=localStorage.getItem("passwords")
    arr=JSON.parse(arr);
    updatearr=arr.filter((e)=>{
        return e.website!=website
    })
    localStorage.setItem("passwords",JSON.stringify(updatearr));
    saveInTable()
}


function copyText(e) {
    // Select the text field
    // const textToCopy = document.getElementById('textToCopy');

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(e).then(() => {
        document.querySelector(".alert").style.display="inline";
        setTimeout(() => {
        document.querySelector(".alert").style.display="none";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
    
}


const hidePassword=(pass)=>{
    p=""
    for (let index = 0; index < pass.length; index++) {
        p+='*';
    }
    return p;
}

const saveInTable=()=>{
    let tb=document.querySelector("table")
    let data=localStorage.getItem("passwords")
    if(data==null || JSON.parse(data).length==0)
    {
        tb.innerHTML="No Data To Show";
    }
    else
    {
        let arr=JSON.parse(data);
        str=""
        tb.innerHTML=`<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            str+=`<tr>
                <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy" width="15" height="15"></td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy" width="15" height="15"></td>
                <td>${hidePassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy" width="15" height="15"></td>
                <td> <span id="delete" onclick="deleteData('${element.website}')">Delete</span> </td>
            </tr>`
        }
        tb.innerHTML+=str;
    }

    website.value=""
    username.value=""
    password.value=""


}


saveInTable()
document.querySelector(".Submitbtn").addEventListener("click",(e)=>{
    e.preventDefault();
    console.log('click');

    let passwords=localStorage.getItem("passwords")
    // console.log('Password alrerady exits: ',passwords);
    
    if(passwords==null)
    {
        let json=[]

        json.push({"website":website.value,"username":username.value,"password":password.value})
        localStorage.setItem("passwords",JSON.stringify(json))
        alert("Password saved")
    }
    else{
        let json=JSON.parse(passwords)
        json.push({"website":website.value,"username":username.value,"password":password.value})
        localStorage.setItem("passwords",JSON.stringify(json))
        alert("Password saved")
    }
    passwords=localStorage.getItem("passwords")
    console.log(passwords);

    saveInTable();

})

