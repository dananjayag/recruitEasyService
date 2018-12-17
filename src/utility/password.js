import bcrypt from 'bcrypt';

export  function hashPassword(user){
     return new Promise(async(resolve,reject)=>{
      try{
       const Salt = await  bcrypt.genSalt(3);
       const hashedPassword = await bcrypt.hash(user.password,Salt);
       user.password = hashedPassword;
       resolve(user);
      }
      catch(execttion){
        reject(execttion);
        throw new Error(execttion);
      }
       
    })
    
}

export function comparepassword(hash,password){

  return new Promise(async(resolve,reject)=>{
    try{
     const res = await bcrypt.compare(password, hash);
     if(res) {
       resolve(res);
     }
     else{
       reject(res)
     }

    }
    catch(expection){
      reject(expection);
      throw new Error(expection);
    }
     
  })
}