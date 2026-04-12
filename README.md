# Diego Costa — Personal Website

A warm, editorial personal website built for GitHub Pages.

## 🚀 Getting started on GitHub Pages

1. Upload this entire folder to a GitHub repository named `username.github.io`
   (replace `username` with your actual GitHub username)
2. Go to **Settings → Pages → Source → Deploy from branch → main**
3. Your site will be live at `https://username.github.io`

## 📁 File structure

```
/
├── index.html              ← Homepage
├── about/index.html        ← About me
├── work/index.html         ← Work & certifications
├── life/index.html         ← BJJ, BBQ, Fernando
├── blog/
│   ├── index.html          ← Blog post list
│   └── posts/
│       ├── _template.html  ← Copy this to create new posts
│       └── *.html          ← Individual posts
├── contact/index.html      ← Contact page
└── assets/
    ├── css/style.css       ← All styles (CSS variables at the top)
    ├── js/site.js          ← Navigation, scroll reveal
    └── images/             ← Drop your photos here
```

## ✏️ Common edits

### Change the accent colour
Open `assets/css/style.css` and change `--accent: #C4724A;` to any colour you like.

### Add a new blog post
1. Duplicate `blog/posts/_template.html` and rename it
2. Edit the title, content, date, and category
3. Add a new `<li>` entry to `blog/index.html`

### Add a photo
1. Drop the image into `assets/images/`
2. Reference it anywhere with:
   ```html
   <img src="assets/images/your-photo.jpg" alt="Description">
   ```
   (Use `../assets/images/` from inside subfolders like `/about/`, `/life/` etc.)

### Update contact links
Open `contact/index.html` and update the LinkedIn, GitHub, and email links.

## 📸 Photos in use

| File | Used on |
|------|---------|
| `assets/images/bbq-kamado.jpg` | Homepage hero, Life page, Work page |
| `assets/images/fernando.jpg` | Homepage, About, Life |
| `assets/images/bjj-team.webp` | Homepage card, Life page *(drop this file in if you have it)* |

## 🎨 Design system (quick reference)

| Token | Value | Used for |
|-------|-------|----------|
| `--cream` | `#F7F4EE` | Page background |
| `--slate` | `#2C2F35` | Text, nav, footer |
| `--accent` | `#C4724A` | Terracotta highlight |
| `--font-display` | Playfair Display | Headings |
| `--font-body` | DM Sans | Body text |
| `--font-mono` | DM Mono | Labels, tags, code |
