import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';


// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        newItemLoading: false,
        error: false,
        offset: 210,
        charEnded: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
        window.addEventListener('scroll', this.showModalByScroll);
    }
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.showModalByScroll); 
    // }
    // showModalByScroll() {
    //     console.log('skroll')
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         this.onRequest()
    //         window.removeEventListener('scroll', this.showModalByScroll); 
    //     }
    // }
    onRequest = () => {
        // this.foo.bar = 0;
        this.onCharListLoading()
        this.marvelService.getAllCharacters(this.state.offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;   
        }
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }
    onError = () => {
        this.setState({
            loading: false,
            newItemLoading: false,
            error: true
        });
    }
    onCharSelected = (id) => {
        this.props.onCharSelected(id);
    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li onClick={() => this.onCharSelected(item.id)} 
                // <li onClick={() => this.props.onCharSelected(item.id)} 
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
        let {charList, loading, error, newItemLoading, charEnded} = this.state;
        console.log(charList)
        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const text = <p style={{fontSize: 20, marginTop: 40}}>you unlocked all the characters</p>
        const unlockedAll = charEnded ? text : null;
        if (loading) {
            newItemLoading = !newItemLoading;
        }
        const newSpinner = newItemLoading ? <Spinner/> : null;
        const button = <button onClick={this.onRequest} className="button button__main button__long">
                            <div className="inner">load more</div>
                        </button>
        return (
            <div className="char__list">
                {errorMessage || spinner || items}
                {newSpinner}
                {unlockedAll || button}
            </div>
            // style={{'display': charEnded ? 'none' : 'block'}}
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;




