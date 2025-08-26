const form = document.getElementById("templateForm");
const nameInput = document.getElementById("templateName");
const messageInput = document.getElementById("templateMessage");
const previewBox = document.getElementById("previewBox");
const list = document.getElementById("templateList");

let templates = JSON.parse(localStorage.getItem("templates")) || [];

// Mostrar vista previa
messageInput.addEventListener("input", () => {
  previewBox.textContent = messageInput.value || "Aquí verás tu mensaje...";
});

// Guardar nueva plantilla
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert("Por favor completa todos los campos.");
    return;
  }

  templates.push({ name, message });
  localStorage.setItem("templates", JSON.stringify(templates));
  renderTemplates();

  form.reset();
  previewBox.textContent = "Aquí verás tu mensaje...";
});

// Renderizar lista
function renderTemplates() {
  list.innerHTML = "";
  templates.forEach((t, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${t.name}</strong><br>
      <span>${t.message}</span>
      <div class="template-actions">
        <button onclick="editTemplate(${index})">Editar</button>
        <button onclick="deleteTemplate(${index})">Eliminar</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function editTemplate(index) {
  const t = templates[index];
  nameInput.value = t.name;
  messageInput.value = t.message;
  previewBox.textContent = t.message;
  templates.splice(index, 1);
  localStorage.setItem("templates", JSON.stringify(templates));
  renderTemplates();
}

function deleteTemplate(index) {
  templates.splice(index, 1);
  localStorage.setItem("templates", JSON.stringify(templates));
  renderTemplates();
}

renderTemplates();
