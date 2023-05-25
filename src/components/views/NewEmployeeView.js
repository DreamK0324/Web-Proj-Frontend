import { Link } from "react-router-dom/cjs/react-router-dom.min";


const NewEmployeeView = (props) => {
  const {handleChange, handleSubmit, error } = props;

  return (
    <div className="root">
      <div className="formContainer">
        <div className="formFirstname">
          <h2 style={{fontWeight: 'bold', fontFamily: '', fontSize: '20px', color: '#11153e'}}>
            New Employee
          </h2>
        </div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
          <label style= {{color:'#11153e', fontWeight: 'bold'}}>Firstname: </label>
          <input type="text" name="employee_first_name" onChange ={(e) => handleChange(e)} />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Lastname: </label>
          <input type="text" name="employee_last_name" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Department: </label>
          <input type="text" name="department_name" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <button type="submit">
            Submit
          </button>
          <br/>
          <br/>
          <Link to="/employees">Previous Page</Link>
          <br/>
          <br/>
          <Link to="/">Home page</Link>
          
          <br/>
          <br/>
        </form>
        {error!=="" && <p>{error}</p>}
        </div>
      </div>
    
  )
}

export default NewEmployeeView;