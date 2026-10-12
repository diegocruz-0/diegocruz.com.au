(() => {
  const menuButton = document.querySelector(".nav-toggle");
  const navigation = document.querySelector("#nav-links");

  if (menuButton && navigation) {
    document.documentElement.classList.add("js-menu");
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.querySelector(".visually-hidden").textContent = "Open navigation";
      navigation.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.querySelector(".visually-hidden").textContent = isOpen ? "Close navigation" : "Open navigation";
      navigation.classList.toggle("is-open", isOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  const filter = document.querySelector("[data-topic-filter]");
  if (filter) {
    const posts = [...document.querySelectorAll("[data-post]")];
    const options = filter.querySelector("[data-filter-options]");
    const status = filter.querySelector("[data-filter-status]");
    const topics = [...new Set(posts.flatMap((post) => post.dataset.tags.split("|").filter(Boolean)))];

    const applyFilter = (topic, button) => {
      let visible = 0;
      posts.forEach((post) => {
        const matches = topic === "all" || post.dataset.tags.split("|").includes(topic);
        post.hidden = !matches;
        if (matches) visible += 1;
      });
      options.querySelectorAll("button").forEach((option) => {
        option.setAttribute("aria-pressed", String(option === button));
      });
      status.textContent = `${visible} ${visible === 1 ? "article" : "articles"} shown`;
    };

    const addFilterButton = (label, topic) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-button";
      button.textContent = label;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => applyFilter(topic, button));
      options.append(button);
      return button;
    };

    const allButton = addFilterButton("All topics", "all");
    topics.sort((a, b) => a.localeCompare(b)).forEach((topic) => addFilterButton(topic, topic));
    filter.hidden = topics.length === 0;
    if (topics.length > 0) allButton.setAttribute("aria-pressed", "true");
  }

  const toc = document.querySelector("[data-toc]");
  const article = document.querySelector("[data-article-content]");
  if (toc && article) {
    const headings = [...article.querySelectorAll("h2, h3")];
    const list = toc.querySelector("ol");
    const slugCounts = new Map();

    headings.forEach((heading) => {
      if (!heading.id) {
        const base = heading.textContent.trim().toLowerCase()
          .replace(/[^\p{L}\p{N}\s-]/gu, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
        const count = (slugCounts.get(base) || 0) + 1;
        slugCounts.set(base, count);
        heading.id = count === 1 ? base : `${base}-${count}`;
      }

      const item = document.createElement("li");
      if (heading.tagName === "H3") item.className = "toc-level-3";
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      item.append(link);
      list.append(item);
    });

    if (headings.length > 0) toc.hidden = false;
  }
})();
