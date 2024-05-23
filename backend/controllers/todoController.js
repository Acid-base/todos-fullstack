import Todo from '../models/TodoModel'

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
}

export default {
    getTodos
}