const admin = (req, res, next) => {
    // Debugging ke liye: Terminal mein dikhega ki user admin hai ya nahi
    console.log("Checking Admin Status for:", req.user ? req.user.email : "No User");
    console.log("Is Admin?:", req.user ? req.user.isAdmin : "Undefined");

    // 1. Check karein ki user login hai (req.user authMiddleware se aata hai)
    // 2. Check karein ki isAdmin ki value true hai
    if (req.user && req.user.isAdmin === true) {
        next(); // Agar admin hai toh aage badhne do
    } else {
        // Agar admin nahi hai toh ye error bhej do
        res.status(403).json({ 
            msg: "Access Denied: Aapke paas Admin powers nahi hain!" 
        });
    }
};

module.exports = admin;