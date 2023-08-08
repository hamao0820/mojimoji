import { board, body, controller, game, info, next } from './app.css';

function App() {
    return (
        <div className={body}>
            <div className={game}>
                <div className={board}></div>
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
