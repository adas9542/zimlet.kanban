import { h, Component } from 'preact';
import Task from '../task';
import style from './style';

export default class Column extends Component {

handleTask = () => {}

render({ title, tasks, onBack, onForward }) {
	return (
		<div class={style.column}>
			<h1 style="text-align: center;">{title}</h1>
			{
<<<<<<< HEAD
				tasks.map((task) => <Task onBack={onBack} onForward={onForward} {...task} />)//...task???
=======
				tasks.map((task) => <Task onBack={onBack} onForward={onForward} {...task} />)
				
>>>>>>> 6ed758dd35df01dbc1df258557a72b178cc72f3e
			}
		</div>
		
	);
}
}
