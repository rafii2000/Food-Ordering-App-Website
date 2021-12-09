
import {HiOutlineRefresh} from 'react-icons/hi'


import '../style.css'

export default function ServiceUnavailable503(){
    
    const iconStyles = {
        fontSize: '21px',
        marginLeft: '5px',
        verticalAlign: 'text-top'
    }

    return(

        <div className='http_error'>
            <section>
                <h2>503 Service Unavailable</h2>
                <p>Sorry, we encountered internal problems. <br/> Try refresh the page or visit our service later</p>
                <button type='button' onClick={() => window.location.reload()}>
                    Refresh <HiOutlineRefresh style={iconStyles}/>
                </button>            
            </section>
        </div>
        
    )
}