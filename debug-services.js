const mysql = require('mysql2/promise');

const runQuery = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'content_solution'
    });

    try {
        const [rows] = await connection.execute('SELECT id, `key`, slug, title FROM services_page_details LIMIT 5');
        console.log('Services Details:');
        console.log(JSON.stringify(rows, null, 2));

        const [posts] = await connection.execute('SELECT id, slug, title FROM service_posts LIMIT 5');
        console.log('\nService Posts:');
        console.log(JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await connection.end();
    }
};

runQuery();
