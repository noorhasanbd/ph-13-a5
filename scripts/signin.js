document.getElementById('signin-btn').addEventListener("click", function(){
    // 1. Get Login
    const userName= document.getElementById('user-name').value; 
    console.log(userName);
    
    
    //2. Get Passowrd
    const userPassword= document.getElementById('password').value;
    console.log(userPassword);

    // 3. Match Logic
    if(userName==='admin' && userPassword==='admin123'){

        alert("Success");
        window.location.replace('home.html');

    }
    else{
        alert("Invalid Credentials");
    }


})