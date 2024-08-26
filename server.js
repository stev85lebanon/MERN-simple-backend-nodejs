const express = require('express')
const {createEmployee,Employee,CreateConnection, getUser,getUserById,userDelete}=require('./db')
const app = express()
var cors=require("cors")
app.use(express.json())
app.use(cors())

const port=3000


app.get('/users', async (req, res) =>{
const _find=await getUser({})
    const result=await getUser()
    if(result){
        res.send(result)
    }else{
        res.send("there are no user!!!!")
    }
})
app.get("/users/:id",async(req,res)=>{
const {id}=req.params
const result=await getUserById(id)
if(result){
 res.json(result)
}else{
    res.json({message:"bruger finder ikke"})
}
})
app.post('/users', async (req, res)=> {
const {name,age,department,isApproved}=req.body

const result= await createEmployee(
    name,
    age,
    department,
    isApproved)
res.send(result)
})
app.delete('/users/:id',async(req,res)=>{
    const _id=(req.params.id)
    const result= await userDelete(_id)
    res.send(result)
})
app.patch("/users/:id",async(req,res)=>{
    const {id}=req.params
    const employee= await Employee.findByIdAndUpdate({_id:id},req.body,{new:true})
res.send(employee)
})
app.listen(port,()=>{
    console.log(`the server is running on port :${port}`)
})