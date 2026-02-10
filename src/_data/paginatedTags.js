const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');
const matter = require('gray-matter');

module.exports = async function () {
    const postsDir = path.join(__dirname, '../posts/*.md');
    const files = await glob(postsDir);

    const postsByTag = {};

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const parsed = matter(content);
        const data = parsed.data;

        // Create a minimal post object needed for rendering listings
        const postObj = {
            url: `/posts/${path.basename(file, '.md')}/`,
            date: data.date,
            data: {
                title: data.title,
                image: data.image,
                category: data.category,
                author: data.author,
                description: data.description
            }
        };

        if (data.tags) {
            // Tags can be a string (JSON stringified array from our dummy generator) or array
            let tags = data.tags;
            if (typeof tags === 'string') {
                try {
                    tags = JSON.parse(tags);
                } catch (e) {
                    tags = [tags];
                }
            }

            if (Array.isArray(tags)) {
                tags.forEach(tag => {
                    if (!["post", "all", "popular"].includes(tag)) {
                        if (!postsByTag[tag]) postsByTag[tag] = [];
                        postsByTag[tag].push(postObj);
                    }
                });
            }
        }
    });

    const paginationSize = 6;
    const paginatedPages = [];

    for (const tagName in postsByTag) {
        // Sort by date descending (simple string compare for ISO dates works)
        const posts = postsByTag[tagName].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        const totalPages = Math.ceil(posts.length / paginationSize);

        for (let i = 0; i < totalPages; i++) {
            // Prepare next/prev links
            let prev = null;
            if (i > 0) prev = (i === 1) ? `/kategori/${tagName}/` : `/kategori/${tagName}/${i + 1}/`;

            let next = null;
            if (i < totalPages - 1) next = `/kategori/${tagName}/${i + 2}/`;

            paginatedPages.push({
                tagName: tagName,
                rawTagName: tagName,
                posts: posts.slice(i * paginationSize, (i + 1) * paginationSize),
                pageNumber: i,
                totalPages: totalPages,
                pageSlugs: {
                    first: `/kategori/${tagName}/`,
                    last: `/kategori/${tagName}/${totalPages > 1 ? totalPages + '/' : ''}`,
                    next: next,
                    prev: prev
                }
            });
        }
    }

    console.log(`Generated ${paginatedPages.length} tag pages manually.`);
    return paginatedPages;
};
