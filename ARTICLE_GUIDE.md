# Article Creation Guide

## Quick Setup for New Articles

To add a new article to your portfolio, follow these 3 simple steps:

### Step 1: Create the Article HTML File
Create a new HTML file in the `/articles/` folder. You can copy any existing article file (like `articles/styling-guide.html`) and replace the content while keeping the structure:

```
articles/your-article-slug.html
```

Make sure the navigation links are correct:
```html
<a href="../index.html">Home</a>
<a href="../articles.html">Articles</a>
<script src="../script.js"></script>
<link rel="stylesheet" href="../styles.css">
```

### Step 2: Add Entry to articles.json
Open `articles.json` and add your article to the array. The article at the top will be the "latest" on the home page.

```json
{
  "id": "your-article-id",
  "title": "Your Article Title",
  "slug": "articles/your-article-slug.html",
  "date": "December 14, 2025",
  "readTime": "10 min read",
  "summary": "A brief 1-2 sentence summary of your article that appears in listings",
  "categories": ["category1", "category2"],
  "tags": ["tag1", "tag2", "tag3"]
}
```

**Available categories:**
- `tutorials` (📚 Tutorials)
- `tips` (💡 Tips & Tricks)
- `deep-dives` (🔍 Deep Dives)
- `life-updates` (📖 Life Updates)
- `design` (🎨 Design & UX)
- `performance` (⚡ Performance)

### That's It!
The articles.json system will:
- ✅ Automatically generate the articles list page
- ✅ Update the "Latest Article" on the home page
- ✅ Add your article to search and filtering
- ✅ Make your article searchable by title, summary, and category

## File Structure
```
Portfolio/
├── articles.json         ← Register articles here
├── index.html            ← Auto-loads latest article from JSON
├── articles.html         ← Auto-populated from JSON
├── styles.css
├── script.js
└── articles/
    ├── styling-guide.html
    ├── project-launch.html
    ├── code-optimization.html
    ├── react-hooks.html
    ├── web-performance.html
    ├── design-systems.html
    └── your-new-article.html
```

## Example: Adding a "TypeScript Guide" Article

**Step 1:** Create `articles/typescript-guide.html` with your content

**Step 2:** Add this to `articles.json`:
```json
{
  "id": "typescript-guide",
  "title": "Getting Started with TypeScript",
  "slug": "articles/typescript-guide.html",
  "date": "December 14, 2025",
  "readTime": "20 min read",
  "summary": "Learn TypeScript basics including types, interfaces, generics, and best practices for modern development.",
  "categories": ["tutorials", "tips"],
  "tags": ["typescript", "javascript", "guide"]
}
```

Done! Your article is now live, searchable, and will appear as the latest article on the home page.

## Notes
- Articles are ordered by position in `articles.json` (top = newest)
- All articles are searchable by title, summary, and category names
- Categories can be assigned multiple times per article
- Changes to `articles.json` are immediate (no build step needed)
