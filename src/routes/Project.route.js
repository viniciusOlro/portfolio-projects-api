const router = require('express').Router();

const ProjectController = require('../controllers/Project.controller');

router.get('/project', ProjectController.findAll);
router.post('/project', ProjectController.create);
router.patch('/project/:id', ProjectController.update);
router.delete('/project/:id', ProjectController.remove);

module.exports = router;