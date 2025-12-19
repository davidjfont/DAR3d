// -------------------------------------------------------
// ARBOL DE CRIATURAS – SISTEMA DINÁMICO ARAFURI FINAL
// HUGO + IPFS + GA4
// LOADER REAL CON model-viewer (slot="poster")
// -------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  if (typeof CRIATURAS === "undefined") {
    console.error("❌ CRIATURAS no existe.");
    return;
  }

  const DATA = CRIATURAS;
  const nivel1 = document.getElementById("nivel1");
  const nivelesContainer = document.getElementById("nivelesContainer");
  const isMobile = window.innerWidth <= 768;

  const scrollToEl = el => {
    if (!el) return;
    const offset = isMobile ? -120 : -60;
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // ---------------------------------------------------
  // NIVEL 1 – CATEGORÍAS
  // ---------------------------------------------------
  Object.keys(DATA).forEach((categoria, i) => {

    const id = `cat_${i}`;

    nivel1.insertAdjacentHTML("beforeend", `
      <button class="btn-rama border border-fox-red/40 p-3 rounded-xl hover:bg-fox-red/10 transition"
              data-target="#${id}" data-category="${categoria}">
        <img src="/images/${categoria.toLowerCase()}.png"
             class="mx-auto mb-2 w-32 h-32 object-contain">
        <p class="text-xl">${categoria}</p>
      </button>
    `);

    nivelesContainer.insertAdjacentHTML("beforeend", `
      <div id="${id}" class="subrama hidden pt-10">
        <h2 class="text-2xl text-center mb-6">${categoria}</h2>
        <div class="nivel2 grid grid-cols-1 md:grid-cols-3 gap-6"></div>
        <div class="nivel3-container mt-10"></div>
      </div>
    `);
  });

  // CLICK CATEGORÍA
  document.querySelectorAll(".btn-rama").forEach(btn => {
    btn.addEventListener("click", () => {

      const categoria = btn.dataset.category;
      darEvent("enter_category", { category: categoria });

      document.querySelectorAll(".btn-rama")
        .forEach(b => b.classList.remove("active-branch"));

      btn.classList.add("active-branch");

      const target = document.querySelector(btn.dataset.target);
      const open = target.classList.contains("hidden");

      document.querySelectorAll(".subrama").forEach(r => r.classList.add("hidden"));
      target.classList.toggle("hidden", !open);

      if (open) setTimeout(() => scrollToEl(target), 150);
    });
  });

  // ---------------------------------------------------
  // NIVEL 2 y 3
  // ---------------------------------------------------
  Object.entries(DATA).forEach(([categoria, subcats], i) => {

    const nivel2 = document.querySelector(`#cat_${i} .nivel2`);
    const nivel3Container = document.querySelector(`#cat_${i} .nivel3-container`);

    Object.entries(subcats).forEach(([subcategoria, criaturas]) => {

      const subId = `sub_${categoria}_${subcategoria}`.replace(/\s+/g, "_");
      const first = Object.keys(criaturas)[0];
      const preview = criaturas[first].img;

      // NIVEL 2
      nivel2.insertAdjacentHTML("beforeend", `
        <div class="criatura-node cursor-pointer"
             data-subtarget="#${subId}"
             data-category="${categoria}"
             data-subcategory="${subcategoria}">
          <div class="bg-deep-black p-4 rounded-xl border border-fox-red/20 hover:border-neon-green/50 transition">
            <h3 class="text-2xl text-center">${subcategoria}</h3>
            <div class="rounded-xl overflow-hidden mt-3">
              <img src="${preview}" class="w-full h-full object-contain bg-black">
            </div>
          </div>
        </div>
      `);

      // NIVEL 3
      const cards = Object.entries(criaturas).map(([name, data]) => `
        <div class="criatura-node"
             data-src="${data.glb || ""}"
             data-name="${name}"
             data-type="${data.tipo}"
             data-category="${categoria}"
             data-subcategory="${subcategoria}"
             data-zip="${data.zip || ""}">
          <div class="bg-deep-black p-4 rounded-xl border border-fox-red/20 hover:border-neon-green/50 transition">
            <h5 class="text-lg text-center mb-3">${name}</h5>
            <p class="text-xs text-neon-green text-center">${data.tipo}</p>

            <div class="relative mt-3 rounded-xl overflow-hidden" style="height:32rem">
              <img src="${data.img}"
                   class="criatura-ficha w-full h-full object-contain bg-black rounded">

              <button class="volver-btn hidden absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded z-[1000]">
                ← volver
              </button>

              <div class="criatura-3d hidden absolute inset-0"></div>
            </div>
          </div>
        </div>
      `).join("");

      nivel3Container.insertAdjacentHTML("beforeend", `
        <div id="${subId}" class="subrama-n3 hidden mt-6 pt-6 border-t border-fox-red/30">
          <h4 class="text-xl text-center mb-6">${subcategoria}</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            ${cards}
          </div>
        </div>
      `);
    });
  });

  activarInteracciones();
});

// -------------------------------------------------------
// INTERACCIONES + MODEL VIEWER (ARAFURI)
// -------------------------------------------------------
function activarInteracciones() {

  const isMobile = window.innerWidth <= 768;

  document.querySelectorAll(".criatura-node[data-src]").forEach(node => {

    const img = node.querySelector(".criatura-ficha");
    const viewer = node.querySelector(".criatura-3d");
    const volver = node.querySelector(".volver-btn");

    const glb = node.dataset.src;
    const name = node.dataset.name;
    const type = node.dataset.type;
    const category = node.dataset.category;
    const subcategory = node.dataset.subcategory;

    let interacted = false;

    img.addEventListener("click", () => {

      if (!glb) return;

      darEvent("view_creature", {
        creature_name: name,
        creature_type: type,
        category,
        subcategory
      });

      viewer.classList.remove("hidden");
      viewer.style.minHeight = "32rem";
      volver.classList.remove("hidden");

      const mv = document.createElement("model-viewer");
      mv.setAttribute("src", glb);
      mv.setAttribute("camera-controls", "");
      mv.setAttribute("auto-rotate", "");
      mv.setAttribute("shadow-intensity", "1");
      mv.setAttribute("interaction-prompt", "none");
      mv.setAttribute("loading", "eager");
      mv.style.width = "100%";
      mv.style.height = "100%";

      if (isMobile) mv.setAttribute("disable-zoom", "");

      // 🧬 LOADER ARAFURI REAL
      const poster = document.createElement("div");
      poster.slot = "poster";
      poster.className = "dar3d-loader";
      poster.innerHTML = `
        <img src="/svg/dar3d-loader.svg" alt="Cargando DAR3D">
        <span>Cargando ${name}…</span>
      `;

      mv.appendChild(poster);
      viewer.appendChild(mv);

      img.classList.add("hidden");

      darEvent("open_3d_viewer", {
        model: glb,
        creature_name: name
      });

      // 📥 BOTÓN SOLICITAR 3D (Si tiene ZIP)
      const zip = node.dataset.zip;
      if (zip && zip.length > 1) {
        const btnRequest = document.createElement("a");
        btnRequest.href = `https://docs.google.com/forms/d/e/1FAIpQLScBuTaFwUSKo8T5ld5BZ7UCb-1blyQcp504YxjiZy-KIlEI1Q/viewform?entry.1908425380=${zip}`;
        btnRequest.target = "_blank";
        // Position: bottom-3 left-3
        btnRequest.className = "btn-solicitar-3d absolute bottom-3 left-3 bg-black/70 text-white px-3 py-2 rounded z-[1000] text-sm hover:bg-black transition";
        btnRequest.innerText = "Solicitar 3D Gratuito ->";
        btnRequest.onclick = () => darEvent('click_request_3d', { creature_name: name });

        viewer.appendChild(btnRequest);
      }

      mv.addEventListener("camera-change", () => {
        if (!interacted) {
          interacted = true;
          darEvent("interact_3d_model", {
            model: glb,
            creature_name: name,
            source: "creature_tree"
          });
        }
      });
    });

    volver.addEventListener("click", () => {

      darEvent("close_3d_viewer", {
        model: glb,
        creature_name: name
      });

      viewer.innerHTML = "";
      viewer.classList.add("hidden");
      volver.classList.add("hidden");
      img.classList.remove("hidden");
      interacted = false;

      // Limpiar botón solicitar si existe
      const btnReq = viewer.querySelector(".btn-solicitar-3d");
      if (btnReq) btnReq.remove();
    });
  });

  // SUBCATEGORÍAS
  document.querySelectorAll(".criatura-node[data-subtarget]").forEach(node => {

    const target = document.querySelector(node.dataset.subtarget);

    node.addEventListener("click", () => {

      darEvent("enter_subcategory", {
        category: node.dataset.category,
        subcategory: node.dataset.subcategory
      });

      const parent = target.closest(".subrama");
      parent.querySelectorAll(".subrama-n3")
        .forEach(s => s !== target && s.classList.add("hidden"));

      target.classList.toggle("hidden");

      if (!target.classList.contains("hidden")) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    });
  });
}
