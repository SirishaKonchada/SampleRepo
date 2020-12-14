const Joi= require('@hapi/joi');
const exp = require('express');
const app = exp();

app.use(exp.json());

const courses=[
    {'id':1,name : 'one'},
    {'id':2,name :'two'},
    {'id':3,name : 'three'}
];

app.get('/', (req,res)=>{
  res.send('hello world');
});

app.get('/api/courses',(req,res)=>{
  res.send(courses);
});


app.post('/api/courses',(req,res)=>{
    const schema = Joi.object( {
     name : Joi.string().min(3).required()
    });

   // const result =Joi.validate(req.body,schema);
   const result = schema.validate(req.body);
    console.log(result);
    if(!req.body.name || req.body.name.length<3)
    {
    res.status(400).send('Name is required and its length should be greater than 3');
    return;
   }
    const course = {
        id:courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
});
app.get('/api/courses/:id',(req,res)=>{
   // res.send(req.params);
   const course = courses.find(c=> c.id===parseInt(req.params.id));
   if(!course)
    res.status(404).send('Course with given id not found');
    res.send(course);
});
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}`));

 