import mongoose, {Schema} from 'mongoose';
import Joi from 'joi';

const roundSchema = new Schema({
  round :{
    type : Number,
  },
  interview: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Interview',
  },
  scheduledAt: {
    type: Date,
  },
  type: {
    type: String,
  },
  interviewerName:{
    type: String,
  },
  interviewerEmail:{
    type: String,
  },
  status : {
    type : String,
    enum : ['Over', 'Yet to be Done'],
    default : 'Yet to be Done', 
  },
  comments: {
    type : String,
  }
})

const Round = mongoose.model('Round',roundSchema);

const interviewSchema = new Schema({
      recruiter :{
          type : mongoose.SchemaTypes.ObjectId,
          ref : 'Recruiter'
      },
      candidate : {
        ref : 'Candidate',
        type: mongoose.Schema.Types.ObjectId,
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
          enum : ["Contacted","In_Progress","Scheduled","Scheduled_but_Not_Attended","Not_Cleared_Interview","Closed_By_Recruiter","Accepted","Rejected","Joined","Accepted_but_Not_Joined"],
          default : 'Contacted'
      }, 
      rounds: [Round.schema],
})

const Interview = mongoose.model('Interview',interviewSchema);


export const  schema = {
  job: Joi.string().required(),
  recruiter: Joi.string().required(),
  candidate: Joi.string().required(),
  currentSalary: Joi.number(),
  expectedSalary: Joi.number(),
  status: Joi.string(),
}


export function validateInterview(interview){
  return Joi.validate(interview, schema)
}

export default Interview;