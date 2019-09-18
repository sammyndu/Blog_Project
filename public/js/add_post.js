$(document).ready(function(){
    $('#submit').click(function(e){
        e.preventDefault();
        let title = $('#title').val();
        let content = $('#content').val();
        let image = $('#image').val();
        let userId = sessionStorage.getItem('user_id');
        // let email_patt = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        // let url_patt = /^(?:http(s)?:\/\/))/;
        let today = new Date();
        let date = `${today.getDate().toLocaleString(undefined, {minimumIntegerDigits:2})}/${(today.getMonth()+1).toLocaleString(undefined, {minimumIntegerDigits:2})}/${today.getFullYear()}`;
        // let time = `${today.getHours()}:${today.getMinutes()}`;
        if (title === '' || content === ''){
            $(`<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width:30rem;">
            <span id="message">Please enter all fields</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
        }
        // else if (email_patt.exec()){

        // }
        else{
            $.ajax({
                url: `http://localhost:3000/posts`, success: function(){
                    window.location.href="index.html";
                },
                method: "POST",
                data: {
                    title,
                    content,
                    userId,
                    date_created: date,
                    date_updated: date 
                }
            })
        }
    })
})