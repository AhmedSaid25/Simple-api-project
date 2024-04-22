const express = require('express');
const { body} = require('express-validator');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { validationSchema } = require('../middlewares/validationSchema');

router.route('/')
    .get( courseController.getAllCourses)
    .post(validationSchema(),courseController.AddCourse)

router.route('/:courseId')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deletecourse);

module.exports = router