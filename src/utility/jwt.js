import config from 'config';
import jwt from 'jsonwebtoken';
const jwtSecret = config.get("jwtsecret");

export function generateJwtToken(payload){
   return new Promise(async (resolve,reject)=>{
        try{
            const  token =  await jwt.sign(payload,jwtSecret,{ algorithm: 'HS256'});
            if(token){
                resolve({token});
            }
            else{
                reject(err);
            }
        }
        catch(err){
            reject(err);
        }
   })
    
}

export function validateToken(token){
    return new Promise(async(resolve,reject)=>{
        jwt.verify(token,jwtSecret,(err,decoded)=>{
            if(!err){
                resolve(decoded);
            }
            else{
                reject(null)
            }
        });
    })

}


export  function sanitizeToken(token){
    /*
       @@token should start with key 'Authorization'
    */
    if(!!token && token.indexOf('Authorization')>=0){
          let splitArray = token.trim().split(' ');
          if(!!splitArray[splitArray.length-1]){
               return splitArray[splitArray.length-1];
          }
          else{
              return null;
          }
    }
    else{
        return null;
    }
}