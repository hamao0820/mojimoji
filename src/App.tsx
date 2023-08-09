import { body, controller, game, info, next } from './app.css';
import Board from './components/Board/Board';
import useGame from './hooks/useGame';

function App() {
    const { positions } = useGame();
    return (
        <div className={body}>
            <div className={game}>
                <Board positions={positions} />
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
