import config from 'config';
import mongoose from 'mongoose';
class Database{
    constructor(){
        this._construct();
    }

    _construct(){
            let dbConfigs = config.get("dbConfig");
            let uri = `mongodb://${dbConfigs.username}:${dbConfigs.password}@${dbConfigs.domain}:${dbConfigs.port}/${dbConfigs.dbname}`;
            mongoose.connect(uri,{
            connectTimeoutMS: 5000,
            useNewUrlParser: true  
            }, (err)=>{
                if(!err){
                        console.log("Connected to DB");
                }
                else{
                    throw new Error(err.message);
                    process.exit(1);
                }
               
            });
        
    }
}
 export default new Database();