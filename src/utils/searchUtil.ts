export const searchUtil = ((term: string, data: any) => {
    term = term.toLowerCase().trim()
    let keys = data ? Object.keys(data[0]) : '' 
    let results: any = []
    let tempString = ''
    let index = 0;
    for(let val of data) {
        for(const k of keys) {
          if(k === 'items'){
            tempString = val[k].reduce((acc: any, val: any) => {return acc + val}, '')
          }
            
          let field = typeof(val[k]) == 'string'? val[k].toLowerCase(): tempString.toLowerCase()
            
            if(typeof(field) == 'string'){
            let indexes: any = term?  getIndexOfSearchTerms(field, term) : -1
            if(indexes !== -1 || indexes.length > 0 )
                {field = addSpans(val[k], indexes, term.length)
                val = {...val, [k]: field, isactive: false}
              }
            }
            if(field.toLowerCase().includes(term)){
              console.log(field, term)
              if(k === 'items'){
                val = {...val, [k]: field, found: true}
              }
                if(results.length){
                  results[index] = {...val}
                  index = index + 1
                }else{
                  results.push({...val})
                }
            }
        }
    }

    return [...results]
})

const addSpans = (fields: string, indexes: any, termLength: number) => {
    let result = fields;
    let fieldLength = 0;
    for (const index of indexes) {
      result=
      result.slice(0, index+ fieldLength) +
        `${
          "<span class='highlight'>" +
          result.slice(index + fieldLength, index + termLength + fieldLength) +
          '</span>'
        }` +
        result.slice(index + termLength + fieldLength);
      fieldLength = result.length - fields.length;
    }
    return result;


}

const getIndexOfSearchTerms = (field: string, term: string) => {
    let indexes = [];
    let firstOccurrence = field.indexOf(term);
    if (firstOccurrence === -1) {
      return -1;
    }
    indexes.push(firstOccurrence);
    let anotherOccurrence = 1;
    let termLength = term.length;
    let start = firstOccurrence + termLength;
    for (
      let i = start;
      i < field.length;
      i = anotherOccurrence + 1
    ) {
      anotherOccurrence = field.indexOf(term, i);
      if (anotherOccurrence === -1) {
        return indexes;
      }
      indexes.push(anotherOccurrence);
    }
    return indexes;
  };
