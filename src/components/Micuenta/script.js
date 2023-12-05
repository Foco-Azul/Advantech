/* Espera a que se cargue la página
if (typeof window !== 'undefined') {
  window.addEventListener("load", function () {
      // Obtiene el valor de la parte de anclaje (#) de la URL
      const hash = window.location.hash;

      // Verifica si el valor del hash no está vacío
      if (hash) {
          // Elimina el carácter '#' del valor del hash
          const cleanHash = hash.substring(1);

          // Encuentra el botón con el mismo ID que el valor del hash y haga clic en él
          const buttonToClick = document.getElementById(cleanHash);

          if (buttonToClick) {
              buttonToClick.click();
          }
      }
  });
}
*/