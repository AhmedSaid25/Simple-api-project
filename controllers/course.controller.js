
const { validationResult} = require('express-validator');
const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText');


const getAllCourses = async(req,res) =>{

    const courses = await Course.find();
    res.json({status : httpStatusText.SUCCESS , data : {courses}});
}

const getCourse =  async(req,res)=>{
    try{
        const course =await Course.findById(req.params.courseId);
        if(!course){
            return res.status(404).json({status : httpStatusText.FAIL , data : {course : null}});
        }
        res.json({status : httpStatusText.SUCCESS , data : {course}});
    }
    catch(err){
        return res.status(400).json({status : httpStatusText.ERROR , data :null , message : err.message , code : 400});
    }
    
}

const AddCourse = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({status : httpStatusText.FAIL , data : errors.array()});
    }
    const newcourse = new Course(req.body);
    await newcourse.save();
    res.status(201).json({status : httpStatusText.SUCCESS , data : {course : newcourse}});
}

const updateCourse = async(req , res) =>{
    const courseId = req.params.courseId ; 
    try{
        const updatedcourse = await Course.updateOne({_id:courseId} , {$set : {...req.body}})
        res.status(200).json({status : httpStatusText.SUCCESS , data : {course : updatedcourse}});
    }
    catch(e){
        res.status(400).json({status : httpStatusText.ERROR , message : e.message});
    }
   
}

const deletecourse =async (req , res) =>{
    await Course.deleteOne({_id: req.params.courseId});
    res.status(200).json({status : httpStatusText.SUCCESS  ,data : null});
}

module.exports = {
    getAllCourses,
    getCourse,
    updateCourse ,
    AddCourse,
    deletecourse
}