import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const PokedexSubTitle = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(PokedexSubTitle).toBeInTheDocument();
  });

  it('Os botões de filtragem por tipo possuem o nome correto', () => {
    renderWithRouter(<App />);
    const btnFiltro = screen.getAllByTestId('pokemon-type-button');
    expect(btnFiltro.length).toBe(7);
    userEvent.click(btnFiltro[0]);
    const typeFiltro = screen.getAllByText(/electric/i);
    expect(typeFiltro.length).toBe(2);
    userEvent.click(btnFiltro[1]);
    const typeFiltroTwo = screen.getAllByText(/fire/i);
    expect(typeFiltroTwo.length).toBe(2);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
  });

  it('É possível clicar no botão de filtragem All', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
  });
});
