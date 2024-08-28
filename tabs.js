import docs from "./docs.js";

window.addEventListener("DOMContentLoaded", (event) => {
  create_tabs(".tabs");
  create_panes(".panes");
  const hash = location.hash;
  const tabs = Array.from(document.querySelectorAll(".tabs li a"));
  const panes = Array.from(document.querySelectorAll(".pane"));
  const firstPane = panes[0];
  const firstPaneTitle = tabs[0].innerText;

  function create_element(tag, content, attrs = {}) {
    const el = document.createElement(tag);

    Object.keys(attrs).forEach((k) => {
      if (k === "className") {
        el.classList.add(attrs[k]);
      } else if (k === "classList") {
        attrs[k].forEach((className) => el.classList.add(className));
      } else {
        el.setAttribute(k, attrs[k]);
      }
    });

    if (content) {
      if (typeof content === "string") {
        el.innerText = content;
      } else {
        el.appendChild(content);
      }
    }

    return el;
  }

  function create_tab({ slug, name }) {
    const link = create_element("a", name, { href: `#${slug}` });
    const tab = create_element("li", link);

    return tab;
  }

  function create_tabs(rootSelector) {
    const root = document.querySelector(rootSelector);
    const ul = create_element("ul");
    const nav = create_element("nav", ul);

    docs.forEach((tab) => ul.appendChild(create_tab(tab)));
    root.appendChild(nav);
  }

  function create_pane({ slug: id, url: src }) {
    const iframe = create_element("iframe", null, { src, width: "100%" });
    const pane = create_element("section", iframe, {
      className: "pane",
      id,
    });
    pane.appendChild(iframe);

    return pane;
  }

  function create_panes(rootSelector) {
    const root = document.querySelector(rootSelector);
    docs.forEach((pane) => root.appendChild(create_pane(pane)));
  }

  function setTitle(string) {
    const suffix = "QuickDox";
    const title = string ? `${string} | QuickDox` : suffix;

    document.title = title;
  }

  function stripHash(hash) {
    return hash.replace(/^#/, "");
  }

  function deactivteAllTabs() {
    tabs.forEach((t) => t.classList.remove("active"));
  }

  function hideAllPanes() {
    deactivteAllTabs();
    panes.forEach((pane) => (pane.style.display = "none"));
  }

  function showPane(pane) {
    hideAllPanes();
    const tab = getTab(pane);

    pane.style.display = "block";
    pane.querySelector("iframe").style.width = "100%";
    tab.classList.add("active");
  }

  function getPane(tab) {
    const id = stripHash(tab.getAttribute("href"));
    return document.getElementById(id);
  }

  function getTab(pane) {
    const href = `#${pane.getAttribute("id")}`;
    return document.querySelector(`.tabs a[href='${href}']`);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      showPane(getPane(tab));
      setTitle(tab.innerText);
    });
  });

  showPane(firstPane);
  setTitle(firstPaneTitle);

  if (hash) {
    const id = stripHash(hash);
    const pane = document.getElementById(id);
    const title = getTab(pane).innerText;

    showPane(pane);
    setTitle(title);
  }
});
