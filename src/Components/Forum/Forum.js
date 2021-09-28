import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { Link , useParams} from 'react-router-dom';
import axios from  'axios';
import './Forum.css';
import * as Service from '../../service/Authentication' ;
import Aos from 'aos';
import "aos/dist/aos.css";
import MDEditor from '@uiw/react-md-editor';
import Profile from './Profile';
import SoonPage from '../Custom/Soon';

const headers = {'Content-type':  'application/json' , 'Access-Control-Allow-Origin':'*'}

const ForumPage = () => {
    const [state, setState] = useState({posts: []}); 
    const getData = () => {
        axios({
            method: "post",
            url: 'http://localhost/forum/home/edit.php',
            config: {
                headers: headers
            }
        }).then((response)=>{
            let data = response.data;
            setState({...state, posts: data})
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getData();
        if(Service.isAuthenticated()){
            return;
        }else{
            window.location.assign('/')
        }
        Aos.init();
        Aos.refresh();
    }, [])


    return(
        <div className="app-forum-page">
            <div className="app-forum-sidebar">
                <div className="sidebar-links list-group">
                        <Link to='/forum/create-dt' className='list-group-item'>Create Discussion</Link>
                        <Link to='/forum/profile' className='list-group-item'>Profile</Link>
                </div>
            </div>
            <div className="app-forum-main-container">
                <Switch>
                    <Route exact path="/forum/profile" component={Profile} />
                    <Route exact path='/forum' >
                        <React.Fragment>
                            <div className="app-discussion-list" data-aos="zoom-out-left">
                                <h3>Recent Discussion threads</h3>
                                <hr />
                                {state.posts.map((eachDiscussion, index)=>{
                                return <DiscussionItem data-aos="fade-right" key={index} props={eachDiscussion} />;
                            })}
                            </div>
                        </React.Fragment>
                    </Route>
                    <Route exact path="/forum/soon" component={SoonPage}/>
                    <Route exact path="/forum/create-dt" component={DiscussionCreationView}/>
                    <Route exact path={`/forum/:id`} component={DiscussionDetailView}/>
                </Switch>
            </div>
        </div>
    );

}

export default ForumPage;

const DiscussionDetailView = (props) => {
        const {id} = useParams();
        const [state, setState] = useState({'title': '' , 'content': '', 'author': '', 'filename': ''});
        const [preview, setPreView] = useState({image: '', 'willPreview': false}); 
        const getData = () => {
        axios({
            method: "post",
            url: 'http://localhost/forum/home/edit.php',
            data: {'id': id},
            config: {
                headers: headers
            }
        }).then((response)=>{
            let data = response.data;
            console.log(response)
            data.forEach(element => {
                if(element.id === id){
                    console.log(element.FileName)
                    setState({...state, title: element.Title, 
                        content: element.Content,
                        author: element.Author,
                        filename: element.FileName
                    })
                }
            });
        }).catch(err=>{
            console.log(err);
        })

    }

    const downloadFile = () => {
        const url="http://localhost/forum/home/download.php";
        const newHeaders = {'Content-Description': 'File Transfer',
         'Content-Type':'application/octet-stream',
         "Cache-Control": "no-cache, must-revalidate",
         'Expires': 0,
         'Pragma': 'public',
        }
        console.log(state.filename);
        axios({
            method: 'GET',
            url: url,
            params: {'path': state.filename},
            config:{
                headers: newHeaders
            },
            responseType: 'blob'
        }).then(
            (response)=>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                setPreView({...state, image: url});
            })
            .catch((err)=>{console.log(err);})
    }

    const downloadTheFile = () => {
        const link = document.createElement('a');
        link.href = preview.image;
        link.setAttribute('download', state.filename.split('/')[1]);
        document.body.appendChild(link);
        link.click();
    }
    const previewImage =  () => {
        const Image = document.querySelector('.image-preview');
        Image.src = preview.image;
        Image.style.display = 'block';
    }


    useEffect(()=>{
        getData();
        downloadFile();
        Aos.init();
        Aos.refresh();
    }, []);
        return(
            <div className='app-discussion-detail-view-container container-fluid' data-aos="fade-up">
                <h3 className="app-dd-title">{state.title}</h3><hr />
                <p className="app-dd-author">Author: <span>{state.author}</span></p>
                <div className="discussion-detail-body">
                <MDEditor.Markdown source={state.content} />
                    <br /> 
                    <div className="dropdown">
                        {
                            state.filename === 'uploads/' ? <></> :
                            <React.Fragment>
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                <b className="dd-file-attachment">{state.filename.split('/')[1]}</b>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li><button className="dropdown-item" type="button"
                                onClick={() =>{
                                    downloadFile()
                                    downloadTheFile()
                                }}>Download</button></li>
                                <li><button className="dropdown-item" type="button"
                                onClick={()=>{ 
                                    downloadFile();
                                    previewImage();
                                    }}>Preview File</button></li>
                            </ul>
                        </React.Fragment>
                        }
                    </div>
                    <img className="image-preview" style={{display: 'none'}} alt={state.filename.split('/')[1]} />
                </div>
                <div className="discussion-comment-section container-fluid">
                    <div className="comment-view">
                        <hr /> 
                        <h3>Comment Section: </h3>
                        <hr /> 
                    <h4 style={{color: 'lightcoral'}}>Add a Comment to the Discussion thread: </h4><br />
                    <form className="container-fluid">
                        <textarea className="form-control" rows='4'>
                        </textarea>
                        <br/>
                        <button className="btn btn-primary">Add comment</button>
                    </form>
                    <br />
                    </div>
                </div>
            </div>
        );
}

const DiscussionCreationView = () => {
    const dtCreationFormControl = [
        {"name": 'title', 'id': "dtTitle", 'type': 'text'},
        {"name": 'description', 'id': 'editor', 'type': 'editor'},
    ]
    const [state, setState] = useState({'title': '', 'file': ''});
    const [editorValue, setValue] = useState('');
    const onChange =  (event)=>{
            setState({...state, [event.target.name]: event.target.value});
    }
    const uploadFile = (e) => {
            setState({...state, 'file': e.target.files[0]});
    }
    const sendRequest = (e) => {
        let form = new FormData()
        form.append('title', state.title)
        form.append('description', editorValue)
        form.append('file', state.file)
        form.append('id', parseInt(sessionStorage.getItem('uid')))
        const headers = {'Content-type':  'multipart/form-data' , 'Access-Control-Allow-Origin':'*'}
        axios({
            method: 'post',
            url: "http://localhost/forum/home/create.php",
            data: form,
            config: {
                headers: headers
            }
        })
        .then((response)=>{
            console.log(response);
            window.location.assign('/forum');
        }).catch((err)=>{
            console.log(err);
        })
        e.preventDefault();  
    }
    useEffect(()=>{
        Aos.init();
        Aos.refresh();
    }, []) 

    return(
        <div data-aos="flip-up" className="app-discussion-thread-creation-view container">
            <h4>Discussion Thread - Creation Form</h4><hr />
            <div className="container-fluid">
                <form>
                    {dtCreationFormControl.map((eachField, index)=>{
                        return(
                            <div className="mb-3" key={index}>
                            <label htmlFor={`#${eachField.id}`} className="form-label" style={{textTransform: 'uppercase'}}>{eachField.name}</label>
                            {eachField.type === 'editor' ? 
                                ( <MDEditor
                                    value={editorValue}
                                    onChange={setValue}
                                  />)
                                :
                                <input name={eachField.name} 
                                type={eachField.type} 
                                className="form-control" 
                                id={eachField.id} 
                                value={state[eachField.name]}
                                onChange={onChange}
                                  /> 
                                }
                          </div>
                        );
                    })}
                    <input  type="file" name="file" onChange={uploadFile}/><br />
                    <br />
                    <button className="btn btn-primary" onClick={sendRequest}>Create</button>
                </form>
            </div>
        </div>
    );
}
const DiscussionItem = ({props}) =>{

    return(
        <Link to={`/forum/${props.id}`} className="app-discussion-item">
            <div className="discussion-header">
                    <h3 className="discussion-title">{props.Title}</h3>
            </div>
            <div className="discussion-details">
                    <p>Author: {props.Author}</p>
                    <p>Time upated: {'today'}</p>
            </div>
        </Link>
    );

}