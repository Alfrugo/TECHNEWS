const router = require('express').Router()
const { User } = require('../../models')

// GET /api/users  this gets all the users from the database
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({ 
        attributes: { exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// GET /api/users/1   Gets the user that corresponds to the ID we give it. 
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: 'No user found with this id' });
                return;                
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

// POST /api/users    Creates the user
router.post('/', (req, res) => {
    // Expects { useranme: ' alfrugo  ', email: 'alfrugo@alfrugo.com, password: 'thepa$$word123'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // Expects { useranme: ' alfrugo  ', email: 'alfrugo@alfrugo.com, password: 'thepa$$word123'}

    // if req.body has exact key/value pair to match the model, you can just use 'req.body' instead
    User.update(req.body, {
        id: req.params.id
    })

    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .cath(err => {
        console.log(err);
        res.status(500).json(err);
    })

})

// DELETE /api/uses/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.findAll
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})


module.exports = router;


// REST API documentation https://restfulapi.net/

