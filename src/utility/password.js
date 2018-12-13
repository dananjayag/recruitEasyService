import bycrpt from 'bcrypt';

export  function hashPassword(user){
     return new Promise(async(resolve,reject)=>{
      try{
       const Salt = await  bycrpt.genSalt(3);
       const hashedPassword = await bycrpt.hash(user.password,Salt);
       user.password = hashedPassword;
       resolve(user);
      }
      catch(execttion){
        reject(execttion);
        throw new Error(execttion);
      }
       
    })
    
}