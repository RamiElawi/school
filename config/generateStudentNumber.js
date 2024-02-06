const db=require('../models')
const User=db.User;
const generateStudentNumber=async()=>{
    try{
        let stn=await User.max('studentNumber')
            if(stn == null){
                stn="0"
            }
            let inte=parseInt(stn)
            inte +=1
            stn=inte.toString()
            let n=6-stn.length
            for(let i=0;i<n ;i++){
                stn = "0"+stn
            }
            return {stn};
    }catch(err){
        console.log(err)
        return Promise.reject(err);
    }
}

module.exports= generateStudentNumber;