export const  generateRandomString = num => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const result = Math.random().toString(36).substring(0, num);       

    return result;
}

