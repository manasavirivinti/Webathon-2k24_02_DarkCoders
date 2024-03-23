const router = require("express").Router();
const pool = require("../db")
const authorisation = require("../middleware/authorisation");

router.get("/",authorisation,async(req,res)=>{
    try {
        // res.json(req.user_name);
        const user = await pool.query(
            "SELECT user_name FROM authorise WHERE id = $1",
            [req.user]
        );
        res.json(user.rows[0])
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports =router;