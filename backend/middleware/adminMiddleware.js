const admin = (req, res, next) => {
    console.log("Checking Admin Status for:", req.user ? req.user.email : "No User");
    console.log("Is Admin?:", req.user ? req.user.isAdmin : "Undefined");

    
    if (req.user && req.user.isAdmin === true) {
        next(); 
    } else {
       
        res.status(403).json({ 
            msg: "Access Denied: Aapke paas Admin powers nahi hain!" 
        });
    }
};

module.exports = admin;