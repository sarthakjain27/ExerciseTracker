const router=require('express').Router();
const User=require('../models/user.model')

/*
Router in express will help us to route any requests that comes to /root_url/users/
to this get function
*/
router.route('/').get((req,res)=>{
    User.find()
    .then((users)=>{
        res.json(users);
    })
    .catch((err)=>{
        res.status(400).json('Error: '+err);
    })
})

//Add a new User
router.route('/add').post((req,res)=>{
    const username=req.body.username
    const newUser=new User({username});

    newUser.save()
    .then(()=>{
        res.json("User Added");
    })
    .catch((err)=>{
        res.status(400).json("Error: "+err);
    })
})

//GET a user with id parameter passed in url
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then((user)=>{
        res.json(user);
    }).catch((err)=>{
        res.status(400).json('Error in getting the user with that id: '+err);
    })
})

//DELETE a user with id parameter passed in url
router.route('/:id').delete((req,res)=>{
    console.log(req.params.id);
    User.findByIdAndDelete(req.params.id)
    .then((user)=>{
        res.json(user);
    }).catch((err)=>{
        res.status(400).json('Error in deleting the user: '+err);
    })
})

//UPDATE a user details
router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id).then((user)=>{
        user.username=req.body.username;

        user.save().then(()=>{
            res.json('User details updated');
        }).catch((err)=>{
            res.status(400).json('Unable to update user details: '+err);
        })
    }).catch((err)=>{
        res.status(400).json('Unable to find user: '+err);
    })
})

module.exports=router;