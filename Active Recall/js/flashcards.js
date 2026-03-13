let user = localStorage.getItem("currentUser");
let subject = localStorage.getItem("currentSubject");

document.getElementById("subjectTitle").innerText = subject;

let data = JSON.parse(localStorage.getItem(user + "_" + subject));

if(!data){
data = {cards:[]};

for(let i=0;i<20;i++){
data.cards.push({q:"",a:""});
}

localStorage.setItem(user+"_"+subject,JSON.stringify(data));
}

let cards = data.cards;
let grid = document.getElementById("flashcardsGrid");

createCards();

function createCards(){

grid.innerHTML="";

cards.forEach((card,i)=>{

let div = document.createElement("div");
div.className="flashcard";

div.innerHTML=`
<div class="card-inner">

<div class="card-front">
${card.q || "Tap to add question"}
</div>

<div class="card-back">
${card.a || "Answer not added"}
</div>

</div>
`;

div.onclick=()=>{
div.classList.toggle("flipped");

if(!cards[i].q){
openPopup(i);
}
};

grid.appendChild(div);

});

}

let currentIndex=null;

function openPopup(i){

currentIndex=i;

document.getElementById("popupQuestion").value=cards[i].q;
document.getElementById("popupAnswer").value=cards[i].a;

document.getElementById("popupEditor").style.display="flex";

}

function closePopup(){

document.getElementById("popupEditor").style.display="none";

}

function saveCard(){

let q=document.getElementById("popupQuestion").value.trim();
let a=document.getElementById("popupAnswer").value.trim();

cards[currentIndex]={q,a};

localStorage.setItem(user+"_"+subject,JSON.stringify(data));

createCards();

closePopup();

}