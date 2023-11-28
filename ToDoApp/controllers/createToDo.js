const Todo = require('../models/Todo')

// define route handler
exports.createTodo = async(req, res) => { 
    try {
            // extract title and description from req.body
            const {title, description} = req.body
            // cretae a new Todo object and insert into DB 
            const response = await Todo.create({title,description})
            // send a json response with a success message/flag
            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:'Entry Created Successfully'
                }
            )
    }
    catch(err) {
            console.error(err)
            console.log(err)
            res.status(500).json(
                {
                    success:false,
                    data:'Internal Server Error',
                    message:err.message
                }
            )
    } 
}