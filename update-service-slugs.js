const mysql = require('mysql2/promise');

const updateExistingServices = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'content_solution'
    });

    try {
        // Get all service details
        const [details] = await connection.execute('SELECT id, `key`, title FROM services_page_details');

        console.log(`Found ${details.length} services to update`);

        for (const detail of details) {
            // Try to find matching service post by key or title
            const [posts] = await connection.execute(
                'SELECT slug FROM service_posts WHERE `key` = ? OR title = ? LIMIT 1',
                [detail.key, detail.title]
            );

            if (posts.length > 0) {
                const slug = posts[0].slug;
                // Update the service detail with the slug
                await connection.execute(
                    'UPDATE services_page_details SET slug = ? WHERE id = ?',
                    [slug, detail.id]
                );
                console.log(`✓ Updated service ${detail.id} (${detail.title}) with slug: ${slug}`);
            } else {
                console.log(`⚠ No matching post found for service ${detail.id} (${detail.title})`);
            }
        }

        console.log('\n✅ All services updated successfully!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.end();
    }
};

updateExistingServices();
