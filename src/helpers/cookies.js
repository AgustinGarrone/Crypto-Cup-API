
export const createCookie =  (address , signature , res ) => {
    try {
        console.log("Creadas cookies");
        const ONE_DAY_MS = 86400000 
        const TIME_NOW = new Date().getTime()
        res.cookie("Refkey1", address , {
            httpOnly : true,
            expiresIn : "1h",
        })

     
    } catch (error) {
        console.log(error);
    }
}