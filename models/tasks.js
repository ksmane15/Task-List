var mongoose= require('mongoose');

var taskSchema= mongoose.Schema({
    title: String,
    isDone: Boolean
});

module.exports=mongoose.model('Task',taskSchema);