import React, { useEffect,useState } from "react";
import {useForm} from 'react-hook-form'
import {MdModeEditOutline} from 'react-icons/md'
import {IoIosSend} from 'react-icons/io'
import {MdCloudUpload} from 'react-icons/md'
function Profile() {

  let [editName,setEditName] = useState(false);
  let [editGender,setEditGender] = useState(false);
  let [editAge, setEditAge] = useState(false);
  let [editHeight, setEditHeight] = useState(false);
  let [editWeight, setEditWeight] = useState(false);
  let [editMobile,setEditMobile] = useState(false);
  let [isUpdated,setIsUpdated] = useState(false)
  //User Details
  let [userName,setUserName] = useState('')
  let [userGender,setUserGender] = useState('')
  let [userAge,setUserAge] = useState('')
  let [userHeight,setUserHeight] = useState('')
  let [userWeight,setUserWeight] = useState('')
  let [userMobile,setuserMobile] = useState('')
  //forms
  const nameForm = useForm();
  const emailForm = useForm();
  const mobileForm = useForm();
  const resumeForm = useForm();
  //handle name edit
//   const handleName = (data)=>{
//     data.roll = stdRoll.toLowerCase();
//     data.field = 'name';
//     console.log(data);
//     fetch
//     .post('http://localhost:3500/student/updateprofile',data)
//     .then((res)=>{
//       setIsUpdated(!isUpdated);
//       console.log('response in student profile~ ',res)
//     })
//     .catch((err)=>{console.log('error in profile~ ',err)})
//     setEditName(!editName)
//   } 
//   //handle email edit
//   const handleEmail = (data)=>{
//     data.roll = stdRoll.toLowerCase();
//     data.field = 'mail';
//     console.log(data);
//     fetch
//     .post('http://localhost:3500/student/updateprofile',data)
//     .then((res)=>{
//       setIsUpdated(!isUpdated);
//       console.log('response in student profile~ ',res)
//     })
//     .catch((err)=>{console.log('error in profile~ ',err)})
//     setEditEmail(false)
//   }
//   //handle mobile edit
//   const handleMobile = (data)=>{
//     data.roll = stdRoll.toLowerCase();
//     data.field = 'mobile';
//     console.log(data);
//     fetch
//     .post('http://localhost:3500/student/updateprofile',data)
//     .then((res)=>{
//       setIsUpdated(!isUpdated);
//       console.log('response in student profile~ ',res)
//     })
//     .catch((err)=>{console.log('error in profile~ ',err)})
//     setEditMobile(false)
//   }
//   useEffect(()=>{
//     const token = localStorage.getItem('token');
//     if(token){
//       fetch
//       .post('http://localhost:3500/verifyLoginToken',{token})
//       .then((res)=>{
//         setStdName(res.data.payload.name);
//         setStdRoll(res.data.payload.roll);
//         setStdBatch(res.data.payload.batch);
//         setStdSection(res.data.payload.section);
//         setStdEmail(res.data.payload.mail);
//         setStdMobile(res.data.payload.mobile);
//         // console.log('response in profile ~',res)
//       })
//       .catch((err)=>{console.log('error in profile ~' , err)})
//     }
//   },[isUpdated])

  
const handleback=()=>{
  window.location.href="/user";
}

  return (
    <div className='container'>
    <div className="row mt-5 ">
        {/* Personal Details */}
        <div className="col-lg-6 mt-0 m-auto p-0 m-0">
          <h3 className='text-start mb-5'>Personal Details</h3>
          <div className="row  p-0 m-0">

            {/* Name */}
              <div className="col-sm-4 text-start p-0 py-1 m-0  ">
                <label htmlFor="name" className='fw-bold'>Name</label>
              </div>

              <form className='row col-sm-8' >
                <div className="col-sm-9 text-start p-0 py-1  m-0">
                  <input 
                    type="text"
                    name="name"
                    id="name" 
                    defaultValue={userName} 
                    disabled={!editName}
                    placeholder="kiran"
                    className='border fw-bold text-dark rounded'
                    {...nameForm.register('name' ,{required:true})}
                  />                  
                </div>  
                <div className="col-sm-3  p-0 m-0 text-start ">
                  {editName?
                  <button type='submit' className="btn text-secondary"><IoIosSend size={'25px'} className='text-success'/></button>: 
                  <button type='button' onClick={(e)=>{e.preventDefault();setEditName(true)}} className='btn text-secondary'><MdModeEditOutline size={'25px'} className='text-warning'/></button>}
                </div>
              </form>
              {nameForm.formState.errors.name?.type==='required' && <p className="text-danger">*This field shouldn't be empty</p> }
            <hr  className='m-1 p-0'/>

            {/* Gender */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="studentRoll" className='fw-bold'>Gender</label>
            </div>
            <form className='row col-sm-8' >
                <div className="col-sm-9 text-start p-0 py-1  m-0">
                  <input 
                    type="text"
                    placeholder="male"
                    className='border fw-bold text-dark rounded'
                    {...nameForm.register('name' ,{required:true})}
                  />                  
                </div>  
                <div className="col-sm-3  p-0 m-0 text-start ">
                  {editGender?
                  <button type='submit' className="btn text-secondary"><IoIosSend size={'25px'} className='text-success'/></button>: 
                  <button type='button' onClick={(e)=>{e.preventDefault();setEditGender(true)}} className='btn text-secondary'><MdModeEditOutline size={'25px'} className='text-warning'/></button>}
                </div>
              </form>
            <hr  className='m-1 p-0'/>
            

            {/* Age */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="section" className='fw-bold'>Age</label>
            </div>
            <form className='row col-sm-8' >
                <div className="col-sm-9 text-start p-0 py-1  m-0">
                  <input 
                    type="number"
                    placeholder="40"
                    className='border fw-bold text-dark rounded'
                    {...nameForm.register('name' ,{required:true})}
                  />                  
                </div>  
                <div className="col-sm-3  p-0 m-0 text-start ">
                  {editAge?
                  <button type='submit' className="btn text-secondary"><IoIosSend size={'25px'} className='text-success'/></button>: 
                  <button type='button' onClick={(e)=>{e.preventDefault();setEditAge(true)}} className='btn text-secondary'><MdModeEditOutline size={'25px'} className='text-warning'/></button>}
                </div>
              </form>
            <hr  className='m-1 p-0'/>

            {/* Height */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="Batch" className='fw-bold'>Height</label>
            </div>
            <form className='row col-sm-8' >
                <div className="col-sm-9 text-start p-0 py-1  m-0">
                  <input 
                    type="number"
                    placeholder="5.1inches"
                    className='border fw-bold text-dark rounded'
                    {...nameForm.register('name' ,{required:true})}
                  />                  
                </div>  
                <div className="col-sm-3  p-0 m-0 text-start ">
                  {editHeight?
                  <button type='submit' className="btn text-secondary"><IoIosSend size={'25px'} className='text-success'/></button>: 
                  <button type='button' onClick={(e)=>{e.preventDefault();setEditHeight(true)}} className='btn text-secondary'><MdModeEditOutline size={'25px'} className='text-warning'/></button>}
                </div>
              </form>
            <hr  className='m-1 p-0'/>

            {/* Weight */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="mail" className='fw-bold'>Weight</label>
            </div>
            <form className='row col-sm-8' >
              <div className="col-sm-9  text-start p-0 py-1  m-0  ">
                <input
                  type="number"
                  placeholder="60kgs"
                  className='border  fw-bold  text-dark rounded'
                  {...emailForm.register('mail' ,{required:true})}
                />
              </div>
              <div className="col-sm-3 p-0 m-0 text-start ">
                {editWeight?
                <button type='submit' className="btn text-secondary"><IoIosSend size={'25px'} className='text-success'/></button>: 
                <button type='button' onClick={(e)=>{e.preventDefault();setEditWeight(true)}} className='btn text-secondary'><MdModeEditOutline size={'25px'} className='text-warning'/></button>}
              </div>
            </form>
            {emailForm.formState.errors.mail?.type==='required' && <p className="text-danger">This field shouldn't be empty</p> }
            <hr  className='m-1 p-0'/>

            {/* Mobile */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="mobile" className='fw-bold'>Mobile</label>
            </div>
            <form className='row col-sm-8' >
              <div className="col-sm-9  text-start p-0 py-1  m-0  ">
                <input 
                  type="number"
                  defaultValue={userMobile} 
                  placeholder="9866619621"
                  disabled={!editMobile}
                  className='border  fw-bold  text-dark rounded'
                  {...mobileForm.register('mobile' ,{required:true , minLength:10 , maxLength:10 })}
                />
              </div>
              <div className="col-sm-3 p-0 m-0 text-start ">
                {editMobile?
                <button type='submit' className="btn text-secondary"><IoIosSend size={'25px'} className='text-success'/></button>: 
                <button type='button' onClick={(e)=>{e.preventDefault();setEditMobile(true)}} className='btn text-secondary'><MdModeEditOutline size={'25px'} className='text-warning'/></button>}
              </div>
            </form>
            {mobileForm.formState.errors.mobile?.type === 'required' && <p className="text-danger">*This field shouldn't empty</p> }
            {mobileForm.formState.errors.mobile?.type === 'minLength' && <p className="text-danger">*This field should have length 10</p> }
            {mobileForm.formState.errors.mobile?.type === 'maxLength' && <p className="text-danger">*This field should have length 10</p> }
            <hr  className='m-1 p-0'/>    
          </div>
          <div>
          <button className="btn btn-success btn-block" style={{fontWeight:"bolder"}}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile