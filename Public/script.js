// Login feature
window.onload = function(){
    let bn = 123;
    let cm =454;
    let data = {bn, cm}


    var login = document.getElementById("login");
    if (login){
        login.addEventListener("click",check);

        function check(){
            var name=document.getElementById("name").value;
            var mail = document.getElementById("email").value;
            var age = document.getElementById("birth-year").value;
            if (name == "admin" && age == 1867){
                document.getElementById("user").style.display = "none";
                var disp_info = document.createElement("p");
                disp_info.innerHTML = "Librarian";
                document.getElementById("div1").appendChild(disp_info);

               load_pg();
               mgtAdd();
               mgtRemove();
               mgtchngDue();
               mgtInfo();
               mgtout();


            }
            //Performing Sanitization of input 
            else{
            var name_x = username();
            var em = email();
            var bd = dob();
        
            if(name_x && em && bd){
               
                var foo;

                if((2019-age)<18){
                    foo = "Child";
                }
                else {
                    foo = "Adult";
                }
                document.getElementById("user").style.display = "none";
                var disp_info = document.createElement("p");
                disp_info.innerHTML = name+" ("+ mail+") [" +foo+"] ";
                document.getElementById("div1").appendChild(disp_info);
                
                load_pg();
                 


            }
        }
    }
 }
}


//loading webpage
function load_pg(){
    // div section for checkout button
    let f = document.createElement("div");
    f.setAttribute("id","dt1");
    document.getElementsByTagName("body")[0].appendChild(f);

    cart(); // adding checkout button
    lang_french(); // adding french button to change language 
    //DisplayItems()
    fetchGet();
} 



// Checking a valid name
function username(){
    var nameRegex = /^[a-zA-Z\-]+$/;
    var name_x= document.getElementById("name").value;
    if (name_x == "" || name_x.length>100) {
        alert("Name is not valid. Please ensure that you've filled it and it doesn't exceed 100 characters");
        return false;
    }
    if(Boolean(name_x.match(nameRegex))){

        return true;
    }
    else{
        alert("Name is not valid. Please enter a valid name");
        return false;    }

}


// email validation
function email(){
    var eregex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var em= document.getElementById("email").value;
    if (em!=="" && Boolean(em.match(eregex))){
        return true;
    }
    else{
        alert("You have entered an invalid email address!")
        return false;
    }
}


// Birth date validation
function dob(){
    var n= document.getElementById("birth-year").value;
    dobregex = /^[0-9]+$/
    if (n<1900 || n>2019 ){
        alert("Birthdate not valid");
        return false;
    }
   if(Boolean(n.match(dobregex))){
       return true;
        
    }
        else{
            alert("Birthdate not valid");
            return false;
    }

}

var counter = 0;// tracking items in checkout  
//Array of available items 
// var items = [{name: "The Kite Runner", type:"Book", dueDate:"30",img: 'img1.jpg'},
//             {name: "The Book Thief", type:"Book", dueDate:"30",img:'img2.jpg'} ,
//             {name: "The Bone Collector", type:"Book", dueDate:"30",img:'img3.jpg'},
//             {name: "The Coffin Dancer", type:"Book", dueDate:"30",img:'img4.jpg'},
//             {name: "The Skin Collector", type:"Book", dueDate:"30",img:'img5.jpg'},
//             {name: "Titanic", type:"CD", dueDate:"10",img:'img6.jpg'},
//             {name: "Shrek", type:"CD", dueDate:"10",img:'img7.jpg'},
//             {name: "Wall E", type:"CD", dueDate:"10",img:'img8.jpg'},
//             {name: "Venom", type:"CD", dueDate:"10",img:'img9.jpg'},
//             {name: "Dumbo", type:"CD", dueDate:"10",img:'img10.jpg'}]

// Displaying the items
function DisplayItems(it){
    let items = []
    items =it
    let g =document.getElementById("available-items");
    while(g.hasChildNodes()){
    g.removeChild(g.firstChild)
    }
    for(i=1; i <= items.length;i++ )(function(i){
        var item1 = document.createElement("li");
        var img1 = document.createElement("img");
        var btn1 = document.createElement("button");    
        img1.setAttribute("src","images/"+items[i-1].img);
        img1.setAttribute("id","img"+i)
        item1.setAttribute("id","item"+i);
        item1.innerHTML = items[i-1].name; 
        btn1.setAttribute("type", "button");
        btn1.setAttribute("id", i); 
        // Calling function to add item to basket on clicking the button
        btn1.onclick=()=>{
            document.getElementById("item"+i).style.display="none";
            addItem(i);
            counter += 1; 
            
            }
       
        btn1.innerHTML = "Add";
        document.getElementById("available-items").appendChild(item1);
        item1.appendChild(img1);
         item1.appendChild(btn1); 
                
})(i);
}


// adding items to checkout list 
function addItem(j){
    var item2 = document.createElement("li");
    let due = document.createElement("p");
    let rem_btn = document.createElement("button");// Adding remove button to items in checkout list
    item2.setAttribute("id","rem_item"+j);
    rem_btn.setAttribute("type","button");
    rem_btn.setAttribute("id","rem"+j);
    rem_btn.innerHTML = "Remove";
    rem_btn.onclick = ()=>{
        document.getElementById("rem_item"+j).style.display = "none"; //removes item from checkout list
        document.getElementById("item"+j).style.display = "list-item" // places the removed item back in the available list
        counter -= 1;
        
        
    }
    item2.innerHTML= items[j-1].name; 
    due.innerHTML = items[j-1].dueDate;
    item2.appendChild(due); // showing duedate of each item in checkout
    item2.appendChild(rem_btn);
    document.getElementById("basket").appendChild(item2);
}


// adding french button
function lang_french(){

    var lang_btn = document.createElement("button");
    lang_btn.setAttribute("type","button");
    lang_btn.setAttribute("id","Lang_btn");
    lang_btn.innerHTML = "French";
    document.getElementsByTagName("body")[0].appendChild(lang_btn);
    lang_btn.addEventListener("click",changeLang)

}

//Displaying items in another language(French)
function changeLang(){
    var frenchItems = ["Le coureur de cerf-volant","Le voleur de livre","Le collecteur d'os","Le cercueil danseur","Le collecteur de peau","Titanesque","Shrek","Mur e","Venin","Dumbo"];
    for(i=0;i<items.length;i++){
    items[i].name=frenchItems[i];
     let itemf = document.getElementById("item"+(i+1));
     let imgf = document.createElement("img");
     imgf.setAttribute("src","images/"+items[i].img);
     let btnf = document.getElementById(i+1);
    itemf.innerHTML=items[i].name;
    itemf.appendChild(imgf);
    itemf.appendChild(btnf);      
}
}

// Creating a chechkout button
function cart(){
     var checkout_btn = document.createElement("button");
     checkout_btn.setAttribute("type","button");
     checkout_btn.setAttribute("id","Checkout_btn");
     checkout_btn.innerHTML= "Checkout";
     document.getElementById("dt1").appendChild(checkout_btn);
     checkout_btn.onclick = () =>{
         summary();
     }


}
// checking out items
function summary(){
    
    let c = window.confirm("Total Number of items: " +counter );
    let clr_items = document.getElementById("basket");
    //removing the items if user is checking out
    if(c == true){
        while(clr_items.hasChildNodes()){
            clr_items.removeChild(clr_items.firstChild);
            
        }
        counter = 0;
               
    }
    // adding items back to available list if user doesn't checkout
    else{
        while(clr_items.hasChildNodes()){
        let a = document.querySelector('[id*=rem_item]').id;    
        let n = a.replace(/^\D+/g, "");
        document.getElementById("item"+n).style.display = "list-item";
        clr_items.removeChild(clr_items.firstChild);

        }
        counter = 0;
        

    }

}

// librarian's Button to add items
function mgtAdd(){
    
    let mbtn = document.createElement("button");
    mbtn.setAttribute("type","button");
    mbtn.setAttribute("id","Mgt_add");
    mbtn.innerHTML = "Add New items";
    document.getElementById("div1").insertAdjacentElement("afterend",mbtn);
    mbtn.addEventListener("click",libAdd); 
    
}
//Allowing the librarian to add items
function libAdd(){
    
    let n = window.prompt("Name of the item ");
    let t = window.prompt("Type of item(Book/CD)?");
    let d = window.prompt("Duedate of the item?")
    let p = window.prompt("Name of image file(with extension):")
    let q = window.prompt("Qty of the item?")
    let a = new Object();
    a.name =n;
    a.type =t;
    a.dueDate =d;
    a.img = p;
    a.qty = q; 
    //items.push(a);
    fetchPut(a);
   
   
    let g =document.getElementById("available-items");
    while(g.hasChildNodes()){
    g.removeChild(g.firstChild)
    }
    //DisplayItems();
}

// librarians button to remove items
function mgtRemove(){
    
    let mbtn = document.createElement("button");
    mbtn.setAttribute("type","button");
    mbtn.setAttribute("id","Mgt_remove");
    mbtn.innerHTML = "Remove items";
    document.getElementById("Mgt_add").insertAdjacentElement("afterend",mbtn);
    mbtn.addEventListener("click",libRemove); 
    
}

//Allowing libarian to remove items
function libRemove(){
    let n = window.prompt("Which item do you want to remove?");
    let g =document.getElementById("available-items");
    fetchDelete(n);
    while(g.hasChildNodes()){
        g.removeChild(g.firstChild)
    }
     
}
// librarians button for changing due date
function mgtchngDue(){
    let mbtn = document.createElement("button");
    mbtn.setAttribute("type","button");
    mbtn.setAttribute("id","Mgt_chng_Due");
    mbtn.innerHTML = "Update Items";
    document.getElementById("Mgt_remove").insertAdjacentElement("afterend",mbtn);
    mbtn.addEventListener("click",changeDue);
}

//Allowing librarian to change duedate
function changeDue(){
    let n = window.prompt("How many items do you want to update?");
    if(n==1){
        let t = window.prompt("Enter the item name:")
        let u = window.prompt("Mention the field you want to update(dueDate/img/qty):");
        let c = window.prompt("Enter the new value:")
        fetchPost(n,t,u,c)
    }
    else{
        let u = window.prompt("Mention the field you want to update(dueDate/img/qty):");
        let c = window.prompt("Enter the new value:")
        fetchPost(n,0,u,c)
    }
   // items[n-1].dueDate = u;
   let g =document.getElementById("available-items");

    while(g.hasChildNodes()){
        g.removeChild(g.firstChild)
    }
    // DisplayItems();
}
function mgtInfo(){
    
    let mbtn = document.createElement("button");
    mbtn.setAttribute("type","button");
    mbtn.setAttribute("id","Mgt_info");
    mbtn.innerHTML = "Get Info";
    document.getElementById("Mgt_chng_Due").insertAdjacentElement("afterend",mbtn);
    mbtn.addEventListener("click",getInfo); 
    
}
// librarian's button for logging out
function mgtout(){
    let mbtn = document.createElement("button");
    mbtn.setAttribute("type","button");
    mbtn.setAttribute("id","Mgt_logout");
    mbtn.innerHTML = "Logout";
    document.getElementById("Mgt_info").insertAdjacentElement("afterend",mbtn);
    mbtn.addEventListener("click",logout);
}

//logging out the librarian
function logout(){
    let l = window.confirm("Are you sure you want to logout?");
    if(l== true){
    location.reload();
    }


}
//PUT req
function fetchPut(a){
    
const option = {
    method: 'PUT',
    body: JSON.stringify(a),
    headers: {
        'Content-Type': 'application/json'
      },
};
fetch('http://'+host+'/api',option).then(res =>{
    console.log(res);
setInterval(fetchGet,1000)

}); 
}
var host = window.location.host
function fetchGet(){
    
    //GET
const option = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },
};
fetch('http://'+host+'/api',option)
.then(response =>{return response.json();})
.then(res =>{
    let it = [];
    it=res.result;
    console.log(it)
    DisplayItems(it);
}); 
}
function getInfo(){
    let t = window.prompt("Enter the item name:")
    //GET info for 1 item
    //const { URL, URLSearchParams } = require('url');    
const option = {
    method: 'GET',

    headers: {
        'Content-Type': 'application/json'
      },
};
let url = 'http://'+host+'/api/info?name='
param = {name: t};
// url.search = new URLSearchParams(param).toString();
url = url + t
console.log(url)
fetch(url,option)
.then(response =>{return response.json();})
.then(res =>{
    let n = []
    n.push(res.result);
    console.log(n);
    window.alert(JSON.stringify(n,null,4))
}); 
}



function fetchPost(n,t,u,c){
    //POST

 if (n ==1){   
const option = {
    method: 'POST',
    body: JSON.stringify({
        num: n,
        name: t,
        field : u,
        info: c,
    }),
    headers: {
        'Content-Type': 'application/json'
      },
};
fetch('http://'+host+'/api',option).then(res =>{
    console.log(res);
    setInterval(fetchGet,1000)
    window.alert("1 item updated")

});
 }
 else{
    const option = {
        method: 'POST',
        body: JSON.stringify({
            num: n,
            name: "0",
            field : u,
            info: c,
        }),
        headers: {
            'Content-Type': 'application/json'
          },
    };
    fetch('http://'+host+'/api',option).then(res =>{
        console.log(res);
        setInterval(fetchGet,1000)
        window.alert("All items updated ")
    });

 } 
}

//Delete req
function fetchDelete(n){
    
    const option = {
        method: 'DELETE',
        body: JSON.stringify({name:n}),
        headers: {
            'Content-Type': 'application/json'
          },
    };
    fetch('http://'+host+'/api',option).then(res =>{
        console.log(res);
        setInterval(fetchGet,1000)

    }); 
    }
