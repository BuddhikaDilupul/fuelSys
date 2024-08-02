exports.authorize = (roles)=> {
    return function(req, res, next) {
      if (roles.includes(req.role)) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }
  }
  