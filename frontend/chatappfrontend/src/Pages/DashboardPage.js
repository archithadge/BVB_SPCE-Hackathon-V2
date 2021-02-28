import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
//comment for push
const DashboardPage = (props) => {
    const [chatrooms, setChatrooms] = React.useState([]);
    const [reforms, setReforms] = React.useState([]);
    const inputRef = React.useRef();
    const logoutRef = React.useRef();
    const uploaderRef = React.useRef();
    const textRef = React.useRef();
    const departmentRef = React.useRef();

    const getChatrooms = () => {
        axios.get('http://localhost:8000/chatroom', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then((response) => {
            console.log(localStorage.getItem("Token"));
            console.log(response.data);
            setChatrooms(response.data);
        }).catch((err) => {
            // console.log(err.response);
            console.log(localStorage.getItem("Token"));
            setTimeout(getChatrooms, 10000);
        })
    }

    const getReforms = () => {
        axios.get('http://localhost:8000/reform', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("Token")
            }
        }).then((response) => {
            console.log(response.data);
            setReforms(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const createChatroom = () => {
        console.log('Creating chatroom')
        axios.post('http://localhost:8000/chatroom',
            { name: inputRef.current.value },
            { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } }).then(response => {
                // props.history.push('/dashboard');
                window.location.reload();
            })
    }

    const createReform = () => {
        axios.post('http://localhost:8000/reform', {
            uploader: uploaderRef.current.value,
            text: textRef.current.value,
            department: departmentRef.current.value
        }, { headers: { Authorization: "Bearer " + localStorage.getItem("Token") } }).then((response)=>{
            console.log('success',response.data)
        })
        window.location.reload();
    }

    const logout = () => {
        localStorage.removeItem('Token');
        props.history.push('/login');
    }

    React.useEffect(() => {
        getChatrooms();
        getReforms();
    }, [])
    return (
        <div>
            <input type="text" name="chatroomName" id="chatroomName" ref={inputRef} />
            <button onClick={createChatroom}>Create chatroom</button>
            <h1>Create reform</h1>
            <input type='text' ref={uploaderRef} placeholder='uploader'></input>
            <input type='text' ref={textRef}></input>
            <input type='text' ref={departmentRef}></input>
            <button onClick={createReform}>Post Reform</button>
            {/* <button onClick={getReforms}>Getreform</button> */}
            {reforms.map(reform => (
                <div key={reform._id} >{reform.text}
                    {/* <Link to={"/chatroom/" + chatroom._id}>Join</Link> */}
                </div>
            ))}
            <button ref={logoutRef} onClick={logout}>Logout</button>
        </div>
    );
};

export default withRouter(DashboardPage);