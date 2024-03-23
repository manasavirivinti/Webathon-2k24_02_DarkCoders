const validinfo = (req,res,next) =>{
    const {user_name,user_email,user_password}= req.body;
    function validEmail(user_email)
        {
            
            return   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(user_email);
        }

    if (req.path === "/register")
    {
        if(![user_name,user_email,user_password].every(Boolean))
        {
            return res.json("missing credentials!");
        }
        else if(!validEmail(user_email))
        {
            return res.json("invalid credentials!");
        }
    }
    else if (req.path === "/login")
    {
        if(![user_email,user_password].every(Boolean))
        {
            return res.json("missing credentials!");
        }
        else if(!validEmail(user_email))
        {
            return res.json("invalid credentials!");    
        }
    }
    
    next();
}

module.exports = validinfo;
