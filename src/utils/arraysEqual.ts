export const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if(arr2.includes(arr1[i])){
            return false
        }else{
            return true
        }
    }
    return true;
};