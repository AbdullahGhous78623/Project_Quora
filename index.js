const express=require("express");
const app=express()  // app is an object
const path=require("path")
let port =8080;
app.set("views",path.join(__dirname,"/views"))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname,"public")))
let posts=[
    {
    id:uuidv4(),
    username:"abdullah",
    content:"I love playing football",

    },
    {id:uuidv4(),username:"Farheen",
        content:"I like shopping"
    
        },
        {id:uuidv4(),username:"Aafreen",
            content:"I love my brothers"
        
            }
]
app.get("/posts",(req,res)=>{
    res.render("index",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new")
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})
app.get("/users/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{return id===p.id;
    }
    )
    console.log(post)
    res.render("show",{post})

})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{return id===p.id;
    })
    res.render("edit",{post})
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>{
        return p.id===id;
    })
    post.content=newContent;
    res.redirect("/posts")

})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id !=p.id)
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log("Port started")
})


