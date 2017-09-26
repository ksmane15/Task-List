var express= require('express');
var router= express.Router();
var mongoose=require('mongoose');
var Task=require('../models/tasks');
//find all
router.get('/tasks',function(req,res,next){
    Task.find({}, function(err,tasks){
            if(err){
                console.log(err);
            }   else{
              //  res.render('tasks',{tasks:tasks});
              res.json(tasks);
            }
    });
});
//get one Task
router.get('/tasks/:id',function(req,res,next){
    Task.findById(req.params.id,function(err,task){
            res.json(task);
    });
});

//Insert Task

router.post('/tasks',function(req,res,next){
    var task=req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    Task.create(task,function(err,task,next){
        if(err){
            res.send(err);
        }   else {
            res.json(task);
        }
    })

});

//Delete
router.delete('/tasks/:id',function(req,res,next){
    Task.findByIdAndRemove(req.params.id,function(err,task){
        if(err){
            res.send(err);
        }   else {
            res.json(task);
        }
    });
});

//Update
router.put('/tasks/:id',function(req,res,next){
    var oldtask=req.body;
    var updtask={};
    if(oldtask.isDone){
        updtask.isDone = oldtask.isDone;
    }
    if(oldtask.title){
        updtask.title=oldtask.title;
    }
    if(!updtask){
        res.send("Bad Data");
    }   else {
        Task.findByIdAndUpdate(req.params.id,updtask,function(err,task){
            if(err){
                res.send(err);
            }   else {
                res.json(task);
            }
        });
    }
   
});


module.exports=router;