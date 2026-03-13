let user=localStorage.getItem("currentUser");
document.getElementById("welcome").innerText="Welcome, "+user;

let userInfo=JSON.parse(localStorage.getItem("ActiveRecall_"+user));
let className=userInfo.studentClass;
let dept=userInfo.department;
let agGeo=userInfo.agriGeo;

let subjects=[];

if(className.includes("Junior")){
    subjects=["Math","English","Basic Science","Basic Technology","Business Studies","Literature","Agric","CRS","Civic","Computer","Home Economics","CCA","French","Edo","Social Studies","Speech Science","History","PHE"];
} else if(className==="Senior Secondary School 1"){
    subjects=["Chemistry","Biology","Physics","Civic","Economics","Data Processing","English","Further Maths","Mathematics","Agric","Geography","CRS","Government","Literature","Commerce"];
} else if(className==="Senior Secondary School 2" || className==="Senior Secondary School 3"){
    if(dept==="Science"){
        subjects=["Chemistry","Biology","Physics","Civic","Economics","Data Processing","English","Further Maths","Mathematics"];
        if(agGeo) subjects.push(agGeo);
    } else {
        subjects=["Mathematics","English","Data Processing","Civic Education","Economics","CRS","Government","Literature","Commerce"];
        if(agGeo) subjects.push(agGeo);
    }
}

let container=document.getElementById("subjects");
subjects.forEach(subject=>{
    let box=document.createElement("div");
    box.className="subject-box";
    box.innerText=subject;
    box.onclick=function(){
        localStorage.setItem("currentSubject",subject);
        window.location="flashcards.html";
    }
    container.appendChild(box);
});

// Overall stats
let totalCards=0,totalAttempts=0,totalCorrect=0;
subjects.forEach(subject=>{
    let data=JSON.parse(localStorage.getItem(user+"_"+subject));
    if(data){
        totalCards+=data.cards.length;
        totalAttempts+=data.attempts||0;
        totalCorrect+=data.correct||0;
    }
});
document.getElementById("totalCards").innerText="Total Cards: "+totalCards;
document.getElementById("totalAttempts").innerText="Total Attempts: "+totalAttempts;
document.getElementById("totalCorrect").innerText="Total Correct: "+totalCorrect;
let acc=totalAttempts?Math.round((totalCorrect/totalAttempts)*100)+"%":"0%";
document.getElementById("overallAccuracy").innerText="Overall Accuracy: "+acc;