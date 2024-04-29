{%- if values.use_database === "custom" %}

const { Pool } = require('pg');
const pool = new Pool({
    user: "${{ values.database_user }}",
    password: "${{ values.database_password }}",
    host: "${{ values.database_host }}",
    port: "${{ values.database_port }}", 
    database: "${{ values.database_name }}"
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
  validateDatabase: async () => {
    try {
      const client = await pool.connect();
      client.release();
      return `Database connected `
    } catch (err) {
      return `Database error - ${err}`
    }
  }
};

{%- endif %}
