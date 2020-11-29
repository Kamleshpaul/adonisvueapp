import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodoController {

	/**
	 * 
	 * read the resource  
	 */
	public async index({ }: HttpContextContract) {

		const todos = await Todo.all();

		if (todos.length) {
			return {
				msg: "Data found.",
				data: todos
			}
		} else {
			return {
				msg: "No data found.",
				data: {}
			}
		}

	}
	//---------------------------------------------------------------------------------------

	/**
	 * 
	 * create a resource  
	 */
	public async store({ request }: HttpContextContract) {
		const { body } = request.all();
		if (!body) {
			return {
				msg: "body field is required.",
				data: {}
			}
		}

		const todo = await Todo.create({
			body,
		})
		return {
			msg: "todo created.",
			data: todo
		};
	}
	//---------------------------------------------------------------------------------------


	/**
	 * 
	 * update a resource  
	 */
	public async update({ request, params }: HttpContextContract) {
		const { body } = request.all();
		const { id } = params;
		const todo = await Todo.find(id);
		if (!todo) {
			return {
				msg: "todo not found.",
				data: {}
			}
		}
		todo.body = body;
		await todo.save();

		return {
			msg: "todo updated.",
			data: todo
		};
	}
	//---------------------------------------------------------------------------------------

	/**
	 * 
	 * destroy a resource  
	 */
	public async destroy({ params }: HttpContextContract) {
		const { id } = params;
		const todo = await Todo.find(id);
		if (!todo) {
			return {
				msg: "todo not found.",
				data: {}
			}
		}
		await todo.delete()
		return {
			msg: "todo Delete.",
			data: {}
		};
	}
	//---------------------------------------------------------------------------------------
}
