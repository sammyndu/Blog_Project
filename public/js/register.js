$(document).ready(function(){
    let email_patt=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let name_patt = /[A-Za-z]{3}/;
    let password_patt = /.{3,}/;
    $('#submit').click(function(e){
        e.preventDefault();
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let today = new Date();
        let date = `${today.getDate().toLocaleString(undefined, {minimumIntegerDigits:2})}/${(today.getMonth()+1).toLocaleString(undefined, {minimumIntegerDigits:2})}}/${today.getFullYear()}`;
        if(name==='' || email==='' || password === ''){
            $(`<div class="col-9 alert alert-danger alert-dismissible fade show" role="alert">
            <span id="message">Please enter all fields</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
        }
        else if(name_patt.exec(name) === null){
            $(`<div class="col-9 alert alert-danger alert-dismissible fade show" role="alert">
            <span id="message">Name must have at least three letters</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
        }
        else if(email_patt.exec(email) === null){
            $(`<div class="col-9 alert alert-danger alert-dismissible fade show" role="alert">
            <span id="message">inavlid email</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
        }
        else if(password_patt.exec(password) === null){
            $(`<div class="col-9 alert alert-danger alert-dismissible fade show" role="alert">
            <span id="message">Password must have at least three characters</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
        }
        else{
            $.ajax({
                url: `http://localhost:3000/users?email=${email}`, success: function(result){
                    console.log(result);
                    if (result.length===0){
                        $.ajax({
                            url: 'http://localhost:3000/users', success: function(){
                             $.ajax({
                                 url: `http://localhost:3000/users?email=${email}`, success: function(user){
                                    console.log(user);
                                    sessionStorage.setItem('user_id', user[0].id);
                                    sessionStorage.setItem('user_name', user[0].name);
                                    window.location.href="index.html";
                                 } 
                             })
                            // window.location.href='index.html';
                            },
                            method: 'POST',
                            data:{
                                name,
                                email,
                                password,
                                date_created: date,
                                date_updated: date
                            }
                        })
                    }
                    else{
                        $(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span id="message" style="width:30rem;">Email already registered</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
                    }
                },
                method: 'GET'
            })
        }
    })
})