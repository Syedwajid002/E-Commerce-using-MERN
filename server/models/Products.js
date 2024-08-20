const fs = require('fs');
const path = require('path');
const mongoose=require('mongoose');

const ProductsSchema=mongoose.Schema({
    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    rating:{
        rate:Number,
        count:Number
    } 
})
module.exports=mongoose.model("Products",ProductsSchema)
// const ProductsModel=mongoose.model('Products', ProductsSchema);
// const loaddata = async () => {
//     c`onsole.log("aagaya products file");
//     try { 
//         const filePath = path.join(__dirname, 'data.json');
//         const fileContent = fs.readFileSync(filePath, 'utf8');
//         const jsonData = JSON.parse(fileContent);

//         await ProductsModel.insertMany(jsonData);
//         console.log('Data inserted successfully');
//     } catch (err) {
//         console.error('Error inserting data:', err);
//     }
// };


// module.exports = {loaddata};
