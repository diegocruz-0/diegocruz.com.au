# Diego Cruz — Cloud, AI, and engineering

This is the source for [diegocruz.com.au](https://diegocruz.com.au), built with Jekyll and hosted on GitHub Pages. The site is an English-language home page and blog; the blog starts empty by design.

## Publishing

GitHub Pages builds the site from the repository root on the `main` branch. Keep the existing `CNAME` file in place for the custom domain. The supported `jekyll-feed` and `jekyll-seo-tag` plugins generate the RSS feed at `/feed.xml` and page metadata.

### Write a post

1. Add a Markdown file under `_posts/` named `YYYY-MM-DD-short-title.md`.
2. Start it with front matter:

   ```yaml
   ---
   title: "A clear, specific title"
   date: 2026-10-12 09:00:00 +1100
   description: "A concise summary for the blog listing and search results."
   tags:
     - Azure
     - AI
   toc: true
   ---
   ```

3. Write the article in Markdown below the front matter. Use fenced code blocks for examples, link to original sources, and set `toc: true` when the article has enough sections to benefit from a generated table of contents. Omit `toc` for shorter posts.
4. Commit and push to `main`; GitHub Pages builds and publishes the site.

Posts are sorted by their date. Use the tags field for topic filters on the blog page. Draft content can be kept locally in Jekyll’s `_drafts/` directory; drafts are not published.

## Local preview

Ruby and Bundler are required. Install dependencies once, then run Jekyll:

```sh
bundle install
bundle exec jekyll serve
```

Open the local address printed by Jekyll. The `github-pages` Gemfile dependency matches the GitHub Pages build environment.

## Project structure

```text
_config.yml           Jekyll settings, plugins, and URL configuration
_layouts/             Shared site and article layouts
_posts/               Published Markdown articles
assets/css/style.css  Site styles
assets/js/site.js     Mobile navigation, topic filters, and optional article TOC
blog/index.html       Jekyll-generated article listing
index.html            Home page and recent posts
CNAME                 GitHub Pages custom domain
```
