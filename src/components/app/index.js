import { h, Component } from 'preact';
import { provide } from 'preact-context-provider';
import { withIntl } from '../../enhancers';
import Column from '../column';
import wire from 'wiretie';
import style from './style';

const TASKS = [
	{ id: 1, title: 'Task #1', percentComplete: 0 },
	{ id: 2, title: 'Task #2', percentComplete: 50 },
	{ id: 2, title: 'Task #3', percentComplete: 100 },
	{ id: 4, title: 'Task #3', percentComplete: 100 }
];

export default function createApp(context) {

	@withIntl
	@provide({ zimbraComponents: context.components })
	@wire('zimbraComponents', null, ({ Sidebar }) => ({ Sidebar }))
	class App extends Component {
	
		handleBack = (id) => {
			console.log('I got back for id ', id);
			//loop over tasks, find the one with id, and change its percent complete
		}

		
		render({ Sidebar }) {
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
							<Column onBack={this.handleBack} title="ToDo" tasks={TASKS.filter((t) => t.percentComplete === 0)} />
							<Column title="In Progress" tasks={TASKS.filter((t) => t.percentComplete === 50)} />
							<Column title="Done" tasks={TASKS.filter((t) => t.percentComplete === 100)} />
						</div>
					</div>
				</div>
			);
		}
	}

	return App;

}
