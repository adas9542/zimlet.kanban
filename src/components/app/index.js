import { h, Component } from 'preact';
import { provide } from 'preact-context-provider';
import { withIntl } from '../../enhancers';
import Column from '../column';
import Sidebar from '../sidebar';
import style from './style';
import wire from 'wiretie';


const TASKS = [
	{ id: 1, title: 'Task #1', percentComplete: 0 },
	{ id: 2, title: 'Task #2', percentComplete: 50 },
	{ id: 3, title: 'Task #3', percentComplete: 0 },
	{ id: 4, title: 'Task #4', percentComplete: 0 },
	{ id: 5, title: 'Task #5', percentComplete: 100 },
	{ id: 6, title: 'Task #6', percentComplete: 100 },
	{ id: 7, title: 'Task #7', percentComplete: 100 }
];


export default function createApp(context) {

	@withIntl
	@provide({ zimbraComponents: context.components })
	@wire('batchClient', ({ folderId }) => ({
		searchResults: ['search', { offset: 0, limit: 1000, types: 'task', query: 'inid:15' }]
	}))
	class App extends Component {

		handleSetPercentComplete = ({ id, percentComplete }) => {
			id = +id;

			let task = TASKS.filter((t) => t.id === id)[0];
			task.percentComplete=percentComplete;
			this.setState({});
			//TODO: update the task with ID to the new percent complete
		}
	
		handleEdit = ({ id, title }) => {
			TASKS.some((t) => {
				if (t.id === id) {
					t.title = title;
					this.setState({});
					return true;
				}
			});
		}

		handleDelete = (id) => {
			//loop over tasks, find the one with id, and change its percent complete
			console.log('handleDelete : I got Delete for task ', TASKS.filter((t) => t.id === id)[0].title); //assuming ids are unique

			for (let i =0; i < TASKS.length; i++)
				if (TASKS[i].id === id) {
					TASKS.splice(i,1);
					break;
				}

			this.setState({});
		}

		handleAdd = (title) => {
			let id = TASKS.reduce((max, { id }) => Math.max(max, id), -1) + 1;

			let percentComplete;
			if (title==='ToDo'){
				percentComplete = 0;
			}
			else if (title==='In Progress'){
				percentComplete = 50;
			}
			else {
				percentComplete = 100;
			}
			TASKS.push({ id, title: 'temp title', percentComplete });

			this.setState({});


		}

		render({ loading, searchResults }) {
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
						{ searchResults && [
							<div class={style.header}>My Board</div>,
							<div class={style.columns}>
								<Column percentComplete={0} onEdit={this.handleEdit} onPercentComplete={this.handleSetPercentComplete} onAdd={this.handleAdd} onDelete={this.onDelete} handleSetPercentComplete={this.handleSetPercentComplete}
									title="ToDo"
									tasks={TASKS.filter((t) => t.percentComplete === 0)}
								/>

								<Column percentComplete={50} onEdit={this.handleEdit} onPercentComplete={this.handleSetPercentComplete} onAdd={this.handleAdd} onDelete={this.handleDelete} handleSetPercentComplete={this.handleSetPercentComplete}
									title="In Progress"
									tasks={TASKS.filter((t) => t.percentComplete === 50)}
								/>

								<Column percentComplete={100} onEdit={this.handleEdit} onPercentComplete={this.handleSetPercentComplete} onAdd={this.handleAdd} onDelete={this.handleDelete} handleSetPercentComplete={this.handleSetPercentComplete}
									title="Done"
									tasks={TASKS.filter((t) => t.percentComplete === 100)}
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
