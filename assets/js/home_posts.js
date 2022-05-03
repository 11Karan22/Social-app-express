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
                     let newPost=newPostDom(data.data.post);
                     $('#post-list-container>ul').prepend(newPost);
                    },
                    error:function(err)
                    {
                        console.log(err.responseText);
                    }
                }
            )
        })
    }
    //method to create a post in DOM
    let newPostDom=function(post)//upar walle function mai call kiya hai vahan se aa raha form ka data
    {
        return $(`<li id="post-${post._id}">
      
        <small>
            <a class="delete-post-button" href="/posts/destroy/<%=post.id%>">deleteX</a>
        </small>
    
        <p>${post.content}</p>
       <small>
       ${post.user.name}
       </small>                
       <br>
     <div class="post-comments">
       
            <form action="/comments/create" method="POST">
             <input  type="text" name="content" placeholder="type here to add post" required>
             <input  type="hidden" name="post" value="${ post._id }">
             <input type="submit" value="add comment">
            </form>
            
            <div class="post-comments-list">
               <ul id="post-comments-${post._id}">
                 
               </ul>
            </div>
       </div>
    </li>`)
    }
    createPost();
}