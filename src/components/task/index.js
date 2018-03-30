import { h, Component } from 'preact';
import TaskContextMenu from '../task-context-menu';
import format from 'date-fns/format';
import isSameYear from 'date-fns/is_same_year';
import { get } from 'lodash';
import wire from 'wiretie';
import style from './style';

@wire('zimbraComponents', null, ({ DraggableCard }) => ({ DraggableCard }))
export default class Task extends Component {

	state = {
		newName: this.props.name
	}

	setRef = (c) => {
		c && setTimeout(() => c.focus(), 10);
	}

	handleTask = () => {}

	handleDelete = () => {
		console.log('In handleDelete', this.props.onDelete);
		this.props.onDelete(this.props.invId);
	}

	handleDblClick = () => {
		this.setState({ isEditing: true });
	}

	handleInput = (e) => {
		this.setState({ newName: e.target.value });
	}

	stopEditing = () => {
		this.setState({ isEditing: false, newName: this.props.name });
	}

	handleKeyDown = (e) => {
		let name = this.state.newName;
		if (e.key === 'Escape' || e.key === 'Enter') {
			this.stopEditing();
		}

		if ( e.key === 'Enter') {
			this.props.onEdit({ id: this.props.invId, name });
		}
	}

	componentWillReceiveProps({ name }) {
		if (name !== this.props.name) {
			this.setState({ newName: name });
		}
	}


	render({ name, id, inst, invId, DraggableCard }, { isDraggable, isEditing, newName }) {

		let dueDate = get(inst, '0.dueDate');
		if (dueDate) dueDate = isSameYear(dueDate, new Date()) ? format(dueDate, 'ddd M/D') : format(dueDate, 'ddd M/D/YYYY');

		return (
			<DraggableCard key={id} class={style.task} draggable scrim={false} square={false} data={{ name: invId }} >
				<TaskContextMenu onDelete={this.handleDelete} >
					<div>
						{isEditing ?
							<input ref={this.setRef} key={id} type="text" class={style.inputBox} value={newName} onInput={this.handleInput}
								onBlur={this.stopEditing}
								onKeyDown={this.handleKeyDown}
							/>
							:
							<div class={style.name} onDblClick={this.handleDblClick}>{name}</div>
						}
						{dueDate && <div class={style.dueDate}>{dueDate}</div>}
					</div>
				</TaskContextMenu>
			</DraggableCard>
		);
	}
}
