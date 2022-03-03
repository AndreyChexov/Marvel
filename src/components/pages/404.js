import ErrorMessage from "../error/ErrorMessage"
import { Link } from "react-router-dom";


const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <Link to='/' style={{'color' : 'Highlight', 'fontSize' : '30px', 'marginLeft' : '420px'}} >Back to previous page</Link>
        </div>
    )
}

export default Page404;