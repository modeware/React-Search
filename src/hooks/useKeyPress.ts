import {useState, useEffect} from 'react';

const useKeyPress = (targetKey: string) => {
    const [keyPressed, setKeyPressed] = useState(false)

    useEffect(()=>{
        
        const keyDownHandler = ({ key }: any) => {
            if (key === targetKey) {
              setKeyPressed(true);
            }
          };
          const keyUpHandler = ({ key }: any) => {
            if (key === targetKey) {
              setKeyPressed(false);
            }
          };   
        
        window.addEventListener('keydown', keyDownHandler)

        window.addEventListener('keyup', keyUpHandler)

        return () => {
            window.removeEventListener('keydown', keyDownHandler)
    
            window.addEventListener('keyup', keyUpHandler)
        }

    }, [targetKey])

    return keyPressed;
}

export default useKeyPress;