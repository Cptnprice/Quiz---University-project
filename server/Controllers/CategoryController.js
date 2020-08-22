var categoryModel = require("../models/Category");

addNewCategory = (req, res) => {
    var newCategory = new categoryModel({
        title : req.body.title
      });
      newCategory.save();
      res.send(newCategory);
};

deleteCategory = (req, res) => {
    categoryModel.deleteOne({_id : req.body.id}, function(err){
        if (err){
          console.log(err);
        }
      })
      res.sendStatus(200);
};

editCategory = (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    categoryModel.updateOne({_id : id}, {title : title}, function(err,res){
        if (err){
        console.log(err);
        }
    })
    res.sendStatus(200);
};

getCategories = (req, res) => {
    categoryModel.find({}, function(err, categories){
        if (err){
          console.log(err);
        }
        else{
          res.json(categories);
        }
      });
};

module.exports = {addNewCategory, deleteCategory, editCategory, getCategories};