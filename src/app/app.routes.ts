import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/home/home.page').then((m) => m.HomePage)
	},
	{
		path: 'listen',
		loadComponent: () =>
			import('./pages/listen/listen.page').then((m) => m.ListenPage)
	},
	{
		path: 'characters',
		loadComponent: () =>
			import('./pages/characters/characters.page').then((m) => m.CharactersPage)
	},
	{
		path: 'characters/:slug',
		loadComponent: () =>
			import('./pages/character-detail/character-detail.page').then(
				(m) => m.CharacterDetailPage
			)
	},
	{
		path: 'city',
		loadComponent: () =>
			import('./pages/city/city.page').then((m) => m.CityPage)
	},
	{
		path: 'city/:district',
		loadComponent: () =>
			import('./pages/district-detail/district-detail.page').then(
				(m) => m.DistrictDetailPage
			)
	},
	{
		path: 'author',
		loadComponent: () =>
			import('./pages/author/author.page').then((m) => m.AuthorPage)
	},
	{
		path: 'connect',
		loadComponent: () =>
			import('./pages/connect/connect.page').then((m) => m.ConnectPage)
	},
	{
		path: '**',
		redirectTo: ''
	}
];
