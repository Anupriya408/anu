import "../App.css";
 const Users =({users , handleDelete}) =>{
    
    return (
        <div>
            <h1>Product List</h1>
            {users.map( (elem) => (
                <div key={elem.id} className="user">
                    <img src = {elem.image} alt="" />
                    
                    <h1>{elem.name}</h1>
                    <p>{elem.email}</p>
                    <p>{elem.gender}</p>
                    <p>{elem.salary}</p>
                    
                    <button onClick={ () => handleDelete(elem.id)}>Delete</button>
                </div>
            ))}
            
        </div>
    )
}
export default Users;