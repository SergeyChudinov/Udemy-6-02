import { Component } from 'react/cjs/react.production.min';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';


// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars()
    }

    updateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then(charList => this.setState({
                charList,
                loading: false
            }))
            .catch(() => this.setState({
                error: true,
                loading: false
            }))
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    render() {
        const {charList, loading, error} = this.state;
        console.log(charList)
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        return (
            <div className="char__list">
                {errorMessage || spinner || items}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;




