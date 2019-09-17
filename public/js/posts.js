$(document).ready(function(){
    let user_id  = sessionStorage.getItem('user_id');
    let post_id  = sessionStorage.getItem('post_id');
    let comment_id;
    // let id = sessionStorage.getItem('user_id');
    let name = sessionStorage.getItem('user_name');
    if (user_id===null){
        $('#welcome-user').hide('fast');
    }
    else{
        // console.log()
        $('#log-in').hide('fast')
        $('#sign-up').hide('fast')
        $('#welcome-user').show('fast')
        // $('<a class="btn btn-primary" style="display:flex;justify-content:flex-start" href="add_post.html" id="new-post">Add Post</a>').insertBefore('.row')
        $('#add-post').append(`<a class="btn btn-primary"  href="add_post.html" id="new-post">Add New Post</a>`)
        $('#welcome-user').html(`Welcome ${name.split(" ")[0]}`)
        $('#log-out').append(`<a class="nav-link" href="index.html" id="logout-btn">Log Out</a>`)
    }
    $.ajax({
        url: `http://localhost:3000/posts/${post_id}`, success: function(result){   
            if (user_id === result.userId){
                console.log('a')
                $('#post-info').append(`<h2 id="post-title">${result.title}</h2>
                <img src="${result.image === undefined ? "cha2.jpg" : result[i].image}" class="card-img-top" alt="..." style="display:block;height:20rem;width: 50%;margin-right:auto;margin-left:auto"><br>
            <div id="post-content">
                ${result.content}
                
                <br><a style="display:inline!;" href="#" class="update btn btn-success" data-id="${result.id}" data-toggle="modal" data-target="#exampleModalCenter2">update</a>
                <button data-id="${result.id}" class="delete_post btn btn-danger">delete</button>
            </div>`)
            }
            else{
                
                $('#post-info').append(`<h2 id="post-title">${result.title}</h2>
                <img src="${result.image === undefined ? "cha2.jpg" : result[i].image}" class="card-img-top" alt="..." style="display:block;height:20rem;width: 50%;margin-right:auto;margin-left:auto"><br>
            <div id="post-content">
                ${result.content}
            </div>`)
            }
            
        }
    })
    $.ajax({
        url: `http://localhost:3000/comments?postId=${post_id}&_expand=user&_expand=post`, success: function(comments){
            
            let resultDat = '';
            if (comments.length == 0){
                $('.comment-body').html('')
                $('.comment-body').append(`<div class="card card-body">
                <p id="comment">No Comments yet</p>
                </div>`)
            }
            else{
                $('.comment-body').html('')
                for (let i=0; i<comments.length; i++){                
                            console.log(comments)
                            if (user_id === comments[i].userId){
                                resultDat += `<div class="card card-body">
                                <h6 id="user-name">${comments[i].user === undefined ? "Anonymous": comments[i].user.name}</h6>
                                <p id="comment">${comments[i].body}</p>
                                <a style="display:inline!;" href="#" class="update" id="${comments[i].id}" data-toggle="modal" data-target="#exampleModalCenter">update</a>
                            <span id="${comments[i].id}" class="delete_">delete</span>
                                <span id="comment-date" class="text-muted">${comments[i].date_updated}</span>
                                </div>`;
                            }
                            else{
                                resultDat += `<div class="card card-body">
                            <h6 id="user-name">${ comments[i].user === undefined ? "Anonymous": comments[i].user.name}</h6>
                            <p id="comment">${comments[i].body}</p>
                            
                            <span id="comment-date" class="text-muted">${comments[i].date_updated}</span>
                            </div>`;
                            }
                            $('.comment-body').append(resultDat)
                            console.log(resultDat);
                            resultDat = '';
                        // }
                    // })
                }
            }

        }
    })

    $('#exampleModalCenter').on('show.bs.modal', function(e){
        sessionStorage.setItem('comment_id', `${e.relatedTarget.id}`)
        comment_id = sessionStorage.getItem('comment_id');
        $.ajax({
            url: `http://localhost:3000/comments/${e.relatedTarget.id}`, success: function(comm){
                $('#edit-comment').html('')
                $('#edit-comment').append(`<textarea rows="4" cols="50" id="content" class="form-control form-group">${comm.body}</textarea>
                `)
            }
        })
        
    });

    $('#exampleModalCenter2').on('show.bs.modal', function(e){
        $()
        $.ajax({
            url: `http://localhost:3000/posts/${post_id}`, success: function(p){
                $('#post-body').html('')
                $('#post-body').append(`<form>
                <label for="title">Title</label>
                <input type="text" class="form-control form-group" value="${p.title}" id="title">
                <label for="content">Post Content</label>
                <textarea rows="4" cols="50" id="edit-post-content" class="form-control form-group">${p.content}</textarea>
            </form>  `)
            }
        })
        
    });

    $('#save2').click(function(e){
        // e.preventDefault();
        let title = $('#title').val();
        let body = $('#edit-post-content').val();
        console.log(body)
        let today = new Date();
        let today_date = `${today.getDate().toLocaleString(undefined, {minimumIntegerDigits:2})}/${(today.getMonth()+1).toLocaleString(undefined, {minimumIntegerDigits:2})}/${today.getFullYear()}`;
        if (title === '' || body === ''){
            $(`<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width:30rem;">
            <span id="message">edited fields can not be empty</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('#post-body')
        }
        else{
            $.ajax({
                url: `http://localhost:3000/posts/${post_id}`, success: function(result){
                // console.log(res);
                $('#post-info').html('');
                if (user_id === result.userId){
                    console.log('a')
                    $('#post-info').append(`<h2 id="post-title">${result.title}</h2>
                    <img src="${result.image === undefined ? "cha2.jpg" : result[i].image}" class="card-img-top" alt="..." style="display:block;height:20rem;width: 50%;margin-right:auto;margin-left:auto"><br>
                <div id="post-content">
                    ${result.content}
                    
                    <br><a style="display:inline!;" href="#" class="update btn btn-success" data-id="${result.id}" data-toggle="modal" data-target="#exampleModalCenter2">update</a>
                    <button data-id="${result.id}" class="delete_post btn btn-danger">delete</button>
                </div>`)
                }
                else{
                    
                    $('#post-info').append(`<h2 id="post-title">${result.title}</h2>
                    <img src="${result.image === undefined ? "cha2.jpg" : result[i].image}" class="card-img-top" alt="..." style="display:block;height:20rem;width: 50%;margin-right:auto;margin-left:auto"><br>
                <div id="post-content">
                    ${result.content}
                </div>`)
                }
                
                },
                method: 'PATCH',
                data:{
                    title,
                    content:body,
                    date_updated: today_date
                }
            })
        }
    })

    $('#save').click(function(e){
        e.preventDefault();
        let comment = $('#content').val();
        let today = new Date();
        let today_date = `${today.getDate().toLocaleString(undefined, {minimumIntegerDigits:2})}/${(today.getMonth()+1).toLocaleString(undefined, {minimumIntegerDigits:2})}/${today.getFullYear()}`;
        console.log(comment);
        if (comment === ''){
            $(`<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width:30rem;">
            <span id="message">edited comment can not be empty</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('#content')
        }
        else{
            console.log(sessionStorage.getItem('comment_id'));
            $.ajax({
                url: `http://localhost:3000/comments/${comment_id}`, success: function(res){
                console.log(e.target.previousElementSibling);
                $.ajax({
                    url: `http://localhost:3000/comments?postId=${post_id}&_expand=user&_expand=post`, success: function(comments){
                        
                        let resultDat = '';
                        if (comments.length == 0){
                            $('.comment-body').html('')
                            $('.comment-body').append(`<div class="card card-body">
                            <p id="comment">No Comments yet</p>
                            </div>`)
                        }
                        else{
                            $('.comment-body').html('')
                            for (let i=0; i<comments.length; i++){                
                                        console.log(comments)
                                        if (user_id === comments[i].userId){
                                            resultDat += `<div class="card card-body">
                                            <h6 id="user-name">${comments[i].user === undefined ? "Anonymous": comments[i].user.name}</h6>
                                            <p id="comment">${comments[i].body}</p>
                                            <button data-target="#exampleModal">update</button>
                                            <button>delete</button>
                                            <span id="comment-date" class="text-muted">${comments[i].date_updated}</span>
                                            </div>`;
                                        }
                                        else{
                                            resultDat += `<div class="card card-body">
                                        <h6 id="user-name">${ comments[i].user === undefined ? "Anonymous": comments[i].user.name}</h6>
                                        <p id="comment">${comments[i].body}</p>
                                        <a style="display:inline!;" href="#" class="update" id="${comments[i].id}" data-toggle="modal" data-target="#exampleModalCenter">update</a>
                                        <span id="${comments[i].id}" class="delete_">delete</span>
                                        <span id="comment-date" class="text-muted">${comments[i].date_updated}</span>
                                        </div>`;
                                        }
                                        $('.comment-body').append(resultDat)
                                        console.log(resultDat);
                                        resultDat = '';
                            }
                        }
            
                    }
                })
                },
                method: 'PATCH',
                data:{
                    body:comment,
                    date_updated: today_date
                }
            })
        }
    })

    $(document).on('click','.delete_',function(e){
        console.log(e.target.id);
        $.ajax({
            url: `http://localhost:3000/comments/${e.target.id}`, success: function(){
                $.ajax({
                    url: `http://localhost:3000/comments?postId=${post_id}&_expand=user&_expand=post`, success: function(comments){
                        
                        let resultDat = '';
                        if (comments.length == 0){
                            $('.comment-body').html('')
                            $('.comment-body').append(`<div class="card card-body">
                            <p id="comment">No Comments yet</p>
                            </div>`)
                        }
                        else{
                            $('.comment-body').html('')
                            for (let i=0; i<comments.length; i++){                
                                        console.log(comments)
                                        if (user_id === comments[i].userId){
                                            resultDat += `<div class="card card-body">
                                            <h6 id="user-name">${comments[i].user === undefined ? "Anonymous": comments[i].user.name}</h6>
                                            <p id="comment">${comments[i].body}</p>
                                            <button data-target="#exampleModal">update</button>
                                            <button>delete</button>
                                            <span id="comment-date" class="text-muted">${comments[i].date_updated}</span>
                                            </div>`;
                                        }
                                        else{
                                            resultDat += `<div class="card card-body">
                                        <h6 id="user-name">${ comments[i].user === undefined ? "Anonymous": comments[i].user.name}</h6>
                                        <p id="comment">${comments[i].body}</p>
                                        <a style="display:inline!;" href="#" class="update" id="${comments[i].id}" data-toggle="modal" data-target="#exampleModalCenter">update</a>
                                        <span id="${comments[i].id}" class="delete_">delete</span>
                                        <span id="comment-date" class="text-muted">${comments[i].date_updated}</span>
                                        </div>`;
                                        }
                                        $('.comment-body').append(resultDat)
                                        console.log(resultDat);
                                        resultDat = '';
                            }
                        }
            
                    }
                })
            },
            method: 'DELETE'
        })
    })

    $(document).on('click','.delete_post',function(e){
        console.log(e.target.id);
        $.ajax({
            url: `http://localhost:3000/posts/${post_id}`, success: function(){
                window.location.href= "index.html";
            },
            method: 'DELETE'
        })
    })

    $('#comment-btn').click(function(){
        let today = new Date();
        let today_date = `${today.getDate().toLocaleString(undefined, {minimumIntegerDigits:2})}/${(today.getMonth()+1).toLocaleString(undefined, {minimumIntegerDigits:2})}/${today.getFullYear()}`;
        let newComment = $('#new-comment').val();
        $.ajax({
            url: `http://localhost:3000/comments`, success: function(res){
            console.log('res')
            $.ajax({
                url: `http://localhost:3000/comments?postId=${post_id}&_expand=user&_expand=post`, success: function(comments){
                    
                    let resultDat = '';
                    if (comments.length == 0){
                        $('.comment-body').html('')
                        $('.comment-body').append(`<div class="card card-body">
                        <p id="comment">No Comments yet</p>
                        </div>`)
                    }
                    else{
                        $('.comment-body').html('')
                        for (let i=0; i<comments.length; i++){                
                                    console.log(comments)
                                    if (user_id === comments[i].userId){
                                        resultDat += `<div class="card card-body">
                                        <h6 id="user-name">${comments[i].user === undefined ? "Anonymous": comments[i].user.name}</h6>
                                        <p id="comment">${comments[i].body}</p>
                                        <button data-target="#exampleModal">update</button>
                                        <button>delete</button>
                                        <span id="comment-date" class="text-muted">${comments[i].date_updated}</span>
                                        </div>`;
                                    }
                                    else{
                                        resultDat += `<div class="card card-body">
                                    <h6 id="user-name">${ comments[i].user === undefined ? "Anonymous": comments[i].user.name}</h6>
                                    <p id="comment">${comments[i].body}</p>
                                    <a style="display:inline!;" href="#" class="update" id="${comments[i].id}" data-toggle="modal" data-target="#exampleModalCenter">update</a>
                                    <span id="${comments[i].id}" class="delete_">delete</span>
                                    <span id="comment-date" class="text-muted">${comments[i].date_updated}</span>
                                    </div>`;
                                    }
                                    $('.comment-body').append(resultDat)
                                    console.log(resultDat);
                                    resultDat = '';
                        }
                    }
        
                }
            })
            },
            method:'POST',
            data: {
                body: newComment,
                postId: parseInt(post_id),
                userId: (user_id === null ? "" : parseInt(user_id)),
                date_created: today_date,
                date_updated: today_date
            }
        })
    })
    
    
})