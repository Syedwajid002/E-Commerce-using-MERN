const mongoose=require('mongoose');
const fs = require('fs');
const path = require('path');
// const { loaddata } = require('./Products');

mongoose.connect("mongodb://127.0.0.1:27017/Auth")
.then(()=>{
    console.log("Connected To MongoDB");
})

const userSchema=mongoose.Schema({
    name:String,
    Email:String,
    Password:String
})


// const loaddata = async () => {
//     console.log("aagaya products file tak")
//     try {
//         console.log(__dirname);
//         const filePath = path.join(__dirname, 'data.json');
//         const fileContent = fs.readFileSync(filePath, 'utf8');
//         const jsonData = JSON.parse(fileContent);

//         await ProductsModel.insertMany(jsonData);
//         console.log('Data inserted successfully');
//     } catch (err) {
//         console.error('Error inserting data:', err);
//     }
// };

module.exports =mongoose.model("userModel",userSchema)
