import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title : {type : String , required : true} ,
    content : { type : String, required : true},
    tag : {type : [String], default :[]},
    isPinned : {type : Boolean, default : false},
    userId : {type : String , required : true},
    createdOn : {type: Date , default : Date.now()}
})


const Note = mongoose.model("Note", NoteSchema);

export default Note;