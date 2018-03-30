import { h, Component } from 'preact';
import wire from 'wiretie';
import style from './style';
import {
	TOP_LEVEL_TASKS_FOLDER,
	VIEW,
	SLUG
} from '../../constants';

// import style from './style';

@wire('zimbraComponents', null, ({ Sidebar, FolderList }) => ({ Sidebar, FolderList }))
export default class Sidebar extends Component {
	static defaultProps = {
		specialFolderList: [ 'tasks' ]
	};

	isRenameAllowed = (Menu) => false;

	render({ currentFolderId, specialFolderList, hiddenFolderList, customContextMenus, FolderList, Sidebar }) {
		return (
			<Sidebar
			header={false}
			class={style.sidebar}
			>
				<FolderList
					indexFolderName={TOP_LEVEL_TASKS_FOLDER}
					isRenameAllowed={this.isRenameAllowed}
					urlSlug={SLUG}
					view={VIEW}
					specialFolderList={specialFolderList}
					hiddenFolderList={hiddenFolderList}
					// defaultContextMenu={NotebookContextMenu}
					customContextMenus={customContextMenus}
					dropEffect="move"
					onDrop={this.handleNoteListDrop}
					urlSuffixProp="id"
				/>
			</Sidebar>
		);
	}
}
