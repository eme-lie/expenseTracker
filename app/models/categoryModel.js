const db = require("../services/db");

const getCategories = async () => {
  try {
    const rows = await db.query("SELECT * FROM Category");
    return rows;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const createCategory = async (category) => {
  try {
    const result = await db.query(
      "INSERT INTO Category (CategoryName) VALUES (?)",
      [category]
    );
    return result;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

async function getSingleCategory(id) {
  let sql = `SELECT * FROM Category WHERE CategoryID=?`;
  let category = await db.pool.query(sql, [id]);
  category = category[0][0];
  //console.log(category)

  return category;
}

module.exports = {
  getCategories,
  getSingleCategory,
  createCategory,
};
