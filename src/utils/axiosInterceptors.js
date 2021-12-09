import axios from "axios";


export const setupAxiosInterceptors = () => {

    axios.interceptors.request.use(function(config){

        const API_URL = 'http://192.168.0.5:9999'
        
        //for CORS request in development
        config.withCredentials = true
        config.headers['Access-Control-Allow-Credentials'] = true
        config.headers['Access-Control-Allow-Origin'] = true
        

        if(config.url[0] === '/'){
            config.url = API_URL + config.url
        }
        else{
            config.url = API_URL + '/' + config.url
        }
    
        return config;
    
        }, function(error){
            return Promise.reject(error)
        }
    
    )

}



