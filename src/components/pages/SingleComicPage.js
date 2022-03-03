import { useParams, Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import '../singleComic/singleComic.scss';


const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);


    const {loading, error, getComics, clearErrors} = useMarvelService();

    useEffect(() => {
        updateComic()
        // eslint-disable-next-line
     }, [comicId])


     const updateComic = () => {
        clearErrors();
         getComics(comicId)
         .then(onComicLoaded)
         
     }

     const onComicLoaded = (comic) => {
        setComic(comic);
           
    }

    
    const errorMes = error? <ErrorMessage/> : null;
    const spinner = loading? <Spinner/> : null;
    const content = !(error || loading || !comic) ? <View comic = {comic}/> : null;


    return (
        <>
            {content}
            {spinner}
            {errorMes}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>

    )
}

export default SingleComicPage;