import { h, Component } from 'preact';
import Task from '../task';
import style from './style';

export default class Column extends Component {

handleTask = () => {}

render({ title, tasks, onBack, onForward }) {
	return (
		<div class={style.column}>
			<h1>{title}</h1>
			{
				tasks.map((task) => <Task onBack={onBack} onForward={onForward} {...task} />)
			}
		</div>
	);
}
}
