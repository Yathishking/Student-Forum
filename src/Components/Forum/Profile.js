import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({'author': '', 'name': '', 'email': ''});
    const getProfileInfo = () => {
        const data =  parseInt(sessionStorage.getItem('uid'))
        axios({
            method: 'post',
            url: 'http://localhost/forum/home/profile.php?id='+data,
        }).then((res)=>{
            console.log(res);
                if(typeof res.data === 'string'){
                    alert(res.data);
                }
                else{
                    setProfile({...profile, author: res.data['Author'],
                     name : res.data['UserName'], 
                     email : res.data['Email']
                    })
                }
        }
        ).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getProfileInfo();
    }, []);

    return(
        <div className="app-user-profile-main-container container">
                <div className="innercontainer">
                    <h4>Profile Info:</h4>
                    <hr />
                    <div className="user-profile-info">
                            <div className="profile-info-block d-block p-2">
                                <p className="d-inline p-2 bg-primary text-white">Author(UserName)</p>
                                <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                                <p className="d-inline p-2 bg-dark text-white">{profile.author}</p>
                            </div>
                            <div className="profile-info-block d-block p-2">
                                <p className="d-inline p-2 bg-primary text-white">Name</p>
                                <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                                <p className="d-inline p-2 bg-dark text-white">{profile.name}</p>
                            </div>
                            <div className="profile-info-block d-block p-2">
                                <p className="d-inline p-2 bg-primary text-white">Email</p>
                                <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                                <p className="d-inline p-2 bg-dark text-white">{profile.email}</p>
                            </div>
                    </div>
                    <br />
                    <div>
                        More Features coming soon
                    </div>
                    <hr />
                </div>
        </div>
    );
}

export default Profile;