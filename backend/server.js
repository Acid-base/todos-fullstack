import express from 'express'

import 'dotenv/config'

import mongoConfig from './config.js'

import Todo from './models/TodoModel.js'

const app = express()

const port = 8080

app.get('/', (req, res) => {
    res.json('Hello! (from Server)')
})

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

app.listen(port, () => {
    console.log('Listening on port: ' + port)
    mongoConfig()
})