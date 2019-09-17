$(document).ready(function(){
    $('#submit').click(function(e){
        e.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();
        if (email === '' || password === ''){
            $(`<div class="col-9 alert alert-danger alert-dismissible fade show" role="alert">
            <span id="message">Please enter all fields</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
        }
        else{
            $.ajax({
                url: `http://localhost:3000/users?email=${email}`, success: function(obj){
                    console.log(obj);
                if (obj.length === 0){
                    $('.alert').removeClass('hide');
                    $('.alert').addClass('show');
                    $('#message').html('Username does not exist')
                    alert(1);
                }
                else if (obj[0].password !== password){
                    $('.alert').removeClass('hide');
                    $('.alert').addClass('show');
                    $('#message').html('Incorrect username or password')
                }
                else{
                    sessionStorage.setItem('user_email', obj[0].email);
                    sessionStorage.setItem('user_id', obj[0].id);
                    window.location.href="index.html";
                }
                },
                method:'GET',
            })
        } 
        
    })
})