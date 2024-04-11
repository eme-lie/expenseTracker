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

//Deleting a category
async function deleteCategory(id) {
  let sql = `DELETE FROM category WHERE CategoryID=?`;
  await db.pool.query(sql, [id]);
}

async function getSingleCategory(id) {
  let sql = `SELECT * FROM category WHERE CategoryID=?`;
  let category = await db.pool.query(sql, [id]);
  category = category[0][0];
  return category;
}

// 

async function updateCategory(id, newCategory) {
  try {
    let sql = `UPDATE Category SET `;
    let oldCategory = await getSingleCategory(id);
    oldCategory['Date'] = new Date(oldCategory['Date']).toISOString().slice(0, 10);

    let keys = [];
    let values = [];

    for (let key of Object.keys(newCategory)) {
      if (oldCategory[key] !== newCategory[key]) {
        keys.push(`${key} = ?`);
        values.push(newCategory[key]);
      }
    }

    if (keys.length === 0) {
      return;
    }

    sql += keys.join(', ');
    sql += ` WHERE CategoryID = ?;`;
    values.push(id);

    await db.pool.query(sql, values);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

module.exports = {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

