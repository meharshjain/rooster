var middlewareObj = {};
middlewareObj.isLoggedIn= function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

middlewareObj.isAdmin= function(req,res,next)
{
	if(req.user.isAdmin == true)
	{
        return next();
	}else{
        res.redirect("/myaccount");
	}
}

middlewareObj.paid= function(req,res,next)
{
	if(req.user.paid == true)
	{
        return next();
	}else{
        res.redirect("/checkout");
	}
}

middlewareObj.IsEmailVerified= function(req,res,next)
{
	if(req.user.IsEmailVerified == false)
	{
        return next();
	}else{
        res.redirect("/myaccount");
	}
}

middlewareObj.IsSeller= function(req,res,next)
{
	if(req.user.IsSeller == "true")
	{
        return next();
	}else{
        res.redirect("/");
	}
}

module.exports=middlewareObj;