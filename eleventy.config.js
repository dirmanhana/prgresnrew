module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/admin");

    eleventyConfig.addFilter("dateReadable", (dateObj) => {
        return dateObj.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    });

    eleventyConfig.addFilter("dateIso", (dateObj) => {
        return dateObj.toISOString();
    });

    eleventyConfig.addFilter("limit", (arr, limit) => {
        return arr.slice(0, limit);
    });

    eleventyConfig.addFilter("urlencode", (str) => {
        return encodeURIComponent(str);
    });

    // Collection for Trending/Popular posts
    eleventyConfig.addCollection("popular", function (collectionApi) {
        const allPosts = collectionApi.getFilteredByTag("post").reverse();
        // Option 1: Editor's choice
        const trending = allPosts.filter(post => post.data.trending === true);

        // Option 3 Simulation: Fill up with latest if trending < 5
        if (trending.length < 5) {
            const others = allPosts.filter(post => !post.data.trending);
            return trending.concat(others).slice(0, 5);
        }

        return trending.slice(0, 5);
    });


    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};
