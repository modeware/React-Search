import {FC, useState} from 'react';
import SearchList from '../SearchList/search-list';
import { searchUtil } from './../../utils/searchUtil';

const Search: FC<any> = ({users}) => {
    const [term, setTerm] = useState('');
    const [result, setResults] = useState<any>(null);
    const onChange = (e: any)=>{
        setTerm(e.target.value)
        let data = searchUtil(e.target.value, users)
        
        setResults(data)
    }

    return <div className='box'>
        <input placeholder='Search' className="input-box" value={term} onChange={onChange}/>
        {term ? <SearchList users={result} term={term.toLowerCase()}/>: null}
    </div>
}

export default Search;