const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const userModel = require('./models/user');
const Products = require('./models/Products');
const MyCart = require('./models/Cart');
const Login = require('./Routes/Login');
const ProductDetails = require('./Routes/ProductDetails');
const Signup = require('./Routes/Signup');
const SearchedQuery = require('./Routes/SearchResults');
const Logout = require('./Routes/Logout');

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getProducts', async (req, res) => {
  const result = await Products.find();
  res.json(result);
});

app.get('/getCart/:userId',async (req, res) => {
    const {userId}=req.params;
    // console.log("User Id aagayi :"+userId);
  const result = await MyCart.findOne({userId});
//   console.log(result);
  res.json(result);
});



app.post('/addtocart', async (req, res) => {
    console.log("from backend add to cart");
    const { productId, userId } = req.body;
    // console.log(userId);
    // console.log(productId);
    try {
      const product = await Products.findOne({ id: productId });
      if (product) {
        console.log(product.price);
        let cart = await MyCart.findOne({ userId: userId });
          if (!cart) {
            cart = new MyCart({
                userId: userId,
                items: [{
                    productId: product.id,
                    productTitle: product.title,
                    productImage: product.image,
                    productPrice: product.price
                }]
            });
        } else {
            cart.items.push({
                productId: product.id,
                productTitle: product.title,
                productImage: product.image,
                productPrice: product.price
            });
        }
        await cart.save();
        res.json(cart);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (err) {
      console.error("Error occurred while fetching product: ", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

app.get('/ProductsDetails/:id',ProductDetails);


app.post('/SearchResults',SearchedQuery);


app.post("/createUser",Signup);



app.post("/login", Login)


app.post('/logout', Logout);

app.post('/buynow',  (req, res) => {
    const { id } = req.body;
    console.log(id);
    res.status(201).json({
        message: "Product added to buylist"
    })
})


// const verifyuser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ Error: "You are not authenticated" })
//   } else {
//     jwt.verify(token, "hfjksdhfkhsdkfhksdfh", (err, decoded) => {
//       if (err) {
//         return res.json({ Error: "token wrong" })
//       }
//       else {
//         req.name = decoded.name;
//         next();
//       }
//     })
//   }

// }
// app.get('/', verifyuser, async (req, res) => {
//   return res.json({ Status: "Success", name: req.name })

// })


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


//i should be using middle wares to authenticate user when ever needede learn form harkirath week 3.1 middle ware lectures
