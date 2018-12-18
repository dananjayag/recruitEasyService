import {sanitizeToken,validateToken} from '../utility/jwt';
export async function authMiddleware(req,res,next){
        if (!req.headers.authorization) {
          return res.status(403).json({ error: 'Invalid token'});
        }
        else{
              const  token = sanitizeToken(req.headers.authorization);
              if(!!token){
                     try{
                        const decodedToken = await validateToken(token);
                        if(!!decodedToken)
                        {
                             req.locals={};
                             req.locals.user = decodedToken;
                             next();
                        } 
                     }
                     catch(err){
                        return res.status(403).json({ error: 'Invalid token'}); 
                     }             
                    }
                    
              else{
                  return res.status(403).json({ error: 'Invalid token'}); 
              }
        }
}
