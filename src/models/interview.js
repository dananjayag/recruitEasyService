import mongoose, {Schema} from 'mongoose';

const interviewSchema = new Schema({
     
      recruiter :{
          type : mongoose.SchemaTypes.ObjectId,
          ref : 'Recruiter'
      },
      candidate : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Candidate'
      },
      role : {
          type : String,
      },
      currentSalary :{
          type : Number,
      },
      expectedSalary : {
          type : Number,
      },
      status : {
          type : String,
          enum : ['Stated','Contacted','In Progress', 'Scheduled', 'Scheduled but Not Attended','Not Cleared Interview', 'Closed By Recruiter', 'Accepted', 'Rejected', 'Joined', 'Accepted but Not Joined' ],
          default : 'Stated'
        },
      skills : {
        type : Array,
      },
      started_at : {
          type : mongoose.SchemaTypes.Date
      },
      last_updated : {
         type : mongoose.SchemaTypes.Date
      }

      
})