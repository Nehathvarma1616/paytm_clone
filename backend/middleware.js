const { JWT_SECRET } = require("../backend/config");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = auth.split(" ")[1];
  // console.log("2");
  console.log(token);
  try {
    const decoder = jwt.verify(token, JWT_SECRET);
    console.log(decoder);
    req.userId = decoder.userId;
    console.log(decoder.userId);
    next();
  } catch (err) {
    return res.status(403).json({});
  }
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgwOTA2MDJ9.fZqMFiqhmJL8CfC8eFgwsV2b_3oPFgrZvsQJJcfW7Z8
module.exports = authMiddleware;
// always export middleware as shown above
// if u export in { authmiddleware } as object
// then it throws error
// as [Object object] if whereever u use
// this as a precheck middleware at particular function
