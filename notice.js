const tableBody = document.querySelector("#noticeTable tbody");
const notices = JSON.parse(localStorage.getItem("notices")) || [];

function renderNotices() {
  if (notices.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">No notices available.</td></tr>`;
    return;
  }

  tableBody.innerHTML = "";

  // notices নতুন নোটিশ উপরে আছে ধরে নিচ্ছি (admin.js এ unshift দিয়ে সেভ হয়)
  // তাই এখানে আর sort করার দরকার নেই

  notices.forEach(notice => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td data-label="Title">${notice.title}</td>
      <td data-label="Published At">${notice.publishedAt}</td>
      <td data-label="Download"><a href="${notice.pdf}" download="${notice.title}.pdf" class="download-btn">Download</a></td>
    `;
    tableBody.appendChild(tr);
  });
}

renderNotices();
