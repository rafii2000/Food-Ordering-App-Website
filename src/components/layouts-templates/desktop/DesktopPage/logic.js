import { useRef} from 'react'
import { useHistory } from 'react-router';



//hook global storage
let cartRef = null;
let sideBarRef = null;
let sideBarToggleButtonRef = null;
let firstImport = true;


const HookInitialization = () => {
    cartRef = useRef()
    sideBarRef = useRef()
    sideBarToggleButtonRef = useRef()
}


export default function useDesktopPage() {
    
    const history = useHistory()

    if(firstImport === true){
        firstImport = false
        HookInitialization()
    }

    const toggleSideBar = () => {

        try {
            cartRef.current.attributes.wobble.value = 1
            sideBarRef.current.classList.toggle('toggle_side_bar')
            sideBarToggleButtonRef.current.classList.toggle('toggle_button--rotate180')
        } catch (error) {
            history.push('/')
        }
           
    }
    
    return{
        cartRef,
        sideBarRef,
        sideBarToggleButtonRef,
        toggleSideBar,
    }
}
