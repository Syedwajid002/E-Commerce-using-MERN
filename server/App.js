const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const Products = require('./models/Products')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.get('/getProducts', async (req, res) => {
  const result = await Products.find();
  res.json(result);
});



app.post('/addtocart', async (req, res) => {
  const { id } = req.body;
  // console.log("From cart " + id);

  try {
      const result = await Products.findOne({ id: id });
      if (result) {
          // console.log("From cart 2", result);
          res.json(result);
      } else {
          res.status(404).json({ error: "Product not found" });
      }
  } catch (err) {
      console.error("Error occurred while fetching product: ", err);
      res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/ProductsDetails/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Products.findOne({ id: id });
  res.json({ result });
});


app.post('/SearchResults', async (req, res) => {
  const { query } = req.body;
  console.log(query + "fhksjfk")
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const results = await Products.find()
  const searcheddata = results.filter(item => item.category.toLowerCase().includes(query))
  res.json({ result: searcheddata });
});


app.post("/createUser", async (req, res) => {
  const { fullName, Email, Password } = req.body;
  let user = await userModel.findOne({ Email });
  if (user) return res.status(404).json({
    success: false,
    message: "User already exist"
  })
  const hashedpassword = await bcrypt.hash(Password, 10)
  // console.log(hashedpassword)
  user = await userModel.create({
    name: fullName,
    Email: Email,
    Password: hashedpassword
  })
  res.status(200).json({
    sucess: true,
    message: "User created Successfully"
  })
})



app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await userModel.findOne({ Email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(Password, user.Password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    let token1 = jwt.sign({ name: user.name }, "hfjksdhfkhsdkfhksdfh");
    res.status(201).cookie("token", token1, {
      httpOnly: true,
      maxAge: 1 * 60 * 1000,
    }).json({
      success: true,
      message:"Login Successfull",
      username:user.name
    });

  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }

});
const verifyuser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" })
  } else {
    jwt.verify(token, "hfjksdhfkhsdkfhksdfh", (err, decoded) => {
      if (err) {
        return res.json({ Error: "token wrong" })
      }
      else {
        req.name = decoded.name;
        next();
      }
    })
  }

}
app.get('/', verifyuser, async (req, res) => {
  return res.json({ Status: "Success", name: req.name })

})

app.post('/logout', async (req, res) => {
  console.log("logout")
  res.clearCookie('token');
  return res.json({ message: 'Logout successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
