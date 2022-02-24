import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
     
     const {loading, error, getCharacter, clearErrors} = useMarvelService();

     
     useEffect(() => {
        updateChar()
        // eslint-disable-next-line
     }, [props.charId])


     const updateChar = () => {
         clearErrors();
         const{charId} = props;
         if(!charId) {
             return;
         }
         
         
         getCharacter(charId)
         .then(onCharLoaded)
         
     }


     const onCharLoaded = (char) => {
         setChar(char);
            
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