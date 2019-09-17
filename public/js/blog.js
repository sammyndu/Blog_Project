$(document).ready(function(){
    // $('#search').input(function(){
    //     let search = $('#search').val();
    //     $.ajax({
    //         url: `http://localhost:3000?q=${search}`, success: function(result){
                
    //         }
    //     })
    // })

    let id = sessionStorage.getItem('user_id');
    let name = sessionStorage.getItem('user_name');
    if (id===null){
        $('#welcome-user').hide('fast');
    }
    else{
        console.log(id)
        $('#log-in').hide('fast')
        $('#sign-up').hide('fast')
        $('#welcome-user').show('fast')
        // $('<a class="btn btn-primary" style="display:flex;justify-content:flex-start" href="add_post.html" id="new-post">Add Post</a>').insertBefore('.row')
        $('#add-post').append(`<a class="btn btn-primary"  href="add_post.html" id="new-post">Add New Post</a>`)
        $('#welcome-user').html(`Welcome ${name.split(" ")[0]}`)
        $('#log-out').append(`<a class="nav-link" href="index.html" id="logout-btn">Log Out</a>`)
    }
    // console.log(user)
    $.ajax({
        url: 'http://localhost:3000/posts?_sort=id&_order=desc', success: function(result){
        console.log(result);
        for (let i =0; i<result.length; i++){
            $.ajax({
                url: `http://localhost:3000/users/${result[i].userId}`, success: function(user){
                    $('.posts').append(`
                <div class="card bg" style="width: 20rem;">
                <img src="${result[i].image === undefined ? "cha2.jpg" : result[i].image}" class="card-img-top" alt="..." style="height:15rem;width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">${result[i].title}</h5>
                        <p class="card-text"></p>
                        <a href="posts.html" data-id="${result[i].id}" class="card-link btn-sm btn-primary">read more</a><br>
                        <span class="text-muted">Written by ${user.email}</span>
                    </div>
                </div>`)
                },
                method: 'GET'
            })
        }
        },
        method:'GET',
    })

    $(document).on('click', '.a', function(e){
        console.log($(e.target).html());
    })

    $(document).on('click', '.card-link', function(e){
        let post_id = $(e.target).attr('data-id');
        console.log(post_id);
        sessionStorage.setItem('post_id',`${post_id}`)
    })
    // console.log(posts);

    $('#search').on('input', function(){
        let search = $('#search').val();
        console.log(search);
        $.ajax({
            url: `http://localhost:3000/posts?q=${search}&_sort=id&_order=desc&_expand=user`, success: function(result){
            console.log(result);
            $('.posts').html('');
            for (let i =0; i<result.length; i++){
                // $.ajax({
                //     url: `http://localhost:3000/users/${result[i].userId}`, success: function(user){
                        
                        $('.posts').append(`
                    <div class="card bg" style="width: 20rem;">
                    <img src="cha2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${result[i].title}</h5>
                            <p class="card-text"></p>
                            <a href="posts.html" data-id="${result[i].id}" class="card-link btn-sm btn-primary">read more</a><br>
                            <span>Written by ${result[i].user.email}</span>
                        </div>
                    </div>`)
                //     },
                //     method: 'GET'
                // })
            }
            },
            method:'GET',
        })
    
    });

    // $('#new-post').click(function(){

    // })
    
});