const mysql = require('mysql2/promise');

const run = async () => {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'content_solution'
    });
    try {
        const sql = `UPDATE services_page_details d 
      SET d.slug = (SELECT s.slug FROM service_posts s WHERE s.title = d.title LIMIT 1)
      WHERE d.slug IS NULL`;
        const result = await conn.execute(sql);
        console.log('✅ Services updated with slugs');

        // Show updated services
        const [rows] = await conn.execute('SELECT id, title, slug FROM services_page_details WHERE slug IS NOT NULL');
        console.log('\nUpdated services:');
        rows.forEach(r => console.log(`  - ${r.title}: ${r.slug}`));
    } catch (e) {
        console.error('Error:', e.message);
    }
    finally {
        await conn.end();
    }
};

run();
