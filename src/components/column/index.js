import { h, Component } from 'preact';
import cx from 'classnames';
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
	//call the approprate onBack/onForward method
	this.props.onChangeStatus({ id: taskId, status: this.props.status });
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
}
render({ onEdit, onAdd, onDelete, title, tasks, ActionButton }, { isHovering }) {
	return (
		<div class={cx(style.column, isHovering && style.hovering)} onDrop={this.handleDrop} onDragOver={this.handleDragOver}
			ondragleave={this.dragLeave}
		>
			 <div class={style.header}>{title}</div>
-                       <div class={style.taskContainer}>
				{
					tasks.map((task) => <Task onEdit={onEdit} onAdd={onAdd} onDelete={onDelete} {...task} />)//...task???
				}
			</div>
			<ActionButton class={style.toggleAdd} monotone icon="plus" onClick={this.handleAdd}>Add Task</ActionButton>
		</div>
		
	);
}
}
