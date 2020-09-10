console.log("hello");

const edit_bttns=document.getElementsByClassName("edit");
const modal=document.getElementsByClassName("modal");
const close=document.getElementsByClassName("close");
console.log("Close",close);
let index=0;
for(let i=0; i<edit_bttns.length; i++){
    
        console.log("eee");
    edit_bttns[i].addEventListener("click",function(event){
        event.preventDefault();
         index = i;
         console.log("Index",i);
        modal[i].style.display="block";
        close[i].addEventListener("click", function () {
          modal[index].style.display = "none";
        });
    });
}

