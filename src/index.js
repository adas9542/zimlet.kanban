import { h } from 'preact';
import { Text } from 'preact-i18n';
import { SLUG } from './constants';
import { withIntl } from './enhancers';
import createApp from './components/app';

export default function Zimlet(context) {
	const { plugins, components } = context;
	const exports = {};
	const App = createApp(context);
	
	exports.init = function init() {
		plugins.register('slot::menu', MenuItem);
		plugins.register('slot::routes', Router);
	};

	// Register a new route with the preact-router instance
	function Router() {
		return [
			<App path={`/${SLUG}/:folderId?`} />
		];
	}

	// Create a main nav menu item
	const MenuItem = withIntl(() => (
		<components.MenuItem
			responsive
			icon="check"
			href={`/${SLUG}`}
		>
			<Text id="my-project.menuItem" />
		</components.MenuItem>
	));

	return exports;
}
