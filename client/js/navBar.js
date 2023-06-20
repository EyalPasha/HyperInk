const nav = document.querySelector(".navBar");
fetch('/navBar.html')
.then(res=res.text())
.then(data=>{
    nav.innerHTML=data
})