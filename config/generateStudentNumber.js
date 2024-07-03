const db=require('../models')
const User=db.User;
exports.generateStudentNumber=async()=>{
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

// module.exports= generateStudentNumber;
exports.generateLognInToken=async ()=>{
    try{
        const stn=await generateStudentNumber()
        let a=Math.floor(Math.random() * 9) + 1;
        let b=Math.floor(Math.random() * 9) + 1;
        let c=Math.floor(Math.random() * 9) + 1;
        let d=Math.floor(Math.random() * 9) + 1;
        return `${stn}${a}${b}${c}${d}`
    }catch(err){
        console.log(err)
        return Promise.reject(err)
    }
}