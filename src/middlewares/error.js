export function errorMiddleWare(err,req,res,next){
    if(!!err){
        return res.status(500).send('HTTP_SERVER_ERROR');
    }
}