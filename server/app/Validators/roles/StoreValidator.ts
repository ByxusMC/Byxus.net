import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
	constructor(private ctx: HttpContextContract) {}

	/**
	 * Defining a schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
	public schema = schema.create({
		color: schema.string(),
		label_id: schema.number([rules.exists({ table: 'translations', column: 'id' })]),
		power: schema.number()
	})

	/**
	 * The `schema` first gets compiled to a reusable function and then that compiled
	 * function validates the data at runtime.
	 *
	 * Since, compiling the schema is an expensive operation, you must always cache it by
	 * defining a unique cache key. The simplest way is to use the current request route
	 * key, which is a combination of the route pattern and HTTP method.
	 */
	public cacheKey = this.ctx.routeKey

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 */
	public messages = {
		required: 'Le champ {{ field }} est obligatoire',
		'label.required': "Le nom d'affichage obligatoire",
		'label.string': "Le nom d'affichage doit-être une chaîne de caractère",
		'color.required': 'La couleur est obligatoire',
		'color.string': 'La couleur doit-être une chaine de caractère',
		'power.required': 'Le niveau de puissance du rôle est obligatoire',
		'power.number': 'Le niveau de puissance du rôle doit-être un nombre'
	}
}
