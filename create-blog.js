// This script now requires blogs.js to be loaded before it.
// Ensure <script src="blogs.js"></script> is in create-blog.html.

document.getElementById('create-blog-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const author = document.getElementById('blog-author').value;
    const category = document.getElementById('blog-category').value;
    const imageFile = document.getElementById('blog-image').files[0];

    if (!imageFile) {
        alert("Please select a featured image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result; // This will be a base64 data URL
        const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        const filename = `Blogs/${category}/${slug}.html`;

        // 1. Create the new blog object
        const newBlog = {
            title: title,
            author: author,
            date: date,
            category: category.toLowerCase(),
            image: imageUrl, // Storing the base64 URL directly
            url: filename,
            description: content.substring(0, 150) + "..."
        };

        // 2. Add the new blog to the existing blogs array
        // The 'blogs' variable is available globally from blogs.js
        const updatedBlogs = [newBlog, ...blogs];

        // 3. Generate the full, new content for blogs.js
        // Using JSON.stringify with pretty printing
        const newBlogsJSContent = `const blogs = ${JSON.stringify(updatedBlogs, null, 4)};`;

        // 4. Generate the HTML for the new blog post file
        const newBlogPostHTML = createBlogPostHTML(title, content, author, date, imageUrl, category);

        // 5. Display the results to the user
        displayResults(filename, newBlogPostHTML, newBlogsJSContent);
    };
    reader.readAsDataURL(imageFile);
});

function createBlogPostHTML(title, content, author, date, imageUrl, category) {
    // Note the relative paths for shared assets like CSS
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../main.css">
</head>
<body class="bg-gray-950 text-gray-100 antialiased font-['Inter']">
    <header class="bg-gray-900 p-4 border-b border-gray-800">
        <div class="container mx-auto flex justify-between items-center">
            <a href="../../index.html" class="text-3xl font-extrabold text-cyan-400 hover:text-cyan-300 transition-colors">CGTMF</a>
            <nav class="hidden md:flex space-x-8 items-center">
                <a href="../../index.html" class="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Home</a>
                <a href="../../all-blogs.html" class="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Blogs</a>
                <a href="../../create-blog.html" class="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Create Blog</a>
                <a href="#" class="text-gray-300 hover:text-cyan-400 font-medium transition-colors">About</a>
            </nav>
        </div>
    </header>
    <main class="container mx-auto p-4 md:p-8">
        <article class="prose prose-invert max-w-none lg:prose-xl mx-auto py-12">
            <header class="mb-12 text-center">
                <h1 class="text-5xl font-extrabold text-white">${title}</h1>
                <p class="mt-4 text-gray-400 text-lg">
                    By <a class="text-cyan-400 hover:text-cyan-300">${author}</a> | ${date}
                </p>
            </header>
            <img src="${imageUrl}" alt="${title}" class="w-full rounded-xl mb-12">
            <div class="prose-custom max-w-none prose-lg md:prose-xl">
                ${content.replace(/\n/g, '<br>')}
            </div>
        </article>
    </main>
    <footer class="bg-gray-900 p-6 border-t border-gray-800 text-center text-gray-500 mt-16">
        <div class="container mx-auto">
            <p>&copy; 2025 CGTMF. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
}

function displayResults(filename, postContent, blogsContent) {
    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = `
        <div class="max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl space-y-8">
            <h1 class="text-4xl font-bold text-white mb-6 text-center">Blog Post Ready!</h1>

            <div class="bg-gray-800 p-4 rounded-lg">
                <h2 class="text-2xl font-semibold text-cyan-400 mb-2">Step 1: Create the Blog Post File</h2>
                <p class="text-gray-300 mb-2">Create a new file with this exact name and path:</p>
                <input type="text" readonly value="${filename}" class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 font-mono">
                <p class="text-gray-300 mt-4 mb-2">Copy the entire content below and paste it into the new file.</p>
                <textarea readonly class="w-full h-64 bg-gray-700 border border-gray-600 text-white rounded-lg p-2 font-mono">${postContent}</textarea>
            </div>

            <div class="bg-gray-800 p-4 rounded-lg">
                <h2 class="text-2xl font-semibold text-cyan-400 mb-2">Step 2: Update the Blog List</h2>
                <p class="text-gray-300 mb-2">Open the <code class="bg-gray-700 p-1 rounded">blogs.js</code> file in the root directory.</p>
                <p class="text-gray-300 mt-4 mb-2">Replace its entire content with the content below.</p>
                <textarea readonly class="w-full h-64 bg-gray-700 border border-gray-600 text-white rounded-lg p-2 font-mono">${newBlogsJSContent}</textarea>
            </div>

            <div class="text-center mt-8">
                <a href="create-blog.html" class="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Create Another Post</a>
            </div>
        </div>
    `;
}
