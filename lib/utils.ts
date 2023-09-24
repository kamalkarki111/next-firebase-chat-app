export const getAvatarName = (str: string)=>{
    str = str.toUpperCase()
    return str.match(/\b(\w)/g); 
}