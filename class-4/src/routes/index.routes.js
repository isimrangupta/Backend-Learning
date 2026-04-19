const express = require("express")

const router = express.Router();


router.use((req,res,next) => {
    console.log("this middleware is router app and api")
    next()
})

router.get('/', (req,res) => {
    res.json('welcome to the cohort')
})

module.exports = router; 