const User=require('../../models/user');
{
    //method with ajax 
    let createPost=function()
    {
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e)
        {
            e.preventDefault();
            $.ajax(
                {
                    type:'post',
                    url:'/posts/createPost',
                    data:newPostForm.serialize(),
                    success:function(data)
                    {
                      console.log(data);
                     let newPost=newPostDom(data.data.post);
                     $('#post-list-container>ul').prepend(newPost);
                     deletePost($(' .delete-post-button',newPost));//delete task
                    },
                    error:function(err)
                    {
                        console.log(err.responseText);
                    }
                }
            )
        });
    }
    //method to create a post in DOM
    let newPostDom=function(post)//upar walle function mai call kiya hai vahan se aa raha form ka data
    {
        
    User.findById(post.user,function(err,data)//different method bhi ho skta hai par abhi ke liye user function ko bulakar hi chala diya
    {
        return $(`
        <li id="post-${post._id}">
      
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">deleteX</a>
        </small>
    
        <p>${post.content}</p>
       <small>
       ${data.name}
       </small>                
       

       <br>
     <div class="post-comments">
       
            <form action="/comments/create" method="POST">
             <input  type="text" name="content" placeholder="type here to add post" required>
             <input  type="hidden" name="post" value="${post._id}">
             <input type="submit" value="add comment">
            </form>
            
            <div class="post-comments-list">
               <ul id="post-comments-${post._id}">
                 
               </ul>
            </div>
       </div>
    </li>`)
})
    }

    let deletePost=function(deleteLink)//we will provide in it's function call
    {
    $(deleteLink).click(function(e)
    {
        e.preventDefault();
        $.ajax(
            {
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data)//let's assume we will get this data server will automatically tell us
                {
                  $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error)
                {
                    console.log(error.responseText);
                }
            }
        )
    })
    }
    createPost();
}