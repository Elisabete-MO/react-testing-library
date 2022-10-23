import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const nFoundSubTitle = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(nFoundSubTitle).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const nFoundImg = screen.getByRole('img');
    expect(nFoundImg).toBeInTheDocument();
    expect(nFoundImg).toHaveAttribute('src', url);
    const nFoundAltImg = screen.getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(nFoundAltImg).toBeInTheDocument();
  });
});
