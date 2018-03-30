import { h, Component } from 'preact';
import Task from '../task';
import wire from 'wiretie';
import style from './style';

@wire('zimbraComponents', null, ({ ActionButton }) => ({ ActionButton }))
export default class Column extends Component {

handleTask = () => {}

handleAdd = () => {
	this.props.onAdd(this.props.title);
}

handleDrop = (e) => {
	let taskId = e.dataTransfer.getData('text');
	console.log('Dropped id:', taskId, e);
	//call the approprate onBack/onForward method
	this.props.onSetPercentComplete({ id: taskId, percentComplete: this.props.percentComplete });
}

handleDragOver = (e) => {
	e.preventDefault();
	// Set the dropEffect to move
	e.dataTransfer.dropEffect = 'move';
	// console.log(e);

	//TODO set state to say we are dragged over which will updated styles
}

render({ title, tasks, onBack, onForward, onDelete, onEdit, ActionButton }) {
	return (
		<div class={style.column} onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
			<h1 style="text-align: center;">{title}</h1>
			{
				tasks.map((task) => <Task onBack={onBack} onEdit={onEdit} onForward={onForward} onDelete={onDelete} {...task} />)//...task???
			}
			<ActionButton class={style.toggleAdd} monotone icon="plus" onClick={this.handleAdd}>Add Task</ActionButton>
		</div>
		
	);
}
}
