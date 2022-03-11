const divTag = document.getElementById("container");

const Member = (props) => {
    const {name, age, classType, handleTranfer, handleEdit, handleDelete} = props;
    return (
        <div className="member-list">
             <div>Name: {props.name} - Age: {props.age}</div>
             <button className="user-list-button" onClick={() => handleTranfer()}>tranfer</button>
             <button className="user-list-button" onClick={() => handleEdit()}>edit</button>
             <button className="user-list-button" onClick={() => handleDelete()}>delete</button>
        </div>
    )
}

const INIT_DATA = {
    name: "",
    age: "",
    classType: 'react'
}

const SORT = {
    NO: 0,
    UP: 1,
    DOWN: 2,
}

function Component(props) {
    const [reactMembers, setReactMember] = React.useState(() => {
        const members = JSON.parse(localStorage.getItem("members"));
        if (!members || !members.reactMembers) {
            return []
        }
        return members.reactMembers
    });

    const [javaMembers, setJavaMember] = React.useState(() => {
        const members = JSON.parse(localStorage.getItem("members"));
        if (!members || !members.javaMembers) {
            return []
        }
        return members.javaMembers
    });

    const saveData = () => {
        localStorage.setItem("members", JSON.stringify({
            javaMembers,
            reactMembers,
        }))
    }

    React.useEffect(() => {
        if (javaMembers.length ===0) {
            alert("WARNING: java class is empty now")
        } else if (reactMembers.length === 0) {
            alert("WARNING: react class is empty now")
        }
        saveData();
    } , [reactMembers.length, javaMembers.length])

    const tranferReactToJavaMember = (index) => {
        const el = reactMembers[index];
        el.classType = "java";
        reactMembers.splice(index, 1);
        javaMembers.push(el);
        setReactMember([...reactMembers]);
        setJavaMember([...javaMembers]);
        
       
    }
    const tranferJavaToReactMember = (index) => {
        const el = javaMembers[index];
        el.classType = "react";
        javaMembers.splice(index, 1);
        reactMembers.push(el);
        setReactMember([...reactMembers]);
        setJavaMember([...javaMembers]);
      
    }

    const [formData, setFormData] = React.useState(INIT_DATA)

    const [searchName, setSearchName] = React.useState("");
    const [sortAge, setSortAge] = React.useState(SORT.NO);

    const onEditReactMember = (index) =>{
        setFormData({
            ...reactMembers[index],
            isEdit: true,
            index: index,
            originClassType:  reactMembers[index].classType
            
         })
         inputNameRef.current.focus();
         
    }

    const onEditJavaMember = (index) =>{
        setFormData({
            ...javaMembers[index],
            isEdit: true,
            index: index,
            originClassType: javaMembers[index].classType
        })
        inputNameRef.current.focus();
        
    }

    function handleInput(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.isEdit) {
            const {originClassType, index} = formData;
            console.log(originClassType, formData.classType)
            if (originClassType !== formData.classType) {
                if (formData.classType === 'react') {
                    javaMembers.splice(index, 1);
                    setJavaMember([...javaMembers]);
                    reactMembers.push(formData)
                    setReactMember([...reactMembers])
                } else {
                    reactMembers.splice(index, 1);
                    setReactMember([...reactMembers]);
                    javaMembers.push(formData)
                    setJavaMember([...javaMembers])
                }
            } else {
                if (formData.classType === 'react') {
                    reactMembers[index] = formData;
                    setReactMember([...reactMembers])
                } else {
                    javaMembers[index] = formData;
                    setJavaMember([...javaMembers])
                }
            }
       } else {
            if (formData.classType === 'react') {
                reactMembers.push(formData);
                setReactMember([...reactMembers])
            } else {
                javaMembers.push(formData)
                setJavaMember([...javaMembers])
            }
       }
        setFormData(INIT_DATA)
    }

    const getUsers = (list) => {
        let res = [...list];
        if (searchName) {
             res = res.filter((el) =>  el.name.toLowerCase().includes(searchName.toLowerCase()))
        }
        if (sortAge !== SORT.NO) {
             res.sort((a, b) => {
                 if (sortAge === SORT.UP) {
                     return parseInt(a.age) - parseInt(b.age)
                 } 
                  if (sortAge === SORT.DOWN) {
                     return parseInt(b.age) - parseInt(a.age)
                 }
                 
             })
        }
        return res;
    }

    const reactMemberToRender = React.useMemo(() => getUsers(reactMembers), [reactMembers, sortAge]);
    const javaMemberToRender = React.useMemo(() => getUsers(javaMembers), [javaMembers, sortAge]);

  
    let inputNameRef = React.useRef();
    
    const getSortText = () => {
         if (sortAge === SORT.NO) {
             return "no"
         }
         if (sortAge === SORT.UP) {
             return "up"
         }
         return "down"
    }
 
    const getSortTextCallback = React.useCallback(() => getSortText(), [sortAge])
 
    const handleSort = () => {
        if (sortAge  === SORT.DOWN) {
            setSortAge(SORT.NO)
        }  else if (sortAge  === SORT.NO) {
             setSortAge(SORT.UP)
        } else {
             setSortAge(SORT.DOWN)
        }
    }

    const SortTitle = (props) => {
        React.useEffect(() => {
        }, [props.getSortText])
        return (
            <React.Fragment>Sort: {props.getSortText()}</React.Fragment>
        )
    }

    const  deleteMember = (user,index) => {
         if (reactMembers.includes(user)){
             reactMembers.splice(index,1);
             setReactMember([...reactMembers]);
         }
         else {
             javaMembers.splice(index,1);
             setJavaMember([...javaMembers]);
         }
    }

    return (
        <div>
            <div className="controls">
                <div className="search-box">
                    <input type="text" id="search-input" placeholder="Nhập tên người dùng để tìm kiếm"
                     value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                </div>
                <button onClick={() => handleSort()}><SortTitle getSortText={getSortTextCallback}/></button>
            </div>
            {/* React class */}
            <h1 className="title">List member of React class</h1>
            {reactMembers.length > 0 ? reactMemberToRender==0 ? <div className="empty-noti">Không có dữ liệu</div> : 
            reactMemberToRender.map((user, index) => {
                return <Member name={user.name} age={user.age} classType="react" key={index} 
                       handleTranfer={() => tranferReactToJavaMember(index)} 
                       handleEdit = {() => onEditReactMember(index)}
                       handleDelete = {() => deleteMember(user,index)}/>
            }) : <div className="empty-noti">Empty class</div>}

            {/* Java class */}
            <h1 className="title">List member of Java class</h1>
            
            {javaMembers.length > 0 ? javaMemberToRender==0 ? <div className="empty-noti">Không có dữ liệu</div> : 
            javaMemberToRender.map((user,index) => {
                return <Member name={user.name} age={user.age} classType="java" key={index} 
                        handleTranfer={() => tranferJavaToReactMember(index)} 
                        handleEdit = {() => onEditJavaMember(index)}
                        handleDelete = {() => deleteMember(user,index)}/>
            }) : <div className="empty-noti">Empty class</div> }
            
            {/* Form add member */}
            <h1 className="title">Form manager</h1>
            <form onSubmit={handleSubmit}>
               <div className="info-input">
                  <label> Name: </label>
                  <input type="text" name="name" value={formData.name} onChange={(e) => handleInput(e)}  ref={inputNameRef} />
                  <label> Age: </label>
                  <input type="text" name="age" value={formData.age} onChange={(e) => handleInput(e)} />
                  <select name="classType" onChange={(e) => handleInput(e)} value={formData.classType}>
                      <option value="react">React class</option>
                      <option value="java">Java class</option>
                  </select>
               </div>
               <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

ReactDOM.render(<div>
    <Component />
    </div>, divTag);
