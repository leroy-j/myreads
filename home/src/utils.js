 function mapObject(object) {
  let arr = []
   for(var j in object ){
       arr.push(object[j])
     }
   return arr
 }

export default mapObject