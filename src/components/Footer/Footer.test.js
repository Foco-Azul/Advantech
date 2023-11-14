// src/components/Footer/Footer.test.js

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Footer from './Footer';

test('Que todos los enlaces tengan atributo href y no esté vacío', async () => {
  await act(async () => {
    render(
      <UserProvider>
        <Footer />
      </UserProvider>
    );
  });

  const allLinks = screen.getAllByRole('link');

  allLinks.forEach((link) => {
    expect(link).toHaveAttribute('href'); // Verifica que el atributo href esté presente
    expect(link.getAttribute('href')).not.toBe(''); // Verifica que el atributo href no esté vacío
  });
});


test('Que todos los enlaces de redes abran en distinta pagina', async () => {
  await act(async () => {
    render(
      <UserProvider>
        <Footer />
      </UserProvider>
    );
  });

  // Obtener el contenedor de redes sociales por su id
  const rrssContainer = screen.getByTestId('footer-rrss');

  // Buscar todos los enlaces dentro del contenedor
  const socialLinks = rrssContainer.querySelectorAll('a');

  // Verificar que todos los enlaces se abran en otra ventana
  socialLinks.forEach((link) => {
    expect(link).toHaveAttribute('target', '_blank');
  });

});


test('Que todos los enlaces se abran en la misma pagina, excepto las redes sociales y el enlace de Monitorio uptime', async () => {
  await act(async () => {
    render(
      <UserProvider>
        <Footer />
      </UserProvider>
    );
  });
  // Obtener el contenedor de redes sociales por su data-testid
  const rrssContainer = screen.getByTestId('footer-rrss');

  // Buscar todos los enlaces dentro del componente Footer
  const allLinks = screen.getAllByRole('link');

  // Verificar que los enlaces se abran en la misma página, excepto las redes sociales y el enlace de Monitorio uptime
  allLinks.forEach((link) => {
    if (link.closest('#footer-rrss')) {
      // Redes sociales, esperamos que tengan target="_blank"
      expect(link).toHaveAttribute('target', '_blank');
    } else if (
      link.textContent !== 'Monitorio uptime' &&
      !link.href.startsWith('http') // Verificar que el enlace no comience con "http" (puede ser una ruta interna de Next.js)
    ) {
      // Otros enlaces internos, esperamos que tengan target="_self"
      expect(link).toHaveAttribute('target', '_self');
    }
  });
});


test('Renderizar el componente Footer', async () => {
  await act(async () => {
    render(
      <UserProvider>
        <Footer />
      </UserProvider>
    );
  });

  const footerElement = screen.getByTestId('footer-home');

  expect(footerElement).toBeInTheDocument();
});
