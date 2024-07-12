import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { changeaccount } from "../store/Slice/Authentication";
export default function Change() {
    const userdata = JSON.parse(localStorage.getItem("data"));
    console.log(userdata.Account_type);
    const [data, setdata] = useState({ Account_type: userdata.Account_type });
    const dispatch = useDispatch();
    async function handlesubmit(type) {
        console.log(type);
        setdata({...data,Account_type:type})
        userdata.Account_type=data.Account_type;
        console.log(userdata);
        localStorage.setItem("data",JSON.stringify(userdata));
        const response = await dispatch(changeaccount(data));
        console.log(response);
    }
    return (
        <>
            {/* <input type="text" value={data.Account_type} onChange={(e)=>(setdata({Account_type:e.target.value}))} />
          <button onClick={handlesubmit}>Click</button> */}
            <div>
                <label className="label cursor-pointer">
                    <span className="label-text">Public</span>
                    <input type="radio" name="radio-10" value="Public" onClick={(e)=>(handlesubmit(e.target.value))} checked={data.Account_type=="Public"} className="radio checked:bg-red-500"  />
                </label>
            </div>
            <div >
                <label className="label cursor-pointer">
                    <span className="label-text">Private</span>
                    <input type="radio" name="radio-10" value="Private" onClick={(e)=>(handlesubmit(e.target.value))} checked={data.Account_type=="Private"} className="radio checked:bg-blue-500"  />
                </label>
            </div>
        </>
    )
}