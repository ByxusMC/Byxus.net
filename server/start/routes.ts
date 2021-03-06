/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
	Route.resource('users', 'UsersController').apiOnly().middleware({})
	Route.resource('roles', 'RolesController').apiOnly().middleware({})
	Route.resource('translations', 'TranslationsController').apiOnly().middleware({})
	Route.resource('modules', 'ModulesController').apiOnly().only(['index', 'show', 'update']).middleware({})
	Route.resource('forums', 'ForumsController').apiOnly().middleware({})
	Route.resource('categories', 'CategoriesController').apiOnly().middleware({})
	Route.resource('posts', 'PostsController').apiOnly().middleware({})
	Route.resource('comments', 'CommentsController').apiOnly().middleware({})

	Route.get('/authentication/user/me', 'AuthController.user').middleware('auth')

	Route.post('/authentication/api/login', 'AuthController.loginApi')
	Route.post('/authentication/api/logout', 'AuthController.logoutApi').middleware('auth')

	Route.post('/authentication/web/login', 'AuthController.loginWeb')
	Route.post('/authentication/web/logout', 'AuthController.logoutWeb').middleware('auth')

	Route.resource('cookies', 'CookiesController').apiOnly().only(['show', 'store'])
}).prefix('/api')
