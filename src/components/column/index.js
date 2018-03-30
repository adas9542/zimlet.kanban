import { h, Component } from 'preact';
import cx from 'classnames';
import Task from '../task';
import style from './style';

export default class Column extends Component {

handleTask = () => {}

handleAdd = () => {
	this.props.onAdd(this.props.title);
}

handleDrop = (e) => {
	let taskId = e.dataTransfer.getData('text');
	console.log('Dropped id:', taskId, e);
	//call the approprate onBack/onForward method
	this.props.handleSetPercentComplete({ id: taskId, percentComplete: this.props.percentComplete });
	this.setState({ isHovering: false });
}

handleDragOver = (e) => {

	e.preventDefault();
	// Set the dropEffect to move
	e.dataTransfer.dropEffect = 'move';
	// console.log(e);
	this.setState({ isHovering: true });
	//TODO set state to say we are dragged over which will updated styles
}//2px dashed var(--brand)

dragLeave = (e) => {
	this.setState({ isHovering: false });
	console.log('leaving');
}
render({ percentComplete, onEdit, onPercentComplete, onAdd, onDelete, handleSetPercentComplete, title, tasks }, { isHovering }) {
	return (
		<div class={cx(style.column, isHovering && style.hovering)} onDrop={this.handleDrop} onDragOver={this.handleDragOver}
			ondragleave={this.dragLeave}
		>
			<h1 style="text-align: center;">{title}</h1>
			{
				tasks.map((task) => <Task onEdit={onEdit} onAdd={onAdd} onDelete={onDelete} {...task} />)//...task???
			}
			<button onClick={this.handleAdd}>{'+'}</button>

		</div>
		
	);
}
}
