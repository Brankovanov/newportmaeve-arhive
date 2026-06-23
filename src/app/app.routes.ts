import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		data: { breadcrumb: 'Home' },
		loadComponent: () =>
			import('./pages/home/home.page').then((m) => m.HomePage)
	},
	{
		path: 'listen',
		data: { breadcrumb: 'Listen' },
		loadComponent: () =>
			import('./pages/listen/listen.page').then((m) => m.ListenPage)
	},
	{
		path: 'characters',
		data: { breadcrumb: 'Characters' },
		children: [
			{
				path: '',
				loadComponent: () =>
					import('./pages/characters/characters.page').then((m) => m.CharactersPage)
			},
			{
				path: ':slug',
				data: { breadcrumb: ':slug' },
				loadComponent: () =>
					import('./pages/character-detail/character-detail.page').then(
						(m) => m.CharacterDetailPage
					)
			}
		]
	},
	{
		path: 'city',
		data: { breadcrumb: 'City' },
		children: [
			{
				path: '',
				loadComponent: () =>
					import('./pages/city/city.page').then((m) => m.CityPage)
			},
			{
				path: ':district',
				data: { breadcrumb: ':district' },
				loadComponent: () =>
					import('./pages/district-detail/district-detail.page').then(
						(m) => m.DistrictDetailPage
					)
			}
		]
	},
	{
		path: 'author',
		data: { breadcrumb: 'Author' },
		loadComponent: () =>
			import('./pages/author/author.page').then((m) => m.AuthorPage)
	},
	{
		path: 'connect',
		data: { breadcrumb: 'Connect' },
		loadComponent: () =>
			import('./pages/connect/connect.page').then((m) => m.ConnectPage)
	},
	{
		path: 'error',
		data: { breadcrumb: 'Error' },
		loadComponent: () =>
			import('./pages/error/error.page').then((m) => m.ErrorPage)
	},
	{
		path: '404',
		data: { breadcrumb: '404' },
		loadComponent: () =>
			import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage)
	},
	{
		path: '**',
		redirectTo: '404'
	}
];
