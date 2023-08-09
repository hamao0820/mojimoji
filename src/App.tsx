import { body, controller, game, info, next } from './app.css';
import Board from './components/Board/Board';

function App() {
    return (
        <div className={body}>
            <div className={game}>
                <Board />
                <div>
                    <div className={next}></div>
                    <div className={controller}></div>
                </div>
            </div>
            <div className={info}></div>
        </div>
    );
}

export default App;
