import React, { FC , useState, useEffect} from 'react';
import useKeyPress from '../../hooks/useKeyPress';

const SearchList: FC<any> = ({users, term}) => {
    const arrowUpPressed = useKeyPress("ArrowUp");
    const arrowDownPressed = useKeyPress("ArrowDown");
    console.log('AP', arrowUpPressed)
    console.log('DP', arrowDownPressed)
    let [focusedListItem, setFocusedListItem] = useState(-1);
    let [active, setActive] = useState('active');
    const ref: any = React.createRef()
    const refs = users.map((data: any)=>{
        return React.createRef()
    })

    const controlPointer = (action: any) => {
        ref.current.style.cursor = action
    }

    useEffect(()=>{
        let flIndex = focusedListItem;
        if(arrowDownPressed){
            controlPointer('none')
            if(focusedListItem < users.length -1){
                setFocusedListItem(focusedListItem + 1)
                flIndex = focusedListItem + 1
            }else{
                setFocusedListItem(0)
                flIndex = 0
            }
            if(refs.length){
            refs[flIndex].current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start'
              });
            }

        }
    },  [arrowDownPressed])

    useEffect(()=>{
        let flIndex = focusedListItem;
        if(arrowUpPressed){
            controlPointer('none')

            if(focusedListItem < 0){
                setFocusedListItem(0)
                flIndex = 0
            }
            else if(focusedListItem !== 0){
                setFocusedListItem(focusedListItem - 1)
                flIndex = focusedListItem - 1
            }
            else{
                setFocusedListItem(users.length - 1)
                flIndex = users.length - 1

            }
            if(refs.length){
            refs[flIndex].current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'start'
              });
            }
        }
    }, [arrowUpPressed])

  

    return (
     <div 
     ref={ref}
     className={'search-list'} 
     style={{width: '18rem', height:'250px', overflowY:'auto'}}>
        {
        users && users.length ? users.map((user: any, index: number)=>{      
            return (<div
            
                ref={refs[index]}
                tabIndex={0} key={index} 
                        className={`${index === focusedListItem ? 'keyboard-active' : ''}`}
                         onMouseEnter={()=>{setFocusedListItem(index);controlPointer('initial')
                        }} 
                         onMouseLeave={()=>{setFocusedListItem(-1);controlPointer('initial')}} 
                        style={{border: "1px solid black", marginLeft:'10px', padding: '10px'}}>
                <div style={{fontWeight:'bold'}} dangerouslySetInnerHTML={{ __html: user.id }}></div>
                <div style={{marginLeft:'1rem'}}> 
                    - { 
                        user.found ? <>
                            <span className='blue'>{term}</span> 
                            <span>{' found in items'}</span>
                                    </>: null
                      }
                </div>
                <div dangerouslySetInnerHTML={{ __html: user.name }}></div>
                <br/>
                <div dangerouslySetInnerHTML={{ __html: user.address }}></div>
                <div dangerouslySetInnerHTML={{ __html: user.pincode}}></div>
            </div>)
        })

        : <div style={{ marginLeft:'10px', padding: '10px', width: '16rem', height:'200px', border:"1px solid black",  textAlign: 'center'}}>No User Found</div>
        }
        </div>
)
}

export default SearchList;