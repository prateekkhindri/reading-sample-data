const tableBody = document.getElementById("sample-table-data");

// console.log(tableBody);
const url = new URL(window.location.href);
// console.log(new URLSearchParams(url.search).get("title"));

const title = new URLSearchParams(url.search).get("title");
console.log(title);
fetch(`http://localhost:3000/?item=${title}`)
  .then((response) => {
    // console.log(response.json());
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    tableBody.innerHTML = data
      .map((item, index) => {
        return `
      <tr>
              <td>${item.userId} </td>
              <td>${item.id}</td>
              <td>
              <a href="?title=${item.title}" target="_blank">
              ${item.title}
              </a>
              </td>
              <td class="table-body">${item.body}</td>
            </tr>
      `;
      })
      .join("");
  });
