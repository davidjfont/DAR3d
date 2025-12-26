# 🌌 DAR3D: Mundos Abiertos a Posibilidades

> **"Laboratorio de bestias imposibles importadas de otras realidades."**

Bienvenido al nexo digital de **DAR3D**. Este no es solo un sitio web; es un portal a una línea temporal divergente donde la biología sintética, el arte digital y la narrativa se fusionan. Aquí documentamos, catalogamos y exhibimos formas de vida y artefactos que desafían nuestra comprensión convencional.

## 🧬 El Proyecto

DAR3D es una exploración creativa que combina modelado 3D de vanguardia, *worldbuilding* profundo y tecnología web moderna. Actúa como un archivo vivo para:

*   **Criaturas**: Especímenes detallados modelados en 3D, listos para ser inspeccionados.
*   **Lore**: La historia oculta detrás de cada entidad y su ecosistema.
*   **Gadgets & Artefactos**: Tecnología recuperada de mundos distantes.
*   **Laboratorio**: Experimentos visuales y prototipos de diseño.

## 📂 Arquitectura del Sistema

Este portal está construido sobre **Hugo**, aprovechando su velocidad para servir contenido estático de alta fidelidad, estilizado con un tema personalizado (`dar3d`) potenciado por **Tailwind CSS**.

### Estructura de Datos
El repositorio organiza los activos dimensionales de la siguiente manera:

- `content/criaturas`: Base de datos de entes biológicos.
- `content/lore`: Archivos históricos y narrativos.
- `content/gadgets`: Planos y renders de tecnología.
- `content/universe`: Contexto cosmológico.
- `themes/dar3d`: La interfaz visual personalizada del laboratorio.

*Los modelos 3D son servidos a través de **IPFS** para garantizar la descentralización y persistencia de los datos a través del multiverso.*

## 🚀 Despliegue Local (Acceso de Nivel 1)

Para inicializar una instancia local del portal y contribuir al archivo:

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repo>
    cd www.DAR3d.com
    ```

2.  **Iniciar el servidor de desarrollo:**
    ```bash
    hugo server 
    
    ```

**o bien para un entorno de desarrollo más lento pero más estable:**
    ```bash     
    ./hugo server --disableFastRender --cleanDestinationDir --ignoreCache
    
    ``` 

3.  **Acceder al portal:**
    Navega a `http://localhost:1313` en tu navegador.

## 🛠 Estado del Desarrollo

> ⚠️ **Advertencia del Sistema:** Este proyecto está en constante evolución. Nuevas especies y anomalías son detectadas regularmente.

---
*2026 Innovation Architect - 3D Lab Division*
