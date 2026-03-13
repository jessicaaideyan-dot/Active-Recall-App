function signup(){
    let name=document.getElementById("name").value.trim();
    let password=document.getElementById("password").value.trim();
    let studentClass=document.getElementById("class").value;

    if(!name || !password || !studentClass){
        alert("Fill all fields");
        return;
    }

    let department="";
    let depInput=document.querySelector('input[name="department"]:checked');
    if(depInput) department=depInput.value;

    let agriGeo="";
    let agInput=document.querySelector('input[name="agricGeo"]:checked');
    if(agInput) agriGeo=agInput.value;

    let user={name,password,studentClass,department,agriGeo};
    localStorage.setItem("ActiveRecall_"+name,JSON.stringify(user));

    alert("Account created!");
    window.location="index.html";
}

function login(){
    let name=document.getElementById("loginName").value.trim();
    let password=document.getElementById("loginPassword").value.trim();
    let user=JSON.parse(localStorage.getItem("ActiveRecall_"+name));
    if(user && user.password===password){
        localStorage.setItem("currentUser",name);
        window.location="home.html";
    } else {
        alert("Incorrect login");
    }
}

function showDepartmentAndSubjects(){
    let cls=document.getElementById("class").value;
    let depBox=document.getElementById("departmentBox");
    let agBox=document.getElementById("agricGeoBox");
    depBox.innerHTML=""; agBox.innerHTML="";
    if(cls==="Senior Secondary School 2" || cls==="Senior Secondary School 3"){
        depBox.innerHTML='<label><input type="radio" name="department" value="Science"> Science</label> <label><input type="radio" name="department" value="Non-Science"> Non-Science</label>';
        depBox.addEventListener("change",()=>{
            let depInput=document.querySelector('input[name="department"]:checked');
            if(depInput){
                agBox.innerHTML='<label><input type="radio" name="agricGeo" value="Agric"> Agric</label> <label><input type="radio" name="agricGeo" value="Geography"> Geography</label>';
            }
        });
    }
}