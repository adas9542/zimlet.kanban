import { h, Component } from 'preact';
import { provide } from 'preact-context-provider';
import { withIntl } from '../../enhancers';
import Column from '../column';
import Sidebar from '../sidebar';
import style from './style';

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
	class App extends Component {
	
		handleBack = (id) => {
			//loop over tasks, find the one with id, and change its percent complete
			console.log('handleBack : I got back for id ', TASKS.filter((t) => t.id === id)[0].title); //assuming ids are unique
			let cur_task = TASKS.filter((t) => t.id === id)[0];
			console.log('before changing ', TASKS.filter((t) => t.id === id)[0].percentComplete); //assuming ids are unique
			if (cur_task.percentComplete>=50){
				TASKS.filter((t) => t.id === id)[0].percentComplete-=50;
				console.log('after changing ', TASKS.filter((t) => t.id === id)[0].percentComplete); //assuming ids are unique
				this.setState({});
			}
			else {

			}
			
			//filter out on id and reduce its percent
			// TASKS.filter((t) => t.id === id);

		}
		handleForward = (id) => {
			//loop over tasks, find the one with id, and change its percent complete
			console.log('handleForward : I got forward for id ', TASKS.filter((t) => t.id === id)[0].title); //assuming ids are unique
			let cur_task = TASKS.filter((t) => t.id === id)[0];
			console.log('before changing ', TASKS.filter((t) => t.id === id)[0].percentComplete); //assuming ids are unique
			if (cur_task.percentComplete<=50){
				TASKS.filter((t) => t.id === id)[0].percentComplete+=50;
				console.log('after changing ', TASKS.filter((t) => t.id === id)[0].percentComplete); //assuming ids are unique
				this.setState({});
			}
			else {

			}
		}
		handleDelete = (id) => {
			//loop over tasks, find the one with id, and change its percent complete
			console.log('handleDelete : I got Delete for task ', TASKS.filter((t) => t.id === id)[0].title); //assuming ids are unique
			
			for (let i =0; i < TASKS.length; i++)
				if (TASKS[i].id === id) {
					TASKS.splice(i,1);
					break;
				}

			console.log('after deleting: ',TASKS);
			this.setState({});
		}

		handleAdd = (title) => {
			// let last_element = TASKS[TASKS.length - 1];
			// let last_id = last_element.id;
			let max = -1;
			for (let i =0; i < TASKS.length; i++)
				if (TASKS[i].id > max) {
					max = TASKS[i].id;
					
				}

			let new_percent;
			if (title==='ToDo'){
				new_percent = 0;
			}
			else if (title==='In Progress'){
				new_percent = 50;
			}
			else {
				new_percent = 100;
			}
			let new_task = { id: max+1, title: 'temp title', percentComplete: new_percent };
			
			
			TASKS.push(new_task);

			this.setState({});


		}
		
		render({ folderId }) {
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
						<h2>My Board</h2>
						<div class={style.columns}>
							<Column onBack={this.handleBack} onForward={this.handleForward} onDelete={this.handleDelete} onAdd={this.handleAdd} title="ToDo" tasks={TASKS.filter((t) => t.percentComplete === 0)} />

							<Column onBack={this.handleBack} onForward={this.handleForward}onDelete={this.handleDelete} onAdd={this.handleAdd} title="In Progress" tasks={TASKS.filter((t) => t.percentComplete === 50)} />

							<Column onBack={this.handleBack} onForward={this.handleForward} onDelete={this.handleDelete} onAdd={this.handleAdd} title="Done" tasks={TASKS.filter((t) => t.percentComplete === 100)} />
						</div>
					</div>
				</div>
			);
		}
	}

	return App;

}
