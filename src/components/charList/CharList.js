import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import './charList.scss';


const CharList = (props) => {

    const[charList, setCharList] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);
    const[newItemLoading, setNewItemLoading] = useState(false);
    const[offset, setOffset] = useState(210);
    const[charEnded, setCharEnded] = useState(false);


    
    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []) 

    

   const onRequest = (offset) => {
        onCharListLoading();

        marvelService.getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError)
        
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList] );
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

    }

    const onError = () => {

        setError(true);
        setLoading(false)
    }


    // const onCharLoading = () => {
    //     setLoading(false)
    // }

    

  
    function renderItems (arr) {
          const items = arr.map((item) =>  {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
       
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

        
    const itemsGetting = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? itemsGetting : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long" 
            onClick={() => onRequest(offset)}
            style={{'display': charEnded? 'none' : 'block'}}
            disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;