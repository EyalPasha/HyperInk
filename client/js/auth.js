const apiPrefix = 'http://localhost:3001/api/auth'

 function login(){

    const email = document.getElementById("email")
     const password = document.getElementById("password")
    try{

        $.ajax({
            url: `${apiPrefix}/login`,
            type: 'post',
            data: {email, password},
            success: ()=>{
                console.log("success")
            }
            error: ()=>{
                console.log(error)
            }
        })

    }catch(error){
        console.log(error)
    }


}