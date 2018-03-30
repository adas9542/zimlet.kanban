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


render({ title, id, DraggableCard }, { isDraggable, isEditing, newTitle }) {
	return (
		<DraggableCard draggable scrim={false} square={false} data={{ name: id }} >
			<TaskContextMenu onDelete={this.handleDelete} >
				<div class={style.task} key={id}>
					{isEditing ?
						<input type="text" class={style.inputBox} value={newTitle} onInput={this.handleInput} onBlur={this.stopEditing} onKeyDown={this.handleKeyDown} />
						:
						<h2 onDblClick={this.handleDblClick}>{title}</h2>
					}
				</div>
			</TaskContextMenu>
		</DraggableCard>
	);
}
}
