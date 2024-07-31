exports.authorize = (roles)=> {
    return function(req, res, next) {
      console.log(roles,req.role);
      if (roles.includes(req.role)) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
  }
  