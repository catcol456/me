function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').innerText;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.innerText;
        button.innerText = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Load articles from JSON
async function loadArticles() {
    try {
        const response = await fetch('articles.json');
        const articles = await response.json();
        return articles;
    } catch (error) {
        console.error('Error loading articles.json:', error);
        return [];
    }
}

// Generate article card HTML
function createArticleCard(article) {
    const categoriesStr = article.categories.join(',');
    const tagsHtml = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <a href="${article.slug}" class="article-card" data-categories="${categoriesStr}" data-title="${article.title}" data-summary="${article.summary}">
            <h3>${article.title}</h3>
            <div class="article-meta">
                <span>📅 ${article.date}</span>
                <span>⏱️ ${article.readTime}</span>
            </div>
            <p>${article.summary}</p>
            <div class="article-tags">
                ${tagsHtml}
            </div>
        </a>
    `;
}

// Populate article list on articles page
async function populateArticlesList() {
    const articleList = document.querySelector('.article-list');
    if (!articleList) return;
    
    const articles = await loadArticles();
    articleList.innerHTML = articles.map(article => createArticleCard(article)).join('');
    
    // Re-initialize search and filter functionality after articles are loaded
    initializeArticleFilters();
}

// Get latest article for home page
async function getLatestArticle() {
    const articles = await loadArticles();
    return articles.length > 0 ? articles[0] : null;
}

// Populate latest article on home page
async function populateLatestArticle() {
    const latestArticleSection = document.querySelector('#latest-article .featured-section');
    if (!latestArticleSection) return;
    
    const article = await getLatestArticle();
    if (!article) return;
    
    const tagsHtml = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    latestArticleSection.innerHTML = `
        <a href="${article.slug}" class="article-card" style="text-decoration: none; color: inherit;">
            <h3>${article.title}</h3>
            <div class="article-meta">
                <span>📅 ${article.date}</span>
                <span>⏱️ ${article.readTime}</span>
            </div>
            <p>${article.summary}</p>
            <div class="article-tags">
                ${tagsHtml}
            </div>
        </a>
        <a href="articles.html" class="article-btn" style="margin-top: 1.5rem; display: inline-block;">View All Articles</a>
    `;
}

// Initialize article search and filter functionality
function initializeArticleFilters() {
    const searchInput = document.getElementById('article-search');
    const filterBtns = document.querySelectorAll('.category-filter-btn');
    const articles = document.querySelectorAll('.article-card');

    if (searchInput && filterBtns.length > 0) {
        // Set "All Articles" button as active by default
        const allBtn = document.querySelector('[data-category="all"]');
        if (allBtn) allBtn.classList.add('active');

        let selectedCategory = 'all';

        // Search functionality
        function filterArticles() {
            const searchTerm = searchInput.value.toLowerCase();

            articles.forEach(article => {
                const title = article.getAttribute('data-title').toLowerCase();
                const summary = article.getAttribute('data-summary').toLowerCase();
                const categories = article.getAttribute('data-categories').toLowerCase();

                // Check if matches search term in title, summary, or category
                const matchesSearch = title.includes(searchTerm) || 
                                    summary.includes(searchTerm) || 
                                    categories.includes(searchTerm);

                // Check if matches selected category
                const articleCategories = article.getAttribute('data-categories').split(',');
                const matchesCategory = selectedCategory === 'all' || 
                                      articleCategories.includes(selectedCategory);

                // Show article only if it matches both filters
                if (matchesSearch && matchesCategory) {
                    article.classList.remove('hidden');
                } else {
                    article.classList.add('hidden');
                }
            });
        }

        // Add event listener to search input
        searchInput.addEventListener('input', filterArticles);

        // Add event listeners to category filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Update selected category
                selectedCategory = this.getAttribute('data-category');
                // Trigger filter
                filterArticles();
            });
        });
    }
}

// Smooth scrolling for navigation (only for same-page anchors)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default if it's an anchor link on the same page
        if (href.includes('#') && !href.includes('.html#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Populate articles list if on articles page
    populateArticlesList();
    
    // Populate latest article if on home page
    populateLatestArticle();
});

