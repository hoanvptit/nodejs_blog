const { mongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class courseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(
                (course) =>
                    res.render('courses/show', {
                        course: mongooseToObject(course),
                    }),
                // res.send(course)
            )
            .catch(next);
        // res.send(req.params.slug)
    }
    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }
    //[POST] /courses/store
    store(req, res, next) {
        const course = new Course(req.body);
        course.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        course
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch((error) => {});
    }

    //[PUT] /courses/:id
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //[] /courses/:id/edit
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }
}

module.exports = new courseController();
