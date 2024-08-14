window.addEventListener("DOMContentLoaded", (event) => {
  const hash = location.hash;
  const tabs = Array.from(document.querySelectorAll(".tabs li a"));
  const panes = Array.from(document.querySelectorAll(".pane"));
  const firstPane = panes[0];
  const firstPaneTitle = tabs[0].innerText;

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
