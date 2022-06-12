const queue=require('../config/kue');

const commentsMailer=require('../mailers/comments_mailer');

//every job needs a process function which tells what to do when new mail is comes in the queue
queue.process('emails',function(job,done){
    console.log('emails worker is processing data',job.data);
    commentsMailer.newComment(job.data);
    done();
})//pehle wala toh naam hai queue ka