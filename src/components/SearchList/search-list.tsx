import React, { FC , useState, useEffect} from 'react';
import useKeyPress from '../../hooks/useKeyPress';

const SearchList: FC<any> = ({users, term}) => {
    const arrowUpPressed = useKeyPress("ArrowUp");
    const arrowDownPressed = useKeyPress("ArrowDown");
    let [focusedListItem, setFocusedListItem] = useState(0);

    const refs = users.map((data: any)=>{
        return React.createRef()
    })

    useEffect(()=>{
        let flIndex = focusedListItem;
        if(arrowDownPressed){
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
            console.log(arrowDownPressed, "hello")

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
     className={'search-list'} 
     style={{width: '18rem', height:'250px', overflowY:'auto'}}>
        {
        users && users.length ? users.map((user: any, index: number)=>{      
            return (<div
            
                ref={refs[index]}
                tabIndex={0} key={index} 
                        className={`${index === focusedListItem ? 'keyboard-active' : ''}`}
                        onMouseEnter={()=>setFocusedListItem(index)} 
                        onMouseLeave={()=>setFocusedListItem(-1)} 
                        style={{border: "1px solid black", marginLeft:'10px', padding: '10px'}}>
                <div style={{fontWeight:'bold'}} dangerouslySetInnerHTML={{ __html: user.id }}></div>
                <div style={{marginLeft:'1rem'}}> - {user.found? term + ' found in items': null}</div>
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