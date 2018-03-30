import { get } from 'lodash';
import { NEED_STATUS, COMPLETE_STATUS } from '../constants';

export function getModifyTaskBody(task, { status, name }) {
	let percentComplete;
	if (status) {
		percentComplete=50;
		if (status === COMPLETE_STATUS) {
			percentComplete=100;
		}
		else if (status === NEED_STATUS) {
			percentComplete=0;
		}
	}
	else {
		status = get(task, 'invitations.0.components.0.status');
		percentComplete = get(task, 'invitations.0.components.0.percentComplete');
	}
	
	const organizer = get(task, 'invitations.0.components.0.organizer');

	const dueDate = get(task, 'invitations.0.components.0.end.0.date');
	const end = !dueDate ? {} : {
		end: {
			date: dueDate
		}
	};

	//fields only set when modifying a task
	let modifyFields = !task.id ? {} : {
		id: task.id,
		modifiedSequence: task.modifiedSequence,
		revision: task.revision
	};

	let desc = get(task, 'invitations.0.components.0.description.0._content');
	let description = !desc  ? {} : {
		mimeParts: {
			contentType: 'multipart/alternative',
			mimeParts: [{
				contentType: 'text/plain',
				content: desc
			}, {
				contentType: 'text/html',
				content: get(task, 'invitations.0.components.0.htmlDescription.0._content')
			}]
		}
	};

	let emailAddresses = organizer ? {
		emailAddresses: [{
			address: organizer.address,
			name: organizer.name,
			type: 'f'
		}] } : {};

	if (!name) name = get(task, 'invitations.0.components.0.name');

	return {
		...modifyFields,
		message: {
			folderId: task.folderId,
			subject: name,
			invitations: {
				components: [
					{
						name,
						priority: get(task, 'invitations.0.components.0.priority'),
						percentComplete,
						status,
						organizer,
						...end,
						class: 'PUB',
						noBlob: true //this tell it to use description for notes instead of full mime parts
					}
				]
			},
			...description,
			...emailAddresses
		}
	};
}

