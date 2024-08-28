import docs from "./docs.js";

function searchDocs(searchTerm) {
  docs.forEach(({ url, slug }) => {
    const iframe = document.querySelector(`#${slug} iframe`);
    iframe.setAttribute("src", `${url}search.html?q=${searchTerm}`);
  });
}

function initSearch() {
  const search = document.querySelector(`input[name="search"][type="search"]`);
  //hexdocs.pm/elixir/1.17.2/search.html?q=reduce
  docs.forEach(({ url }) => {
    console.log(`${url}search.html?q=<search-term>`);
  });

  search.addEventListener("change", () => {
    searchDocs(search.value);
  });
}

initSearch();
