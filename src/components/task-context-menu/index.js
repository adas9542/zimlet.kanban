import { h, Component } from 'preact';
import wire from 'wiretie';

@wire('zimbraComponents', null, ({ ContextMenu  }) => ({ ContextMenu }))
export default class TaskItemContextMenu extends Component {
    
	render({ children, onEdit, onDelete, onChange, onToggleDone, disabled, task, ContextMenu }) {
		return  (
			<ContextMenu disabled={disabled} menu={
				<TaskItemContextMenuMenu
					onChange={onChange}
					onToggleDone={onToggleDone}
					onEdit={onEdit}
					onDelete={onDelete}
					task={task}
				/>
			}
			>
				{children}
			</ContextMenu>
		);
	}
}


@wire('zimbraComponents', null, ({ ActionMenuGroup, ActionMenuItem  }) => ({ ActionMenuGroup, ActionMenuItem }))
class TaskItemContextMenuMenu extends Component {
	render({ onEdit, onDelete, onChange, onToggleDone, task, ActionMenuGroup, ActionMenuItem }) {
		return (
			<ActionMenuGroup>
				<ActionMenuItem onClick={onEdit}>
					Edit Task
				</ActionMenuItem>
				<ActionMenuItem onClick={onDelete}>
					DeleteTask
				</ActionMenuItem>
			</ActionMenuGroup>
		);
	}
}
