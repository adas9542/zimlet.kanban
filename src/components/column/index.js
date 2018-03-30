import { h, Component } from 'preact';
import Task from '../task';
import style from './style';

export default class Column extends Component {

handleTask = () => {}

handleAdd = () => {
	this.props.onAdd(this.props.title);
}

render({ title, tasks, onBack, onForward, onDelete, onAdd, onEdit }) {
	return (
		<div class={style.column}>
			<h1 style="text-align: center;">{title}</h1>
			{
				tasks.map((task) => <Task onBack={onBack} onEdit={onEdit} onForward={onForward} onDelete={onDelete} {...task} />)//...task???
			}
			<button onClick={this.handleAdd}>{'+'}</button>
		</div>
		
	);
}
}
