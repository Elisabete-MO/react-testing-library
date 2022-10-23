import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeTitle = screen
      .getByRole('heading', { name: /Encountered pokémons/i });
    expect(homeTitle).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página About, na URL /about ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutTitle = screen
      .getByRole('heading', { name: /About Pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página Pokémons Favoritados na URL /favorites ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteTitle = screen
      .getByRole('heading', { name: /Favorite pokémons/i });
    expect(favoriteTitle).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página Not Found nao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina que-nao-existe/');
    });

    const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
