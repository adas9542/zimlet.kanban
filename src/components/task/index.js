import { h, Component } from 'preact';
import TaskContextMenu from '../task-context-menu';
import wire from 'wiretie';
import style from './style';

@wire('zimbraComponents', null, ({ DraggableCard }) => ({ DraggableCard }))
export default class Task extends Component {

state = {
	newTitle: this.props.title
}

handleTask = () => {}

handleDelete = () => {
	this.props.onDelete(this.props.id);
}

handleDblClick = () => {
	this.setState({ isEditing: true });
}

handleInput = (e) => {
	this.setState({ newTitle: e.target.value });
}

stopEditing = () => {
	this.setState({ isEditing: false, newTitle: this.props.title });
}

handleKeyDown = (e) => {
	let title = this.state.newTitle;
	if (e.key === 'Escape' || e.key === 'Enter') {
		this.stopEditing();
	}

	if ( e.key === 'Enter') {
		this.props.onEdit({ id: this.props.id, title });
	}
}


render({ title, id, dueDate, DraggableCard }, { isDraggable, isEditing, newTitle }) {
	return (
		<DraggableCard class={style.task} key={id} draggable scrim={false} square={false} data={{ name: id }} >
			<TaskContextMenu onDelete={this.handleDelete} >
				<div>
					{isEditing ?
						<input type="text" class={style.inputBox} value={newTitle} onInput={this.handleInput} onBlur={this.stopEditing} onKeyDown={this.handleKeyDown} />
						:
						<div class={style.title} onDblClick={this.handleDblClick}>{title}</div>
					}
					{dueDate && <div class={style.dueDate}>{dueDate}</div>}
				</div>
			</TaskContextMenu>
		</DraggableCard>
	);
}
}
