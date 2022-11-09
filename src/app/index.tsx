import {createRoot} from 'react-dom/client';
import {App} from './app';

function render() {
    window.addEventListener('load', () => {
        const container = document.getElementById('root');
        const root = createRoot(container);
        root.render(<App/>);
    })
}

render();
