import { h, Component } from 'preact';
import wire from 'wiretie';
import style from './style';

@wire('zimbraComponents', null, ({ DraggableCard }) => ({ DraggableCard }))
export default class Task extends Component {

state = {
	newTitle: this.props.title
}

handleTask = () => {}

handleBack = () => {
	this.props.onBack(this.props.id);
}
handleForward = () => {
	this.props.onForward(this.props.id);
}
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


render({ title, id, DraggableCard }, { isEditing, newTitle }) {
	return (
		<DraggableCard draggable square={false} data={{ name: id }} >
			<div class={style.task}>
				{isEditing ?
					<input type="text" class={style.inputBox} value={newTitle} onInput={this.handleInput} onBlur={this.stopEditing} onKeyDown={this.handleKeyDown} />
					:
					<h2 onDblClick={this.handleDblClick}>{title}</h2>
				}
				<button onClick={this.handleBack}>{'<-'}</button>
				<button onClick={this.handleForward}>{'->'}</button>
				<div class={style.right}>
					<button onClick={this.handleDelete}>{'x'}</button>
				</div>
			</div>
		</DraggableCard>
	);
}
}
