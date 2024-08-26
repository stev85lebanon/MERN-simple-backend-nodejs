const express = require('express')
const {createEmployee,Employee,CreateConnection, getUser,getUserById,userDelete}=require('./db')
const app = express()
var cors=require("cors")
 app.use(express.json())
app.use(cors())
// createEmployee("hadi",37,"accounting",true)

const port=3000
// const users=[
//     {id:1,name:"karim",country:"danmark"}
// ]

app.get('/users', async (req, res) =>{
//     // if(users.length==0){
//     //     res.status(401).send("der er ikke data")
//     //     return
//     // }
const _find=await getUser({})
    const result=await getUser()
    if(result){
        res.send(result)
    }else{
        res.send("there are no user!!!!")
    }
})
app.get("/users/:id",async(req,res)=>{
// const _id=(req.params.id)
const {id}=req.params
// const _id=parseInt(req.params.id)

const result=await getUserById(id)
// const findUser=users.find(x=>x.id===_id)
if(result){
 // res.json({result})
 res.json(result)
}else{
    res.json({message:"bruger finder ikke"})
}

})
app.post('/users', async (req, res)=> {
const {name,age,department,isApproved}=req.body

// const finduser=users.find((x)=>x.id===user.id)
// if(finduser){
//     res.status(400).send("user already exist")
//     return
// }


// users.push(user)
// console.log(user)
const result= await createEmployee(
    name,
    age,
    department,
    isApproved)
res.send(result)
// res.status(201).send('user created')
})

app.delete('/users/:id',async(req,res)=>{
    const _id=(req.params.id)
    // console.log(id)
    // const findindexuser=users.findIndex((x)=>x.id===_id)
    // if(findindexuser==-1){ 
    //     res.status(400).send("bruger finder ikke :")
    //     return
    // }
    // users.splice(findindexuser,1)
    const result= await userDelete(_id)
    res.send(result)
    // res.status(200).send("bruger er fjernet")
})
app.patch("/users/:id",async(req,res)=>{
    const {id}=req.params
    const employee= await Employee.findByIdAndUpdate({_id:id},req.body,{new:true})
    // console.log(employee)
res.send(employee)
})

app.listen(port,()=>{
    console.log(`the server is running on port :${port}`)
})