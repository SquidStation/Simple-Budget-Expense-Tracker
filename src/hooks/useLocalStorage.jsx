import { useState, useEffect } from 'react'

export default function useLocalStorage( key, defaultValue){
    // initialize app with data  from local storage
    const [value, setValue] = useState( () => {
        const jsonValue = localStorage.getItem(key)

        //return stored local item
        if(jsonValue != null ) return JSON.parse(jsonValue)
        
        //check to see if stored item is a function(execute it) or not
        if(typeof defaultValue === 'function'){
            return defaultValue() //execute stored function
        } else {
            return defaultValue //return stored value
        }
     } )

     //check to see any changes happens to our local values and update states accordingly
     useEffect( ()=>{
        localStorage.setItem(key, JSON.stringify(value))
     }, [key, value] )
     
     
     return [value, setValue]  // return updated state values
}