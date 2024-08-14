


export const isValidName = (name: string): boolean =>{
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}