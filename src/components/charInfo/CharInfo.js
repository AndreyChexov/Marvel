import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';


const CharInfo = (props) => {

    

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
     
     const marvelService = new MarvelService();

     
     useEffect(() => {
        updateChar()
     }, [props.charId])

    //  useEffect((charId) => {
    //     if(props.charId !== charId){
    //         updateChar();
    //      }
    //  }, [])

     const updateChar = () => {
         const{charId} = props;
         if(!charId) {
             return;
         }
         onCharLoading();
         marvelService
         .getCharacter(charId)
         .then(onCharLoaded)
         .catch(onError)
     }


     const onCharLoaded = (char) => {
         setChar(char);
         setLoading(false)    
        
     }

     const onError = () => {
            setLoading(false);
            setError(true);
     }

    const  onCharLoading = () => {
        setLoading(true);
    }


        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMes = error? <ErrorMessage/> : null;
        const spinner = loading? <Spinner/> : null;
        const content = !(error || loading || !char) ? <View char = {char}/> : null;


        return (
            <div className="char__info">
                {content}
                {skeleton}
                {errorMes}
                {spinner}
                
                   
            </div>
        )
}

const View = (char) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char;
    
    return (
        <>
         <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>                      
                <div className="char__descr">
                   {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null: 'There is no comics :('}
                    {
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if(i > 9) return;
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>

                            )
                        })

                    }
                    
                </ul>
        
        </>

    )
}

CharInfo.propTypes = {
  charId: PropTypes.number,
  onCharSelected: PropTypes.func.isRequired

}

export default CharInfo;