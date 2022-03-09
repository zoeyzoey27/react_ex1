const divTag = document.getElementById("container");

const User = (props) => {
    return (
        <div key={props.name}>Name: {props.name} - Age: {props.age}</div>
    )
}

function Component(props) {
    const [reactmems, setReactmems] = React.useState([
        {name: "Đinh Tuấn Anh", age: 20},
        {name: "Ngụy Minh Thắng", age: 21},
        {name: "Nguyễn Anh Thư", age: 22}
    ]);

    const [javamems, setJavamems] = React.useState([
        {name: "Bế Trọng Hiếu", age: 20},
        {name: "Ngô Huỳnh Đức", age: 19},
        {name: "Nguyễn Mạnh Dũng", age: 18}
    ]);
    
    function handleSubmit(evt) {
        evt.preventDefault();
        let nameInput = document.getElementById("nameInput");
        let ageInput = document.getElementById("ageInput");
        if (nameInput.value == "" || ageInput.value == ""){
            alert("Vui lòng nhập đầy đủ thông tin")
        }
        else{
            reactmems.push({name: nameInput.value, age: ageInput.value})
            setReactmems([...reactmems]);
            nameInput.value="";
            ageInput.value="";
        }
    }

    React.useEffect(() => {
        return () => {
           if (reactmems.length == 0) alert("Warning: React class is empty now")
           else if (javamems.length ==0) alert ("Warning: Java class is empty now")
        }
    })

    return (
        <div>
            <h1 className="title">List member of React class</h1>
            <span>{reactmems.length>0 ? reactmems.map((reactmem,index) => {
                var name = reactmem.name;
                var age = reactmem.age;
                return (
                    <div className="user-list">
                       <User key={reactmem.name} name={reactmem.name} age={reactmem.age} />
                      
                       <button
                       onClick={() => {
                       javamems.push({name: name, age: age})
                       reactmems.splice(index,1)
                       setReactmems([...reactmems])}}>tranfer</button>
                    </div>
                )
            }) : "Empty class"}</span>

            <h1 className="title">List member of Java class</h1>
            <span >{javamems.length>0 ? javamems.map((javamem,index) => {
                var name = javamem.name;
                var age = javamem.age;
                return (
                    <div className="user-list">
                       <User key={javamem.name} name={javamem.name} age={javamem.age} />
                      
                       <button
                       onClick={() => {
                       reactmems.push({name: name, age: age})
                       javamems.splice(index,1)
                       setJavamems([...javamems])}}>tranfer</button>
                    </div>
                )
            }) : "Empty class"}</span>
            
            <h1 className="title">Form add member</h1>
            <form onSubmit={handleSubmit}>
               <div className="info-input">
                  <label>
                     Name: <input type="text" id="nameInput"/>
                  </label>
                  <label>
                     Age: <input type="text" id="ageInput" />
                  </label>
               </div>
               <input type="submit" value="add member" />
            </form>
        </div>
    )
}

ReactDOM.render(<div>
    <Component />
    </div>, divTag);
