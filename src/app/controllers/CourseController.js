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
}

module.exports = new courseController();
