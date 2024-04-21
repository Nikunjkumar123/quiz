const express = require('express')
const router = express.Router()
const path = require('path')
const Question = require('./models/Question') 

router.get('/', (req, res) => {
    const filePath = path.resolve('src/views', 'home.html'); 
    res.sendFile(filePath)
})

// get all quiz questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();

        // Set custom headers
        res.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/html'
        });

        // Render EJS file with custom headers
        const filePath = path.resolve('src/views', 'question.ejs');
        return res.render(filePath, { questions });
    } catch (error) {
        return res.status(500).json({ "error": error });
    }
});

// get one quiz question
router.get('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one quiz question
router.post('/questions', async (req, res) => {
    try {
        const  description  = req.body.description;
        const  alternatives  = req.body.alternatives

        const question = await Question.create({
            description,
            alternatives
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})


// update one quiz question
router.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { description, alternatives } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives
            })    
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// this one is just a test
router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})


module.exports = router