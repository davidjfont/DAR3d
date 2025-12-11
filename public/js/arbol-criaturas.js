// -------------------------------------------------------
// ARBOL DE CRIATURAS – SISTEMA DINÁMICO AUTOMÁTICO
// Versión ARAFURA PRO FINAL – COMPATIBLE CON HUGO
// -------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    if (typeof CRIATURAS === "undefined") {
        console.error("❌ Error: CRIATURAS no está definido.");
        return;
    }

    // Base IPFS donde están los GLB
    const IPFS_BASE = "https://w3s.link/ipfs/bafybeib6a7dzgprashrdflr7p6ukx34tw3nvocqxc7mjw5paxwnhcsiqqq/";

    const getGlbUrl = (data) => {
        if (!data || typeof data !== "object") return "";
        if (data.glb_url && data.glb_url.trim() !== "") return data.glb_url;
        if (data.glb && data.glb.trim() !== "") return data.glb; 
        if (data.glb_name && data.glb_name.trim() !== "") return IPFS_BASE + data.glb_name;
        console.warn("⚠️ Criatura sin glb/glb_name:", data);
        return "";
    };

    const DATA = (typeof CRIATURAS === "string") ? JSON.parse(CRIATURAS) : CRIATURAS;
    <script>
if (window.CRIATURAS_3042) {

    console.log("🔄 Fusionant CRIATURAS_3042 → CRIATURAS...");

    for (const cat in window.CRIATURAS_3042) {
        if (!window.CRIATURAS[cat]) window.CRIATURAS[cat] = {};

        for (const sub in window.CRIATURAS_3042[cat]) {
            if (!window.CRIATURAS[cat][sub]) window.CRIATURAS[cat][sub] = {};

            window.CRIATURAS_3042[cat][sub].forEach(item => {

                const key = item.nombre || item.slug || "DESCONOCIDO";

                window.CRIATURAS[cat][sub][key] = {
                    desc: item.desc,
                    img: item.img,
                    tipo: item.tipo,

                    // 🔥 GLB EXTRA: Prioridad 1 IPFS, 2 nombre, 3 vacío
                    glb: item.glb_url ? item.glb_url :
                         item.glb_name ? item.glb_name :
                         ""
                };
            });
        }
    }

    console.log("✅ Fusió completa:", window.CRIATURAS);
}
</script>


    const nivel1 = document.getElementById("nivel1");
    const nivelesContainer = document.getElementById("nivelesContainer");
    const isMobile = window.innerWidth <= 768;

    function smoothScrollTo(el) {
        if (!el) return;
        const offset = isMobile ? -120 : -60;
        const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top: y, behavior: "smooth" });
    }

    // -------------------------------------------------------
    // NIVEL 1 – CATEGORÍAS PRINCIPALES
    // -------------------------------------------------------
    Object.keys(DATA).forEach((categoria, index) => {

        const id = "cat_" + index;

        nivel1.innerHTML += `
            <button class="btn-rama border border-fox-red/40 p-3 rounded-xl hover:bg-fox-red/10 transition"
                    data-target="#${id}">
                <img src="/images/${categoria.toLowerCase()}.png"
                    class="mx-auto mb-2 w-133 h-133 object-contain">
                <p class="text-xl">${categoria}</p>
            </button>
        `;

        nivelesContainer.innerHTML += `
            <div id="${id}" class="subrama hidden pt-10">
                <h2 class="text-2xl text-center mb-6">${categoria}</h2>
                <div class="nivel2 grid grid-cols-1 md:grid-cols-3 gap-6"></div>

                <div class="nivel3-container mt-10"></div>
            </div>
        `;
    });

    // -------------------------------------------------------
    // CLIC EN CATEGORÍA DE NIVEL 1
    // -------------------------------------------------------
    document.querySelectorAll(".btn-rama").forEach(btn => {
        btn.addEventListener("click", () => {

            document.querySelectorAll(".btn-rama")
                .forEach(x => x.classList.remove("active-branch"));

            btn.classList.add("active-branch");

            const target = document.querySelector(btn.dataset.target);
            const isOpening = target.classList.contains("hidden");

            document.querySelectorAll(".subrama").forEach(r => r.classList.add("hidden"));
            target.classList.toggle("hidden", !isOpening);

            if (isOpening) setTimeout(() => smoothScrollTo(target), 150);
        });
    });

    // -------------------------------------------------------
    // NIVEL 2 — SUBCATEGORÍAS
    // -------------------------------------------------------
    Object.entries(DATA).forEach(([categoria, subcats], i) => {

        const nivel2 = document.querySelector(`#cat_${i} .nivel2`);
        const nivel3Container = document.querySelector(`#cat_${i} .nivel3-container`);

        Object.entries(subcats).forEach(([subcategoria, criaturas]) => {

            const subId = `sub_${categoria}_${subcategoria}`.replace(/\s+/g, "_");

            const firstCriatura = Object.values(criaturas)[0];
            const previewImg = firstCriatura?.img || "";

            nivel2.innerHTML += `
                <div class="criatura-node cursor-pointer" data-subtarget="#${subId}">
                    <div class="bg-deep-black p-4 rounded-xl border border-fox-red/20 hover:border-neon-green/50 transition">
                        <h3 class="text-2xl text-center">${subcategoria}</h3>
                        <div class="criatura-visual-wrapper h-100 rounded-xl overflow-hidden mt-3">
                            <img src="${previewImg}" class="criatura-ficha w-full h-full object-contain bg-black">
                        </div>
                    </div>
                </div>
            `;

            // -------------------------------------------------------
            // NIVEL 3 — CRIATURAS INDIVIDUALES
            // -------------------------------------------------------
            const htmlNivel3 = Object.entries(criaturas)
                .map(([nombre, data]) => {

                    const glbUrl = getGlbUrl(data);

                    return `
                        <div class="criatura-node" data-src="${glbUrl}" data-zip="${data.zip || ""}">
                            <div class="bg-deep-black p-4 rounded-xl border border-fox-red/20 hover:border-neon-green/50 transition">

                                <h5 class="text-lg text-center mb-3">${nombre}</h5>
                                <p class="text-xs text-neon-green text-center">TIPO: ${data.tipo}</p>
                                <p class="opacity-80 text-center">${data.desc}</p>

                                <div class="criatura-visual-wrapper rounded-xl overflow relative mt-3" style="height: 32rem;">

                                    <img src="${data.img}"
                                         class="criatura-ficha w-full h-full object-contain bg-black rounded">

                                    <div class="criatura-loader hidden absolute inset-0 flex justify-center items-center bg-black/80 text-white">
                                        Cargando...
                                    </div>

                                    <button class="volver-btn hidden absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded z-[2000]">
                                        ← volver
                                    </button>

                                    <button class="descargar-btn hidden absolute top-3 left-3 bg-neon-green text-black text-xs px-2 py-1 rounded z-[2000]">
                                        Solicitar 3D Gratis
                                    </button>

                                    <div class="criatura-3d hidden absolute inset-0 z-[1000]"></div>
                                </div>

                            </div>
                        </div>
                    `;
                }).join("");

            nivel3Container.innerHTML += `
                <div id="${subId}" class="subrama-n3 hidden mt-6 pt-6 border-t border-fox-red/30">
                    <h4 class="text-xl text-center mb-6">${subcategoria}</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                        ${htmlNivel3}
                    </div>
                </div>
            `;
        });
    });

    activarInteracciones();
});

// -------------------------------------------------------
// SISTEMA DE INTERACCIÓN — MODEL VIEWER
// -------------------------------------------------------

function activarInteracciones() {

    const isMobile = window.innerWidth <= 768;

    document.querySelectorAll(".criatura-node[data-src]").forEach(node => {

        const img = node.querySelector(".criatura-ficha");
        const loader = node.querySelector(".criatura-loader");
        const viewer = node.querySelector(".criatura-3d");
        const volver = node.querySelector(".volver-btn");
        const descargar = node.querySelector(".descargar-btn");

        const glb = node.dataset.src;
        const zip = node.dataset.zip;

        img.addEventListener("click", () => {

            if (!glb || glb === "undefined") {
                console.error("❌ GLB vacío o undefined:", glb);
                return;
            }

            img.classList.add("hidden");
            loader.classList.remove("hidden");

            setTimeout(() => {
                loader.classList.add("hidden");
                viewer.classList.remove("hidden");
                volver.classList.remove("hidden");

                if (zip) descargar.classList.remove("hidden");

                const mv = document.createElement("model-viewer");
                mv.setAttribute("src", glb);
                mv.setAttribute("camera-controls", "");
                mv.setAttribute("auto-rotate", "");
                mv.setAttribute("shadow-intensity", "1");
                mv.style.width = "100%";
                mv.style.height = "100%";

                if (isMobile) mv.setAttribute("disable-zoom", "");

                viewer.appendChild(mv);
            }, 400);
        });

        volver.addEventListener("click", () => {
            viewer.innerHTML = "";
            viewer.classList.add("hidden");
            volver.classList.add("hidden");
            if (descargar) descargar.classList.add("hidden");
            img.classList.remove("hidden");
        });

        if (descargar && zip) {
            descargar.addEventListener("click", () => {
                const url =
                `https://docs.google.com/forms/d/e/1FAIpQLScBuTaFwUSKo8T5ld5BZ7UCb-1blyQcp504YxjiZy-KIlEI1Q/viewform?entry.1908425380=${zip}`;
                window.open(url, "_blank");
            });
        }
    });

    // Clic en tarjetas de subcategoría
    document.querySelectorAll(".criatura-node[data-subtarget]").forEach(node => {

        const target = document.querySelector(node.dataset.subtarget);

        node.addEventListener("click", () => {

            const parent = target.closest(".subrama");

            parent.querySelectorAll(".subrama-n3").forEach(s => {
                if (s !== target) s.classList.add("hidden");
            });

            target.classList.toggle("hidden");

            if (!target.classList.contains("hidden")) {
                setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
            }
        });
    });
}
