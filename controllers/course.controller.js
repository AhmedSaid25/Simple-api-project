
const { validationResult} = require('express-validator');
const Course = require('../models/course.model');

const getAllCourses = async(req,res) =>{

    const courses = await Course.find();
    res.json(courses);
}

const getCourse =  async(req,res)=>{
    try{
        const course =await Course.findById(req.params.courseId);
        if(!course){
            return res.status(404).json({msg : "course not found"});
        }
        res.json(course);
    }
    catch(err){
        return res.status(400).json({msg: "Invalid Object ID"});
    }
    
}

const AddCourse = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const newcourse = new Course(req.body);
    await newcourse.save();
    res.status(201).json(newcourse);
}

const updateCourse = async(req , res) =>{
    const courseId = req.params.courseId ; 
    try{
        const updatedcourse = await Course.updateOne({_id:courseId} , {$set : {...req.body}})
        res.status(200).json(updatedcourse);
    }
    catch(e){
        res.status(400).json({error : e});
    }
   
}

const deletecourse =async (req , res) =>{
    const data = await Course.deleteOne({_id: req.params.courseId});
    res.status(200).json({success : true , msg : data});
}

module.exports = {
    getAllCourses,
    getCourse,
    updateCourse ,
    AddCourse,
    deletecourse
}