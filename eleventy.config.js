module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");

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


    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};
