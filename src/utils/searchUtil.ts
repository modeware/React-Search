export const searchUtil = ((term: string, data: any) => {
    term = term.toLowerCase().trim()
    let keys = data ? Object.keys(data[0]) : '' 
    let results: any = []
    let tempString = ''
    let field = null;
    let contains = false;
    for(let val of data) {
        for(const k of keys) {
            
           field = typeof(val[k]) == 'string'? val[k].toLowerCase(): val[k];
           console.log(field);

           let spannedField = addSpansOnAGivenField(field, term, val[k])

           if(spannedField && typeof(spannedField) === 'string'){
            val = {...val, [k]: spannedField, isactive: false}
           }
           else if(spannedField && Array.isArray(spannedField)){
            val = {...val, itemsInArray: spannedField}
           }

            // if(typeof(field) == 'string'){
            // let indexes: any = term?  getIndexOfSearchTerms(field, term) : -1
            // if(indexes !== -1 || indexes.length > 0 )
            //     {field = addSpans(val[k], indexes, term.length)
            //     val = {...val, [k]: field, isactive: false}
            //   }
            // }
            if(typeof(field) === 'string' && field.toLowerCase().includes(term)){
              contains = true;
            }
            else if(spannedField && Array.isArray(spannedField)){
              for(let f of spannedField){
                if(f.toLowerCase().includes(term)){
                  contains = true;
                  break;
                }
              }  
            }
        }
        if(contains){
          results.push(val)

        }
        contains = false

    }
    console.log(results);
    return [...results]
})


const addSpansOnAGivenField = (field:string | Array<any>, term: string, stringToAddSpansOn: string) => {
  
  if(typeof(field) == 'string' && field){
    let indexes: any = term?  getIndexOfSearchTerms(field, term) : -1
    if(indexes !== -1 || indexes.length > 0 )
        {
          return addSpans(stringToAddSpansOn, indexes, term.length)
      }
    }
  else if(Array.isArray(field)){
    let modifiedArray = [];
    for(let f of field){
      console.log("HERE", f)
      let indexes: any = term?  getIndexOfSearchTerms(f.toLowerCase(), term) : -1
      if(indexes !== -1 || indexes.length > 0 )
      {
         modifiedArray.push(addSpans(f, indexes, term.length))
    }
  }

  return modifiedArray;
    }
  
    return null;
}

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
