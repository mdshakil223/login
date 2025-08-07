// লগইন চেক (লগইন না থাকলে login.html এ রিডাইরেক্ট)
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

let notices = JSON.parse(localStorage.getItem("notices")) || [];

const form = document.getElementById("noticeForm");
const titleInput = document.getElementById("title");
const pdfFileInput = document.getElementById("pdfFile");
const tableBody = document.querySelector("#noticeTable tbody");
const message = document.getElementById("message");

let selectedPdfBase64 = "";
let editIndex = -1;

// PDF ফাইল আপলোড হ্যান্ডেল
pdfFileInput.addEventListener("change", function () {
  const file = pdfFileInput.files[0];
  if (file && file.type === "application/pdf") {
    const reader = new FileReader();
    reader.onload = function (e) {
      selectedPdfBase64 = e.target.result;
      message.textContent = "PDF uploaded successfully!";
    };
    reader.readAsDataURL(file);
  } else {
    message.textContent = "Please upload a valid PDF file.";
  }
});

// ফর্ম সাবমিট হ্যান্ডেল
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title || !selectedPdfBase64) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  const date = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
  const publishedAt = date.toLocaleString('en-US', options).replace(',', '');

  const notice = {
    title,
    pdf: selectedPdfBase64,
    publishedAt,
  };

  if (editIndex === -1) {
    notices.unshift(notice);
    message.textContent = "Saved successfully!";
  } else {
    notices[editIndex] = notice;
    editIndex = -1;
    message.textContent = "Updated successfully!";
  }

  localStorage.setItem("notices", JSON.stringify(notices));
  form.reset();
  selectedPdfBase64 = "";
  renderTable();
});

// টেবিল রেন্ডার
function renderTable() {
  tableBody.innerHTML = "";
  notices.forEach((notice, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${notice.title}</td>
      <td>${notice.publishedAt}</td>
      <td><a href="${notice.pdf}" class="download-link" download="notice.pdf" target="_blank">Download</a></td>
      <td>
        <button onclick="editNotice(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteNotice(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// এডিট ফাংশন
function editNotice(index) {
  const notice = notices[index];
  titleInput.value = notice.title;
  selectedPdfBase64 = notice.pdf;
  editIndex = index;
  message.textContent = "You can now update this notice.";
}

// ডিলিট ফাংশন
function deleteNotice(index) {
  if (confirm("Are you sure you want to delete this notice?")) {
    notices.splice(index, 1);
    localStorage.setItem("notices", JSON.stringify(notices));
    renderTable();
  }
}

// লগআউট ফাংশন
function logout() {
  localStorage.removeItem("loggedIn");
  alert("Logging out...");
  window.location.href = "login.html";
}

renderTable();
