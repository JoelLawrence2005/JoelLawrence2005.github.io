// This script provides functionality for dynamic blog content.
// It handles a "new" tag system based on publication date and
// allows users to filter blog posts by category tags.

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Blog Filtering System
     * This function listens for clicks on filter tags and shows/hides
     * blog posts accordingly.
     */
    function setupTagFiltering() {
        // Get the container for filter tags and all blog post cards.
        const filterContainer = document.getElementById('filter-tags-container');
        const blogCards = document.querySelectorAll('.blog-card');

        // Check if the filter container exists before adding an event listener.
        if (!filterContainer) {
            console.log('No filter container found on this page. Skipping filtering setup.');
            return;
        }

        // Add a click event listener to the filter tag container.
        filterContainer.addEventListener('click', (event) => {
            const target = event.target;

            // Ensure the clicked element is a filter tag.
            if (target.classList.contains('filter-tag')) {
                // Get the tag value from the data-tag attribute.
                const tag = target.dataset.tag;

                // Remove the 'active' class from all tags.
                document.querySelectorAll('.filter-tag').forEach(tagEl => {
                    tagEl.classList.remove('active');
                });

                // Add the 'active' class to the clicked tag.
                target.classList.add('active');

                // Iterate through all blog cards to show or hide them.
                blogCards.forEach(card => {
                    if (tag === 'all' || card.dataset.tag === tag) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });

        // Set the 'All' tag as active by default on page load.
        const allTag = document.querySelector('.filter-tag[data-tag="all"]');
        if (allTag) {
            allTag.classList.add('active');
        }
    }


    /**
     * "Newly Added" Blog System
     * This function checks the publication date of each blog and moves
     * it to the "new" section if it's within the last 7 days.
     */
    function checkNewBlogs() {
        // Get the containers for new and other blogs on the homepage.
        const newBlogsContainer = document.getElementById('new-blogs-container');
        const allBlogsContainer = document.getElementById('all-blogs-container');

        // This feature is only relevant for the homepage.
        if (!newBlogsContainer || !allBlogsContainer) {
            console.log('New blog containers not found on this page. Skipping new blog check.');
            return;
        }

        // Get all blog cards with a data-date attribute.
        const allBlogCards = document.querySelectorAll('.blog-card[data-date]');
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Iterate through each blog card.
        allBlogCards.forEach(card => {
            const blogDateStr = card.dataset.date;
            const blogDate = new Date(blogDateStr);

            // Compare the blog's date with the date from 7 days ago.
            if (blogDate > sevenDaysAgo) {
                // If the blog is new, move it to the new blogs container.
                newBlogsContainer.appendChild(card);
                card.classList.add('is-new');
            } else {
                // Otherwise, ensure it's in the all blogs container.
                allBlogsContainer.appendChild(card);
                card.classList.remove('is-new');
            }
        });

        // Show/hide the "Newly Added" section title if there are no new blogs.
        const newSectionTitle = document.getElementById('new-section-title');
        if (newBlogsContainer.children.length === 0) {
            if(newSectionTitle) newSectionTitle.style.display = 'none';
        } else {
            if(newSectionTitle) newSectionTitle.style.display = 'block';
        }
    }

    // Call both functions to set up the blog features.
    setupTagFiltering();
    checkNewBlogs();
});
