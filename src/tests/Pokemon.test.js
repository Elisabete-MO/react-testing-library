import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name').textContent;
    const typePokemon = screen.getByTestId('pokemon-type').textContent;
    const weightPokemon = screen.getByTestId('pokemon-weight').textContent;
    const detailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(detailsPokemon).toBeInTheDocument();
    userEvent.click(detailsPokemon);
    const nameDetails = screen.getByTestId('pokemon-name');
    const typeDetails = screen.getByTestId('pokemon-type');
    const weightDetails = screen.getByTestId('pokemon-weight');
    expect(nameDetails.textContent).toBe(namePokemon);
    expect(typeDetails.textContent).toBe(`${typePokemon}`);
    expect(typeDetails.textContent).toMatch(/electric/i);
    expect(weightDetails.textContent).toBe(weightPokemon);
    expect(weightDetails.textContent).toMatch(/Average weight: /i);
    const pokemonImg = screen.getByAltText(`${namePokemon} sprite`);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', url);
  });

  it('O link para exibição dos detalhes deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido;', () => {
    const { history } = renderWithRouter(<App />);
    const id = 25;
    const detailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(detailsPokemon).toBeInTheDocument();
    userEvent.click(detailsPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = 'Pikachu';
    const detailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(detailsPokemon).toBeInTheDocument();
    userEvent.click(detailsPokemon);
    const detailsTitle = screen.getByRole('heading', { name: `${namePokemon} Details` }, { level: 2 });
    expect(detailsTitle).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const nameFavorite = 'Pikachu';
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    const favorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorite);
    const starImg = screen.getByAltText(`${nameFavorite} is marked as favorite`);
    const url = '/star-icon.svg';
    expect(starImg).toBeInTheDocument();
    expect(starImg).toHaveAttribute('src', url);
  });
});
