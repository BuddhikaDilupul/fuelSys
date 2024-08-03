exports.authorize = (roles)=> {
    return function(req, res, next) {
      console.log(req.role);
      
      if (roles.includes(req.role)) {
        console.log("awa");
        
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
  }
  