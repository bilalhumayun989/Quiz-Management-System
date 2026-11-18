const { pool } = require('../config/db');

function mapUser(row) {
  if (!row) return null;
  return {
    _id: String(row.id),
    name: row.name,
    email: row.email,
    password: row.password,
    phone: row.phone,
    location: row.location,
    image: row.image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const User = {
  async findOne({ email }) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
    return mapUser(rows[0]);
  },

  async create({ name, email, password }) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, LOWER($2), $3) RETURNING *',
      [name.trim(), email, password]
    );
    return mapUser(rows[0]);
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
    return mapUser(rows[0]);
  },

  async updateById(id, updates) {
    const fields = { name: 'name', phone: 'phone', location: 'location', password: 'password', image: 'image' };
    const assignments = [];
    const values = [];
    for (const [key, column] of Object.entries(fields)) {
      if (updates[key] !== undefined) {
        values.push(updates[key]);
        assignments.push(`${column} = $${values.length}`);
      }
    }
    if (assignments.length === 0) return this.findById(id);
    values.push(id);
    const { rows } = await pool.query(
      `UPDATE users SET ${assignments.join(', ')}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
      values
    );
    return mapUser(rows[0]);
  },
};

module.exports = User;
