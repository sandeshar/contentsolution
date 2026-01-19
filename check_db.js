import mongoose from 'mongoose';
import dbConnect from './src/lib/mongodb.js';
import Status from './src/models/Status.js';
import BlogPost from './src/models/BlogPost.js';
import { HomepageHero } from './src/models/Homepage.js';

async function check() {
    try {
        console.log('Connecting to database...');
        await dbConnect();
        console.log('Connected.');

        const statuses = await Status.find({});
        console.log('Statuses count:', statuses.length);
        statuses.forEach(s => console.log(` - ${s.name} (${s._id})`));

        const blogCount = await BlogPost.countDocuments();
        console.log('BlogPosts count:', blogCount);

        const heroes = await HomepageHero.find({});
        console.log('Homepage Heroes count:', heroes.length);
        heroes.forEach(h => console.log(` - ${h.title} (is_active: ${h.is_active})`));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit(0);
    }
}

check();
