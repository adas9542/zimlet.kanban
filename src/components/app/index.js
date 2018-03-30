import { h, Component } from 'preact';
import { provide } from 'preact-context-provider';
import { withIntl } from '../../enhancers';
import { TASK_FOLDER_ID, NEED_STATUS, COMPLETE_STATUS, IN_PROGRESS_STATUS } from '../../constants';
import { getModifyTaskBody } from '../../lib/util';
import Column from '../column';
import Sidebar from '../sidebar';
import style from './style';
import wire from 'wiretie';


export default function createApp(context) {

	@withIntl
	@provide({ zimbraComponents: context.components })
	@wire('batchClient', ({ folderId }) => ({
		//defaults to Tasks folder with id
		searchResults: ['search', { offset: 0, limit: 1000, types: 'task', query: `inid:${folderId || TASK_FOLDER_ID}` }]
	}), ({ getMessage, modifyTask, itemAction }) => ({ getMessage, modifyTask, itemAction }))
	class App extends Component {

		handleChangeStatus = ({ id, status }) => {
			this.props.getMessage({ id })
				.then(task => getModifyTaskBody(task, { status }))
				.then(this.props.modifyTask)
				.then(this.props.refresh)
				.catch((err) => console.log('Error updating', err));
		};
			
	
		handleEdit = ({ id, name }) => {
			this.props.getMessage({ id })
				.then(task => getModifyTaskBody(task, { name }))
				.then(this.props.modifyTask)
				.then(this.props.refresh)
				.catch((err) => console.log('Error updating', err));
		}

		handleDelete = (id) => {
			this.props.itemAction({ id, op: 'delete' })
				.then(this.props.refresh)
				.catch((err) => console.log('Error updating', err));
		}

		// handleAdd = (title) => {
		// 	let id = TASKS.reduce((max, { id }) => Math.max(max, id), -1) + 1;

		// 	let percentComplete;
		// 	if (title==='ToDo'){
		// 		percentComplete = 0;
		// 	}
		// 	else if (title==='In Progress'){
		// 		percentComplete = 50;
		// 	}
		// 	else {
		// 		percentComplete = 100;
		// 	}
		// 	TASKS.push({ id, title: 'temp title', percentComplete });

		// 	this.setState({});


		// }

		render({ loading, searchResults, folderId }) {

			let todoTasks=[], inProgressTasks=[], completeTasks=[];
			(searchResults && searchResults.task || []).forEach(t => {
				if (t.status==='NEED') {
					todoTasks.push(t);
				}
				else if (t.status==='COMP') {
					completeTasks.push(t);
				}
				else {
					inProgressTasks.push(t);
				}
			});

			return (
				<div class={style.wrapper}>
					{/*Example of using component from ZimbraX client, in this case, Sidebar*/}
					<Sidebar>
						<h3>Links</h3>
						<ol>
							<li>
								<a href="https://lonni.me">lonni.me</a>
							</li>
							<li>
								<a href="https://github.com/zimbra/zimlet-cli">zimlet-cli</a>
							</li>
						</ol>
					</Sidebar>
					<div class={style.main}>
						{ loading && 'Loading...'}
						{ !loading && searchResults && [
							<div class={style.header}>My Board</div>,
							<div class={style.columns}>
								<Column status={NEED_STATUS} onEdit={this.handleEdit} onChangeStatus={this.handleChangeStatus}
									onAdd={this.handleAdd} onDelete={this.handleDelete} title="ToDo" tasks={todoTasks}
								/>

								<Column status={IN_PROGRESS_STATUS} onEdit={this.handleEdit} onChangeStatus={this.handleChangeStatus} onAdd={this.handleAdd} onDelete={this.handleDelete}
									title="In Progress" tasks={inProgressTasks}
								/>

								<Column status={COMPLETE_STATUS} onEdit={this.handleEdit} onChangeStatus={this.handleChangeStatus} onAdd={this.handleAdd} onDelete={this.handleDelete}
									title="Done" tasks={completeTasks}
								/>
							</div>]
						}
					</div>
				</div>
			);
		}
	}

	return App;

}
