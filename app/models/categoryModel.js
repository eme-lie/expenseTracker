const db = require('../services/db');

const getCategories = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM Category');
    return rows;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

async function getSingleCategory(id) {
  let sql = `SELECT * FROM Category WHERE CategoryID=?`
  let category = await db.pool.query(sql, [id])
  category = category[0][0]
  //console.log(category)

  return category
}

module.exports = {
  getCategories,
  getSingleCategory,
  
};
