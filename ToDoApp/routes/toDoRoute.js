const express = require('express')
const router = express.Router()
const {createToDo, getToDos, getToDoById, updateToDo, deleteToDo} = require('../controllers/toDoController')

// define API routes
router.route('/createToDo').post(createToDo)

router.route('/getToDos').get(getToDos)

router.route('/getToDo/:id').get(getToDoById)

router.route('/updateToDo/:id').put(updateToDo)

router.route('/deleteToDo/:id').delete(deleteToDo)

module.exports = router