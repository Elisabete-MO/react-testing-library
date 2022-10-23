import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';
import App from '../App';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutTitle = screen
      .getByRole('heading', { name: /Pokédex/i, level: 1 });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutSubTitle = screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutSubTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutText = screen.getAllByText(/Pokémons/i);
    expect(aboutText.length).toBe(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const aboutImg = screen.getByRole('img');
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg).toHaveAttribute('src', url);
    const aboutAltImg = screen.getByAltText(/pokédex/i);
    expect(aboutAltImg).toBeInTheDocument();
  });
});
