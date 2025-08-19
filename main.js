// Custom JavaScript for the page functionality

window.onload = function() {
    // Hero section background animation
    const canvas = document.getElementById('hero-canvas');
    let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function initHeroAnimation() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 100;
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const color1 = new THREE.Color(0x3b82f6);
        const color2 = new THREE.Color(0x06b6d4);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 1000;
            positions[i + 1] = (Math.random() - 0.5) * 1000;
            positions[i + 2] = (Math.random() - 0.5) * 1000;
            const color = new THREE.Color();
            color.lerpColors(color1, color2, Math.random());
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        camera.position.x += (mouseX * 0.005 - camera.position.x) * 0.1;
        camera.position.y += (-mouseY * 0.005 - camera.position.y) * 0.1;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    initHeroAnimation();
    animate();

    // Blog data management and rendering script
    const blogData = [
        {
            title: "The Curious Case of the Portobello Mushroom",
            description: "based on something I came across from the Joe Rogan, linking Portobello Mushrooms and Jet Fuel, it of couse 😂, has no direct connection, but it's worth knowing, some information are so important that they're uselss.",
            author: "Me, I run this thing",
            date: "August 18th, 2025 (did it sometime back can't remember)",
            imageUrl: "Blogs\\Science\\ALL-RESOURCES\\PM-HeroPhoto.png",
            link: "Blogs\\Science\\blog-post-portobello-mushrooms.html",
            isNew: true
        },
        {
            title: "A Deep Dive into the World of Quantum Computing",
            description: "Exploring the fundamental principles of quantum mechanics and how they are being harnessed to create a new generation of powerful computers. This article covers everything from the basics of qubits to the potential impact on society, including security and scientific research.",
            author: "Jane Doe",
            date: "July 29, 2025",
            imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Quantum+Computing",
            link: "#",
            isNew: false
        },
        {
            title: "The Future of Space Exploration: Beyond Mars",
            description: "An analysis of the next major milestones in space exploration, from the Moon to the outer planets and beyond. We'll look at the technologies, challenges, and international collaborations driving this exciting new era.",
            author: "Alex Chen",
            date: "July 20, 2025",
            imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Space+Exploration",
            link: "#",
            isNew: false
        },
        {
            title: "Gaming Trends: What to Play Next",
            description: "A look at the latest releases, upcoming titles, and trends in the gaming world. From indie darlings to AAA blockbusters, we've got you covered with a comprehensive guide to what's hot right now.",
            author: "John Smith",
            date: "October 25, 2023",
            imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Gaming+Trends",
            link: "#",
            isNew: false
        },
        {
            title: "A Guide to Sustainable Living",
            description: "Simple, effective ways to reduce your carbon footprint and live a more eco-friendly life. This guide provides practical tips for everyday changes that make a big impact on the environment.",
            author: "Maria Garcia",
            date: "June 15, 2025",
            imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Sustainable+Living",
            link: "#",
            isNew: false
        },
        {
            title: "The Best Sci-Fi Movies of the Decade",
            description: "A curated list of must-watch science fiction films that have defined the past ten years. From mind-bending thrillers to epic space operas, these movies are essential viewing for any sci-fi fan.",
            author: "David Lee",
            date: "May 10, 2025",
            imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Sci-Fi+Movies",
            link: "#",
            isNew: false
        },
        {
            title: "The Art of Home Brewing Coffee",
            description: "From bean selection to brewing techniques, everything you need to know to make the perfect cup at home. We explore different methods, from pour-over to French press, and how to get the most flavor out of your beans.",
            author: "Olivia Brown",
            date: "April 22, 2025",
            imageUrl: "https://placehold.co/600x400/1e293b/94a3b8?text=Coffee+Art",
            link: "#",
            isNew: false
        }
    ];

    const newlyAddedContainer = document.getElementById('newly-added-container');
    const allBlogsContainer = document.getElementById('all-blogs-container');

    // Function to create a blog card from a data object
    function createBlogCard(blog, isScrollable) {
        const cardLink = document.createElement('a');
        cardLink.href = blog.link;
        
        // Use a wrapper div to handle the rounded corners and the card itself
        const cardWrapper = document.createElement('div');
        cardWrapper.className = `bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 card-hover relative group overflow-hidden flex flex-col ${isScrollable ? 'scroll-item' : 'long-card'}`;
        
        const img = document.createElement('img');
        img.className = "w-full h-56 object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-300";
        img.src = blog.imageUrl;
        img.alt = blog.title;

        const contentDiv = document.createElement('div');
        contentDiv.className = "p-6 md:p-8 flex flex-col flex-grow"; 

        const textContentDiv = document.createElement('div');
        textContentDiv.className = "flex-grow";

        const title = document.createElement('h3');
        title.className = "text-xl font-semibold text-white mb-2 whitespace-normal";
        title.textContent = blog.title;
        
        const description = document.createElement('p');
        description.className = "text-gray-400 text-sm mb-4 line-clamp-3";
        description.textContent = blog.description;
        
        const infoDiv = document.createElement('div');
        infoDiv.className = "flex items-center text-gray-500 text-xs mt-4";
        
        const authorSpan = document.createElement('span');
        authorSpan.className = "mr-2";
        authorSpan.textContent = `By ${blog.author}`;
        
        const dotSpan = document.createElement('span');
        dotSpan.textContent = "•";
        
        const dateSpan = document.createElement('span');
        dateSpan.className = "ml-2";
        dateSpan.textContent = blog.date;

        infoDiv.appendChild(authorSpan);
        infoDiv.appendChild(dotSpan);
        infoDiv.appendChild(dateSpan);
        
        textContentDiv.appendChild(title);
        textContentDiv.appendChild(description);
        
        contentDiv.appendChild(textContentDiv);
        contentDiv.appendChild(infoDiv);
        
        cardWrapper.appendChild(img);
        cardWrapper.appendChild(contentDiv);
        
        if (blog.isNew) {
            const newBadge = document.createElement('span');
            newBadge.className = "absolute top-6 right-6 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse";
            newBadge.textContent = "New";
            cardWrapper.appendChild(newBadge);
        }
        
        cardLink.appendChild(cardWrapper);
        return cardLink;
    }

    // Render newly added blogs (the ones with isNew: true)
    const newlyAddedBlogs = blogData.filter(blog => blog.isNew);
    newlyAddedBlogs.forEach(blog => {
        const card = createBlogCard(blog, false);
        newlyAddedContainer.appendChild(card);
    });

    // The content to be scrolled
    const otherBlogs = blogData.filter(blog => !blog.isNew);
    
    otherBlogs.forEach(blog => {
        const card = createBlogCard(blog, true);
        allBlogsContainer.appendChild(card);
    });
};
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
