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
const base64 = require('base-64');
const sha256 = require("sha256");
const crypto = require('crypto');
const axios = require("axios");

const app = express();
const port = 5000;


const allowedOrigins = [
  "http://localhost:3000",
  "https://online-shop-two-gamma.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["POST", "GET"],
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  console.log("from /")
  res.json("hey bro from backend");
});

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

const GenerateTransactionID = () =>{
  const prefix = "MT";
  const rand = Date.now()*Math.random()
  return `${prefix}${rand}`;
}

app.post('/pay',(req,res)=>{
  try{
    const amount = req.body.amount;
    const mobile = req.body.mobile;
    const data = {
      "merchantId": "PGTESTPAYUAT86",
      "merchantTransactionId": GenerateTransactionID(),
      "merchantUserId": "MUID9EFW8E9F89EWF8C",
      "name":req.body.name,
      "amount": amount * 100,
      "redirectUrl": "https://webhook.site/redirect-url",
      "redirectMode": "REDIRECT",
      "callbackUrl": "https://webhook.site/callback-url",
      "mobileNumber": mobile,
      "paymentInstrument": {
        "type": "PAY_PAGE"
      }
    }
    
    const Payload = JSON.stringify(data);
    const Payload_main = Buffer.from(Payload).toString("base64");
    const INDEX = 1;
    const SALT = "96434309-7796-489d-8924-ab56988a6076";
    const string = Payload_main + "/pg/v1/pay"+SALT;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex")
    const checksum = sha256+"###"+INDEX;
    const dta = {
      method:"POST",
      url:"https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      headers:{
        accept:"application/json",
        "Content-Type":"application/json",
        "X-VERIFY":checksum
      },
      data:{
        request:Payload_main
      }
    }
    console.log(data);
    axios.request(dta).then(function response(resp){
      res.status(200).json({
        success:true,
        url:resp.data.data.instrumentResponse.redirectInfo.url
      });
    },function err(err){
      // console.log(err);
      res.status(500).json({
        success:false,
        message:err,
        Payload_main,
        checksum
      });
    })
  }catch(e){
    res.status(500).json({
      success:false,
      message:e.message
    });
  }
});


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
