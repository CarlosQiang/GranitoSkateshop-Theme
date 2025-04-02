// Funcionalidad adicional para el menú móvil
document.addEventListener("DOMContentLoaded", () => {
  // Verificar si estamos en un dispositivo móvil
  const isMobile = window.innerWidth <= 990

  // Elementos del menú móvil
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  // Función para abrir el menú móvil
  function openMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.add("active")
      mobileMenuOverlay.classList.add("active")
      if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "true")
      }
      document.body.style.overflow = "hidden" // Evitar scroll del body
    }
  }

  // Función para cerrar el menú móvil
  function closeMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
      mobileMenu.classList.remove("active")
      mobileMenuOverlay.classList.remove("active")
      if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "false")
      }
      document.body.style.overflow = "" // Restaurar scroll del body
    }
  }

  // Añadir eventos de clic para abrir/cerrar el menú
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", openMobileMenu)
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu)
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu)
  }

  // Cerrar el menú al hacer clic en un enlace
  mobileNavLinks.forEach((link) => {
    if (link) {
      link.addEventListener("click", closeMobileMenu)
    }
  })

  // Cerrar el menú al cambiar la orientación del dispositivo
  window.addEventListener("resize", () => {
    if (window.innerWidth > 990 && mobileMenu && mobileMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  })

  // Soporte para navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  })

  // Añadir soporte para submenús si existen
  const mobileNavItemsWithChildren = document.querySelectorAll(".mobile-nav-item-has-children")

  mobileNavItemsWithChildren.forEach((item) => {
    const toggleButton = item.querySelector(".mobile-submenu-toggle")
    const submenu = item.querySelector(".mobile-submenu")

    if (toggleButton && submenu) {
      toggleButton.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Alternar la visibilidad del submenú
        submenu.classList.toggle("active")
        toggleButton.classList.toggle("active")

        // Actualizar el atributo aria-expanded
        const isExpanded = toggleButton.getAttribute("aria-expanded") === "true"
        toggleButton.setAttribute("aria-expanded", !isExpanded)
      })
    }
  })
})

