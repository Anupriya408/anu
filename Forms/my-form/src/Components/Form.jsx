import React,{useState, useEffect} from 'react'
import Users from './FormList';
const data = {
    "id": "",
    "name": "",
    "email":"",
    "gender":"",
    "image":"",
    "salary": "",
}
const Form = ()=>{
    const [formData, setFormData] = useState(data);
    const [page, setpage] = useState(1);
    const [len, setLen] = useState(1);
    const [load, setLoad] = useState(true);
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState(false);
    const [dltUser, setDlt] = useState(1);

    
    useEffect(()=>{
        getData(page);
    },[page,dltUser])
    
    

    const getData = async (page)=>{
        try{
            let res = await fetch(`http://localhost:3000/users?_limit=5&_page=${page}`);
            let res2 = await res.json();
            setUsers(res2);
            setLoad(false);
        }
        catch(err){
            console.log(err,"err");
            setErr(true);
        }
    }

    useEffect(()=>{
        getLength();
    })
    
    const getLength = async ()=>{
        let res = await fetch(`http://localhost:3000/users`);
        let res2 = await res.json();
        setLen(res2.length);
    }

    const handleChange = (elem)=>{
        const {name,value} = elem.target;
        setFormData({...formData, [name]:value});
    }
    const handleSubmit = (elem)=>{
        elem.preventDefault();
        fetch(`http://localhost:3000/users`,{
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    const handleDelete = (id)=>{
        fetch(`http://localhost:3000/users/${id}`,{
            method: 'DELETE',
        })
        setDlt((prev)=>prev+1);
    }

    if(load){
        return <h1>Loading...</h1>
    }

    if(err){
        return <h1>Error...</h1>
    }

    const handleFilter = async (elem, page)=>{
        let res = await fetch(`http://localhost:3000/users?_limit=5&_page=${page}&title=${elem.target.value}`)
        let res2 = await res.json();
        setUsers(res2);
    }

    const handleSort = async (elem,page)=>{
        let res = await fetch(`http://localhost:3000/users?_limit=5&_page=${page}&_sort=price&_order=${elem.target.value}`)
        let res2 = await res.json();
        setUsers(res2);
    }


    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <label>Name: <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange}/></label><br />
                <label>Email: <input type="text" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange}/> </label>
                <label>Gender: <select name="gender" onChange={handleChange} > 
                    <option value="">Gender</option>
                    <option value="female">female</option>
                    <option value="male">male</option>
                </select>
                </label>
                <br />
                
               
                <label>Image: <input type="url" placeholder="Enter Product Url" name="image" value={formData.image} onChange={handleChange}/></label><br />
                <label>Salary: <input type="text" name="salary" placeholder="enter Salary" value={formData.salary} onChange={handleChange}/></label><br/>
                <button>Submit</button>
            </form>
            <select name="filter" onChange={handleFilter}>
                <option value="">Filter By Gender</option>
                <option value="female">female</option>
                <option value="male">Male</option>
            </select>

            <select name="sort" onChange={handleSort}>
                <option value="">Sort By Price</option>
                <option value="asc">Low to high</option>
                <option value="desc">High to Low</option>
            </select>

            <Users users={users} handleDelete={handleDelete}/>
            <button disabled={page===1} onClick={()=>setpage((prev)=>prev-1)}>Prev</button>
            <button>{page}</button>
            <button  disabled={page===Math.ceil(len/5)} onClick={()=>setpage((prev)=>prev+1)}>Next</button>
        </div>
    )
}
export default Form;