function init(){
    const credentialsRaw = localStorage.getItem('credentials');
    console.log(credentialsRaw)
    if(credentialsRaw){
        const credentials = JSON.parse(credentialsRaw)
        document.getElementById('not-auth').style.display = "none";
        document.getElementById('auth').style.display = "unset";
        document.getElementById('hello-message').innerText = `Hello, ${credentials.username}`
    }
}

init()

function navigate(newRoute){
    const pathParts = window.location.pathname.split("/") 
    const route = window.location.pathname.split("/")[pathParts.length-1]
    const newPath = window.location.pathname.replace(route, newRoute)
    window.location.pathname = newPath
}

function logout(){
    localStorage.removeItem('credentials')
    navigate('index.html')
}

document.getElementById('logout').onclick = logout
