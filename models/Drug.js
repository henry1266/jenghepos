const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  code: { type: String, unique: true },              // 貨號
  name: String,              // 商品名稱
  shortName: String,         // 商品簡稱
  gxRetailPrice: Number,     
  tmuhRetailPrice: Number,   
  cost: Number,              
  vendorCode: String,        
  barcode: String,           
  departmentCode: String,    
  taxType: Number,           
  priceCode: Number,         
  deductFromStock: Boolean,  
  status: Number,            
  memberPrice: Number,       
  employeePrice: Number,     
  costId: Number,            
  inventoryUnit: String,     
  purchaseUnit: String,      
  unitsPerBox: String,       
  costWithoutTax: Number,    
  note: String               
});

module.exports = mongoose.model('Drug', drugSchema);
