import { Config } from '../logic/config';

const CrossImage = () => {
    return (
        <img
            src={'img/batsu.png'}
            style={{
                position: 'absolute',
                left: '120px',
                top: 0,
                width: Math.floor(Config.mojiImgWidth),
                height: Math.floor(Config.mojiImgHeight),
                opacity: 0.5,
            }}
        />
    );
};

export default CrossImage;
