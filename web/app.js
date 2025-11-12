const API = "http://localhost:3000";

const listEl = document.getElementById("list");
const titleEl = document.getElementById("title");
const addBtn = document.getElementById("addBtn");

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return map[m];
  });
}

function render(todos) {
  listEl.innerHTML = "";
  todos.forEach((t) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2";
    li.innerHTML = `
      <div class="flex items-center gap-3">
        <button data-id="${t.id}" class="toggle rounded-lg border px-2 py-1 text-xs ${
          t.done
            ? "border-primary-200 bg-primary-50 text-primary-700"
            : "border-zinc-200 text-zinc-700"
        }">${t.done ? "Fait" : "À faire"}</button>
        <span class="${t.done ? "line-through text-zinc-400" : ""}">${escapeHtml(t.title)}</span>
      </div>
      <span class="text-xs text-zinc-400">#${t.id}</span>
    `;
    listEl.appendChild(li);
  });
}

async function getTodos() {
  const res = await fetch(`${API}/todos`);
  return res.json();
}

async function addTodo(title) {
  const res = await fetch(`${API}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Erreur création");
  }
  return res.json();
}

async function toggleTodo(id) {
  const res = await fetch(`${API}/todos/${id}/toggle`, { method: "PATCH" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Erreur toggle");
  }
  return res.json();
}

addBtn.addEventListener("click", async () => {
  const title = titleEl.value.trim();
  if (!title) return alert('Le champ "title" est requis.');
  try {
    await addTodo(title);
    titleEl.value = "";
    render(await getTodos());
  } catch (e) {
    alert(e.message);
  }
});

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("button.toggle");
  if (!btn) return;
  try {
    await toggleTodo(btn.dataset.id);
    render(await getTodos());
  } catch (e2) {
    alert(e2.message);
  }
});

getTodos().then(render).catch(console.error);
