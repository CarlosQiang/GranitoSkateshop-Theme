// Este archivo es opcional y puede usarse para funcionalidades JavaScript adicionales
document.addEventListener("DOMContentLoaded", () => {
  // Función para manejar el menú móvil (puedes expandir esto según tus necesidades)
  function setupMobileMenu() {
    const mobileMenuButton = document.querySelector(".mobile-menu-button")
    const mobileMenu = document.querySelector(".mobile-menu")

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        mobileMenuButton.classList.toggle("active")
      })
    }
  }

  // Función para manejar el desplazamiento y cambiar la opacidad de la barra de navegación
  function handleScroll() {
    const navbar = document.querySelector(".transparent-navbar")
    if (navbar) {
      // Obtener los valores de opacidad del data-attribute o usar valores predeterminados
      const initialOpacity = Number.parseFloat(navbar.getAttribute("data-initial-opacity") || 0.7)
      const scrolledOpacity = Number.parseFloat(navbar.getAttribute("data-scrolled-opacity") || 0.9)
      const navbarColor = navbar.getAttribute("data-color") || "rgba(212, 175, 55, 1)"

      function updateNavbarOpacity() {
        if (window.scrollY > 50) {
          // Aplicar opacidad mayor al hacer scroll
          const scrolledColor = navbarColor.replace(/[\d.]+\)$/, scrolledOpacity + ")")
          navbar.style.backgroundColor = scrolledColor
          navbar.style.backdropFilter = "blur(10px)"
          navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
          navbar.classList.add("scrolled")
        } else {
          // Restaurar opacidad inicial al volver arriba
          const initialColor = navbarColor.replace(/[\d.]+\)$/, initialOpacity + ")")
          navbar.style.backgroundColor = initialColor
          navbar.style.backdropFilter = "blur(5px)"
          navbar.style.boxShadow = "none"
          navbar.classList.remove("scrolled")
        }
      }

      // Ejecutar al cargar para establecer el estado inicial
      updateNavbarOpacity()

      // Añadir el evento de scroll
      window.addEventListener("scroll", updateNavbarOpacity)
    }
  }

  // Función para ajustar el espaciado del contenido con la barra fija
  function adjustContentSpacing() {
    const navbar = document.querySelector(".transparent-navbar")
    const headerContent = document.querySelector(".header-content")

    if (navbar && headerContent) {
      // Esperar a que se carguen los estilos
      setTimeout(() => {
        const navbarHeight = navbar.offsetHeight
        headerContent.style.paddingTop = navbarHeight + "px"
      }, 100)

      // Ajustar también al cambiar el tamaño de la ventana
      window.addEventListener("resize", () => {
        const navbarHeight = navbar.offsetHeight
        headerContent.style.paddingTop = navbarHeight + "px"
      })
    }
  }

  // Añadir tooltips a elementos clicables
  function setupTooltips() {
    const clickableElements = document.querySelectorAll(".nav-link, .cart-link, .search-button")

    clickableElements.forEach((element) => {
      // Solo añadir tooltip si no tiene ya uno
      if (!element.getAttribute("data-tooltip")) {
        let tooltipText = ""

        // Determinar el texto del tooltip basado en el elemento
        if (element.classList.contains("cart-link")) {
          tooltipText = "Carrito"
        } else if (element.classList.contains("search-button")) {
          tooltipText = "Buscar"
        } else if (element.classList.contains("nav-link")) {
          tooltipText = element.textContent.trim()
        }

        if (tooltipText) {
          element.setAttribute("data-tooltip", tooltipText)
        }
      }
    })
  }

  // Inicializar funciones
  setupMobileMenu()
  handleScroll()
  adjustContentSpacing()
  setupTooltips()

  // Añadir soporte para accesibilidad con teclado
  function setupKeyboardAccessibility() {
    const navLinks = document.querySelectorAll(".nav-link, .cart-link, .search-button, .header-logo-link")

    navLinks.forEach((link) => {
      link.addEventListener("focus", function () {
        this.classList.add("keyboard-focus")
      })

      link.addEventListener("blur", function () {
        this.classList.remove("keyboard-focus")
      })
    })
  }

  setupKeyboardAccessibility()
})

