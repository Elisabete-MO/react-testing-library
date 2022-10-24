import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('As informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const detailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(detailsPokemon).toBeInTheDocument();
    const namePokemon = screen.getByTestId('pokemon-name').textContent;
    userEvent.click(detailsPokemon);
    const detailsTitle = screen.getByRole('heading', { name: `${namePokemon} Details` }, { level: 2 });
    expect(detailsTitle).toBeInTheDocument();
    expect(detailsPokemon).not.toBeInTheDocument();
    const detailsSummary = screen.getByRole('heading', { name: 'Summary' }, { level: 2 });
    expect(detailsSummary).toBeInTheDocument();
    const detailResume = screen.getByText(/Pokémon roasts hard berries with electric.../i);
    expect(detailResume).toBeInTheDocument();
  });

  it('existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    const namePokemon = 'Pikachu';
    renderWithRouter(<App />);
    const detailsPokemon = screen.getByRole('link', { name: /more details/i });
    expect(detailsPokemon).toBeInTheDocument();
    userEvent.click(detailsPokemon);
    const detailsSummary = screen.getByRole('heading', { name: `Game Locations of ${namePokemon}` }, { level: 2 });
    expect(detailsSummary).toBeInTheDocument();
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
    const img = screen.getAllByRole('img');
    const altImg = screen.getAllByAltText(`${namePokemon} location`);
    expect(altImg.length).toBe(2);
    const srcImg1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(img[1].src).toBe(srcImg1);
    expect(img[1].alt).toBe(`${namePokemon} location`);
    const srcImg2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(img[2].src).toBe(srcImg2);
    expect(img[2].alt).toBe(`${namePokemon} location`);
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
