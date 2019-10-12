const router=require('express').Router();
const Exercise=require('../models/exercise.model')

/*
Router in express will help us to route any requests that comes to /root_url/exercises/
to this get function
GET
*/
router.route('/').get((req,res)=>{
    Exercise.find()
    .then((exercises)=>{
        res.json(exercises);
    })
    .catch((err)=>{
        res.status(400).json('Error: '+err);
    })
})

//POST
router.route('/add').post((req,res)=>{
    const username=req.body.username;
    const description=req.body.description;
    const duration=Number(req.body.duration);
    const date=Date.parse(req.body.date);
    const newExercise=new Exercise({username,description,duration,date});

    newExercise.save()
    .then(()=>{
        console.log("Inside then of exercises add")
        res.json("Exercise Added");
    })
    .catch((err)=>{
        console.log("Inside catch of exercises add")
        res.status(400).json("Error: "+err);
    })
})

//GET a specific exercise with id value given after / 
//This is the object id that MongoDB gives to each document
router.route('/:id').get((req,res)=>{
    //req.params.id gets the value of id directly from url
    Exercise.findById(req.params.id)
    .then((exercise)=>{
        res.json(exercise);
    })
    .catch((err)=>{
        res.status(400).json('Error: '+err);
    })
})

//DELETE a specific exercise with id value given after / 
//This is the object id that MongoDB gives to each document
router.route('/:id').delete((req,res)=>{
    //req.params.id gets the value of id directly from url
    Exercise.findByIdAndDelete(req.params.id)
    .then((exercise)=>{
        res.json('Exercise deleted: '+exercise);
    })
    .catch((err)=>{
        res.status(400).json('Error: '+err);
    })
})

//UPDATE an exercise
//id is the object id that MongoDB gives to each document
router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
    .then((exercise)=>{
        exercise.username=req.body.username;
        exercise.description=req.body.description;
        exercise.duration=Number(req.body.duration);
        exercise.date=Date.parse(req.body.date);

        exercise.save().then(()=>{
            res.json('Exercise Updated');
        }).catch((err)=>{
            res.status(400).json('Unable to save with new data: '+err);
        })
    })
    .catch((err)=>{
        res.status(400).json('Unable to find the exercise with the given id '+err);
    })
})

module.exports=router;