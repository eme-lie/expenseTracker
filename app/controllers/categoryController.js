const express = require("express");
const categoryModel = require("../models/categoryModel");
const transactionModel = require("../models/transactionModel");

const router = express.Router();

// Reading categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await categoryModel.getCategories();
    res.render("categories", { title: "Category List", categories });
  } catch (err) {
    next(err);
  }
});

// Creating a category
router.get("/create", async (req, res, next) => {
  res.render("Category_form", { title: "Create a Category" });
});

router.post("/create", async (req, res, next) => {
  console.log(req.body);
  await categoryModel.createCategory(req.body.categoryName);
  res.redirect("/categories");
});

// Updating a category
router.get("/:id/update", async (req, res, next) => {
  const category = await categoryModel.getSingleCategory(req.params.id);

  res.render("Category_form", {
    title: `Update Category: ${category.CategoryName}`,
    category,
  });
});

router.post("/:id/update", async (req, res, next) => {
  try {
    const category = await categoryModel.getSingleCategory(req.params.id);
    console.log(req.body);
    const newCategoryName = req.body.categoryName;
    await categoryModel.updateCategory(req.params.id, newCategoryName);
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
});

// Deleting a category
router.get('/:id/delete', async (req, res, next) => {
  const category = await categoryModel.getSingleCategory(req.params.id)
  const transactions = await transactionModel.getTransactionsbyCategory(req.params.id)
  
  res.render("delete_category", { 
    title: `Delete Category: ${category.CategoryName}`,
    category,
    transactions
  })
})

router.post('/:id/delete', async (req, res) => {
  await categoryModel.deleteCategory(req.params.id)
  res.redirect('/categories')
});

module.exports = router
