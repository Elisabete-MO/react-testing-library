import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se a página contém as informações sobre a pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteTitle = screen
      .getByRole('heading', { name: /Pokédex/i, level: 1 });
    expect(favoriteTitle).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto Favorite Pokemons', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoriteSubTitle = screen
      .getByRole('heading', { name: /Favorite Pokémons/i, level: 2 });
    expect(favoriteSubTitle).toBeInTheDocument();
  });

  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoriteText = screen.getByText(/No favorite pokemon found/i);
    expect(favoriteText).toBeInTheDocument();
  });
});
