export const validateEmail = (email)=>{
    const regex = /^[^/s@]+@[^/s@]+\.[^/s@]+$/;
    return regex.test(email);
}

export const getInitials = (name)=>{
    if(!name) return "";
    let words = name.split(" ")
    words = words.filter(entry => entry.trim() !== '');
    let initials = ""
    for(let i=0;i < Math.min(words.length,2);i++){
        initials += words[i][0]
    }
    return initials.toUpperCase();

}