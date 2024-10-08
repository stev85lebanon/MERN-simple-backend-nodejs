const {Schema,connect,model} = require('mongoose');

const CreateConnection=()=>{
    connect('mongodb://127.0.0.1:27017/users')
    .then(() => console.log('Connected!'))
}

const employeeSchema= new Schema({
    name:{type:String},
    age:Number,
    department:String,
    date:{type:Date,default:Date.now},
    isApproved:Boolean
})
const Employee=model("users",employeeSchema)

const createEmployee=async(_name,_age,_department,_isApproved)=>{
   await CreateConnection()
    const muhammad= new Employee({
        name:_name,
        age:_age,
        department:_department,
        isApproved:_isApproved
    })
    const result=await muhammad.save() 
    return result
}
const getUser=async()=>{
    await CreateConnection()
    const employee=await Employee
    .find()//get
    // .find({age:{$gte:10}})
    // .sort({name:-1})//sorting
    // .select({name:1,age:1})//column that want to retrieve
    // .limit(2)//number that want to retrieve
    return employee
}
const getUserById=async(id)=>{
    await CreateConnection()

    const employee=await Employee.findById(id)
    return employee
}
const userUpdate=async(id)=>{
    const employee= await Employee.findByIdAndUpdate({_id:id},req.body,{new:true})
    if(!employee){
        return console.log("employee not found")
    }else{
        employee.age=30
       result= await employee.save()
    }
    console.log(result)
}
const userDelete=async(id)=>{
    await CreateConnection()

    const employee= await Employee.findByIdAndDelete(id)
    return employee
    
}

module.exports={createEmployee,CreateConnection,getUser,getUserById,userDelete,Employee}
