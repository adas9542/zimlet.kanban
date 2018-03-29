import { h, Component } from 'preact';
import style from './style';

export default class Task extends Component {

handleTask = () => {}

handleBack = () => {
	this.props.onBack(this.props.id);
}

render({ title, id }) {
	return (
		<div class={style.task}>
			<h2>{title}</h2>
			<button onClick={this.handleBack}>{'<-'}</button>
			<button onClick={this.handleForward}>{'->'}</button>
		</div>
	);
}
}
