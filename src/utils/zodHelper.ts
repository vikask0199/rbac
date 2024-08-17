


export const isValidName = (name: string): boolean =>{
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}


export const isValidRoleAndPermission = (name: string): boolean => {
    const regex = /^[A-Za-z]+(-[A-Za-z]+)*$/; 
    return regex.test(name);
}