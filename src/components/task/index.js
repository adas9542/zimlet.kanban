import { h, Component } from 'preact';
import style from './style';

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

handleKeyDown = (e) => {
	console.log('my event is', e);
	if (e.key === 'Enter') {
		this.setState({ isEditing: false });
		this.props.onEdit({ id: this.props.id, title: this.state.newTitle });
		//do something to submit so it gets updated
	}
}


render({ title, id }, { isEditing, newTitle }) {
	return (
		<div class={style.task}>
			{isEditing ?
				<input type="text" class={style.inputBox} value={newTitle} onInput={this.handleInput} onKeyDown={this.handleKeyDown} />
				:
				<h2 onDblClick={this.handleDblClick}>{title}</h2>
			}
			<button onClick={this.handleBack}>{'<-'}</button>
			<button onClick={this.handleForward}>{'->'}</button>
			<div class={style.right}>
				<button onClick={this.handleDelete}>{'x'}</button>
			</div>
		</div>
	);
}
}
