window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const articleFile = params.get("article") || "article1.md";

    fetch(`articles/${articleFile}`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.text();
        })
        .then(mdText => {
            const html = marked.parse(mdText);
            document.getElementById("content").innerHTML = html;
            // generateToc();
        })
        .catch(err => {
            document.getElementById("content").innerHTML =
                `<p style="color: red;">読み込みエラー: ${err.message}</p>`;
        });
});

/**
 * 記事本文の見出し(h1～h3)からTOCを生成
 */
// function generateToc() {
//     const tocContainer = document.getElementById("article-toc");
//     tocContainer.innerHTML = "";
//
//     const headings = document.querySelectorAll("#content h1, #content h2, #content h3");
//     headings.forEach(heading => {
//         if (!heading.id) {
//             heading.id = heading.textContent.replace(/\s+/g, "-").toLowerCase();
//         }
//         const link = document.createElement("a");
//         link.href = `#${heading.id}`;
//         link.textContent = heading.textContent;
//         link.style.marginLeft = `${(parseInt(heading.tagName[1]) - 1) * 10}px`;
//         tocContainer.appendChild(link);
//     });
// }

