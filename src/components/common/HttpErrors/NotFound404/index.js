
import { Link } from "react-router-dom"

import '../style.css'

export default function NotFound404(){
    

    return(

        <div className='http_error'>
            <section>
                <h2>404 Page Not Found</h2>
                <p>Sorry, the page you are requested could not be found. <br/> Please go to homepage.</p>
                <Link to='/'>Home</Link>
            </section>
        </div>
        
    )
}