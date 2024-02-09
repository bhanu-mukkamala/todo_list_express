const express = require("express");
const app= express();

app.use(express.json());
let todo=[{
  id:1,
  title:"College work",
  description:"Finish off college work"
},
{id:2,
  title:"Practice driving",
  description:"Go for a long drive and practice driving"

}];
//http get method to retrive all the to-do items
app.get("/todos",(req,res)=>{
  res.status(200).json({
    todos:todo
  })
})
//http get method to get a specific to-do using it's id
app.get("/todos/:id",(req,res)=>{
  let id= req.params.id;
  let todoItem=todo.find((ele)=>{
    return ele.id==id;
  })
  if(todoItem){
    return res.status(200).json({
      todo: todoItem
    })
  }
  res.status(404).json({
    msg:"Item not found"
  })
})
//topost data on the serever, like adding a new todo item to the existing list
app.post("/todos",(req,res)=>
{
  let newTodo={
    id: Math.floor(Math.random() * 100000),
    title : req.body.title,
    description: req.body.description
  }
  todo.push(newTodo);
  res.status(201).json({
    todoId: newTodo.id
  })

});
//to update a todo item on  the list, we use the put method
app.put("/todos/:id",(req,res) =>{
  id=parseInt(req.params.id);
   let indexToUpdate = todo.findIndex((ele)=>{
    return ele.id === id;
   })
  if(indexToUpdate>=0){
     todo[indexToUpdate]={
      title : req.body.title,
      description: req.body.description
    }
    res.status(200).json({
      msg:"Update successful"
    })
  }
  else{
    res.status(404).json({
      msg:"Todo not found"
    })
  }
});
//deletes a specific todo item by it's id
 app.delete("/todos/:id",(req,res) =>{
  id= parseInt(req.params.id);
  deletetodoId= todo.findIndex((ele)=>{
    return ele.id===id
  })
  if(deletetodoId>=0){
    todo.splice(deletetodoId,1);
    res.status(200).json({
      msg:"Deletion success"
    })
  }
  else{
    res.status(404).json({
      msg:"Todo item not found"
    })
  }
 });


app.listen(3000,()=>{
  console.log("good lord your server's running");
})

