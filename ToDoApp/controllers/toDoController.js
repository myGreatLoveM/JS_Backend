const ToDo = require('../models/TodoModel')

// define route handler
exports.createToDo = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || !description) {
      throw new Error('Every field is mandatory !')
    }
    const response = await ToDo.create({ title, description })
    console.log('New Entry created in db => ', response)
    res.status(200).json({
      success: true,
      data: response,
      msg: 'New entry created successfully',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    })
  }
}

exports.getToDos = async (req, res) => {
  try {
    const todos = await ToDo.find()
    console.log('Here are all your todos => ',todos)
    res.status(200).json({
      success: true,
      data: todos,
      message: 'Here are all todos',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    })
  }
}

exports.getToDoById = async (req, res) => {
  try {
    const id = req.params.body
    const todo = await ToDo.findById({_id: id})
    if (!todo) {
      res.status(404).json({
        success: false,
        data: null,
        message: 'No ToDo found with given id' 
      })
    }  
    console.log('Here is your asked todo => ', todo)
    res.status(200).json({
      success: true,
      data: todo,
      message: 'Here is your asked todo found'
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    })
  }
}

exports.updateToDo = async (req, res) => {
  try {
    const id = req.params.id
    const {title, description} = req.body
    const updatedtodo = await ToDo.findByIdAndUpdate({_id: id}, { title, description },{timestamp: true})
    console.log(`Your todo has been updated to => ${updatedtodo}`)
    res.status(200).json({
      success: true,
      data: updatedtodo,
      message: `Updated todo for ${id}`
    })
  } catch (err) { 
    console.log(err)
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    })
  }
}

exports.deleteToDo = async (req, res) => {
  try{
    const id = req.params.id
    const deleteToDo = await ToDo.findByIdAndDelete({_id: id})
    console.log('todo has been deleted successfully => ', deleteToDo)
    res.status(200).json({
      success: true,
      data: deleteToDo,
      message: 'todo has been deleted successfully'
    })
  }
  catch(err){
    console.log(err)
    res.status(500).json({
      success: false,
      data: null,
      message: err.message,
    })
  }
}

