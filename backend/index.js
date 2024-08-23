const express = require('express')
const app = express()
const port = 8000;
const mongoose = require('mongoose')
const TaskSchema = require('./model')
const cors = require('cors')

app.use(cors({origin: "*"
    
}))

app.use(express.json())

mongoose.connect('mongodb+srv://todo:todo@todo.yecrg.mongodb.net/').then(
    () =>{console.log("db connected");}
).catch(err => {console.log(err);})

app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo : todo
        });
        await newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.get('/taskList', async (req, res) =>{
    try {
       return res.json(await TaskSchema.find()) 
    } catch (error) {
        console.log(error);
    }
    
})

app.delete('/delete/:id', async (req, res) =>{
    try {
      await TaskSchema.findByIdAndDelete(req.params.id)
      return res.json(await TaskSchema.find())
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {console.log('Server started');})