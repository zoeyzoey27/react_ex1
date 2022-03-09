const divTag = document.getElementById("container");

const Member = (props) => {
    const {name, age, handleTranfer, handleEdit} = props;
    return (
        <div className="member-list">
             <div>Name: {props.name} - Age: {props.age}</div>
             <button className="user-list-button" onClick={() => handleTranfer()}>tranfer</button>
             <button className="user-list-button" onClick={() => handleEdit()}>edit</button>
        </div>
    )
}

const INIT_DATA = {
    name: "",
    age: "",
    classType: "react"
}

function Component(props) {
    const [reactMembers, setReactMember] = React.useState([
        {name: "Đinh Tuấn Anh", age: 20},
        {name: "Ngụy Minh Thắng", age: 21},
        {name: "Nguyễn Anh Thư", age: 22}
    ]);

    const [javaMembers, setJavaMember] = React.useState([
        {name: "Bế Trọng Hiếu", age: 20},
        {name: "Ngô Huỳnh Đức", age: 19},
        {name: "Nguyễn Mạnh Dũng", age: 18}
    ]);

    React.useEffect(() => {
        return () => {
           if (reactMembers.length === 0) alert("Warning: React class is empty now")
           else if (javaMembers.length === 0) alert ("Warning: Java class is empty now")
        }
    })

    const tranferReactToJavaMember = (index) => {
        const el = reactMembers[index];
        reactMembers.splice(index, 1);
        javaMembers.push(el);
        setReactMember([...reactMembers]);
        setJavaMember([...javaMembers]);
    }
    const tranferJavaToReactMember = (index) => {
        const el = javaMembers[index];
        javaMembers.splice(index, 1);
        reactMembers.push(el);
        setReactMember([...reactMembers]);
        setJavaMember([...javaMembers]);
    }

    const [formData, setFormData] = React.useState(INIT_DATA)
    const [formEdit, setFormEdit] = React.useState(INIT_DATA)

    function handleInput(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.classType === 'react') {
            reactMembers.push(formData);
            setReactMember([...reactMembers])
        } else {
            javaMembers.push(formData)
            setJavaMember([...javaMembers])
        }
        setFormData(INIT_DATA)
    }

    let isReact = true;
    const handleEditInfo = (name,age,index) => {
        let nameEdit = document.getElementById("nameEdit");
        let ageEdit = document.getElementById("ageEdit"); 
        let indexMember = document.getElementById("index-member"); 
        nameEdit.value=name;
        ageEdit.value=age;
        indexMember.value = index;
        if (!reactMembers.some(el => el.name == nameEdit.value && el.age == ageEdit.value)) isReact = false;
    }

    function handleUpdate(evt) {
        evt.preventDefault();
        let nameEdit = document.getElementById("nameEdit");
        let ageEdit = document.getElementById("ageEdit"); 
        let indexMember = document.getElementById("index-member"); 
        if (nameEdit.value == "" || ageEdit.value == ""){
            alert("Vui lòng nhập đầy đủ thông tin")
        }
        else{
            if (isReact){
                reactMembers.splice(indexMember.value,1, {name: nameEdit.value, age: ageEdit.value});
                setReactMember([...reactMembers]);
            }
            else {
                javaMembers.splice(indexMember.value,1, {name: nameEdit.value, age: ageEdit.value});
                setJavaMember([...javaMembers]);
            }
            nameEdit.value="";
            ageEdit.value="";
        }
    }


    return (
        <div>
            {/* React class */}
            <h1 className="title">List member of React class</h1>
            {reactMembers.length > 0 ? reactMembers.map((user, index) => {
                return <Member name={user.name} age={user.age}
                    key={index} handleTranfer={() => tranferReactToJavaMember(index)} handleEdit = {() => handleEditInfo(user.name,user.age,index)}/>
            }) : <div className="empty-noti">Empty class</div>}

            {/* Java class */}
            <h1 className="title">list member of Java class</h1>
            {javaMembers.length > 0 ?javaMembers.map((user,index) => {
                return <Member name={user.name} age={user.age}
                key={index} handleTranfer={() => tranferJavaToReactMember(index)} handleEdit = {() => handleEditInfo(user.name,user.age,index)}/>
            }) : <div className="empty-noti">Empty class</div> }
            
            {/* Form add member */}
            <h1 className="title">Form add member</h1>
            <form onSubmit={handleSubmit}>
               <div className="info-input">
                  <label> Name: </label>
                  <input type="text" name="name" value={formData.name} onChange={(e) => handleInput(e)} />
                  <label> Age: </label>
                  <input type="text" name="age" value={formData.age} onChange={(e) => handleInput(e)} />
                  <select name="classType" onChange={(e) => handleInput(e)} value={formData.classType}>
                      <option value="react">React class</option>
                      <option value="java">Java class</option>
                  </select>
               </div>
               <input type="submit" value="Add member" />
            </form>

            <h1 className="title">Form edit</h1>
            <form onSubmit={handleUpdate}>
               <input type="text" id="index-member" />
               <div className="info-input">
                  <label> Name: </label>
                  <input type="text" name="nameEdit" id="nameEdit" />
                  <label> Age: </label>
                  <input type="text" name="ageEdit" id="ageEdit" />
               </div>
               <input type="submit" value="Update" />
            </form>
        </div>
    )
}

ReactDOM.render(<div>
    <Component />
    </div>, divTag);
