import { h, Component } from 'preact';
import style from './style';

export default class Task extends Component {

handleTask = () => {}

render({ title, id, back, forward }) {
	return (
		<div class={style.task}>
			<h2>{title}</h2>
			<button onClick={back}>{'<-'}</button>
			<button onClick={forward}>{'->'}</button>
		</div>
	);
}
}
