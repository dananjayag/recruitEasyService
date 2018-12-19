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
      job : {
        type :mongoose.SchemaTypes.ObjectId,
        ref : 'Jobs'
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
      started_at : {
        type : mongoose.SchemaTypes.Date
      },
      last_updated : {
         type : mongoose.SchemaTypes.Date
      },
      next_schedule :{
        type : mongoose.SchemaTypes.Date,
        default : null
      },
      past_schedules : [
       {
            date : Date,
            status : {
              type : String,
              enum : ["Completed", "Scheduled"],
              default : "Scheduled"
            }
        }
      ]
     
      
})

const Interview = mongoose.model('Interview',interviewSchema);
export default Interview;