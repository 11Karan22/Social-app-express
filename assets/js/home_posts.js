// const User=require('../../models/user');
// {
//     //method with ajax 
//     let createPost=function()
//     {
//         let newPostForm=$('#new-post-form');
//         newPostForm.submit(function(e)
//         {
//             e.preventDefault();
//             $.ajax(
//                 {
//                     type:'post',
//                     url:'/posts/createPost',
//                     data:newPostForm.serialize(),
//                     success:function(data)
//                     {
//                       console.log(data);
//                      let newPost=newPostDom(data.data.post);
//                      $('#post-list-container>ul').prepend(newPost);
//                      deletePost($(' .delete-post-button',newPost));//delete task
//                     },
//                     error:function(err)
//                     {
//                         console.log(err.responseText);
//                     }
//                 }
//             )
//         });
//     }
//     //method to create a post in DOM
//     let newPostDom=function(post)//upar walle function mai call kiya hai vahan se aa raha form ka data
//     {
//         return $(`
//         <li id="post-${post._id}">
      
//         <small>
//             <a class="delete-post-button" href="/posts/destroy/${post._id}">deleteX</a>
//         </small>
    
//         <p>${post.content}</p>
//        <small>
//        ${post.user.name}
//        </small>                
       

//        <br>
//      <div class="post-comments">
       
//             <form action="/comments/create" method="POST" id="post-${ post._id }-comments-form">
//              <input  type="text" name="content" placeholder="type here to add post" required>
//              <input  type="hidden" name="post" value="${post._id}">
//              <input type="submit" value="add comment">
//             </form>
            
//             <div class="post-comments-list">
//                <ul id="post-comments-${post._id}">
                 
//                </ul>
//             </div>
//        </div>
//     </li>`)
//     }
//     let deletePost=function(deleteLink)//we will provide in it's function call
//     {
//     $(deleteLink).click(function(e)
//     {
//         e.preventDefault();
//         $.ajax(
//             {
//                 type:'get',
//                 url:$(deleteLink).prop('href'),
//                 success:function(data)//let's assume we will get this data server will automatically tell us
//                 {
//                   $(`#post-${data.data.post_id}`).remove();
//                 },
//                 error:function(error)
//                 {
//                     console.log(error.responseText);
//                 }
//             }
//         )
//     })
//     }
//     createPost();
// }
{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/createPost',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}