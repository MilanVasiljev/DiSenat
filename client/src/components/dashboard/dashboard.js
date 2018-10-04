import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from "../../actions/profileActions";
import {uploadProfileImage} from "../../actions/profileActions";
import {Link} from 'react-router-dom';
import ProfileActions from './ProfileActions';
import AdminActions from './AdminActions';
import Experience from './Experience';
import Education from './Education';
import BusinessPlan from './BusinessPlan';
import Article from './Article';
import {Collapse} from 'react-collapse';
import Companies from "./Companies";
import renderHtml from 'react-render-html';
import VipCards from "./VipCards";
import TextFieldGroup from "../common/TextFieldGroup";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            isOpenedBP: false,
            isOpenedVIP: false,
            selectedProfileImage: null
        }

    }

    // Right away
    componentDidMount(){
        this.props.getCurrentProfile();
    }




    fileSelectedHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({selectedProfileImage: event.target.files[0]}, () => {
            console.log(this.state.selectedProfileImage)

            if(this.state.selectedProfileImage !== null){
                // console.log(this.state.selectedProfileImage);
                const {user} = this.props.auth;
                const fd = new FormData();
                // console.log(this.state.selectedProfileImage.name);
                let imageName = this.state.selectedProfileImage.name.slice((this.state.selectedProfileImage.name.lastIndexOf(".") - 1 >>> 0) + 2);
                let newName = `${user.id}.${imageName}`;
                // console.log(newName);
                fd.append('profileImage', this.state.selectedProfileImage, newName, document);
                fd.append('id', user.id);


                this.props.uploadProfileImage(fd, this.props.history)

            }
        });
    }

    render(){

        const {user} = this.props.auth;
        let {profile, loading} = this.props.profile;

        let dashboardContent;


        if(profile === null || loading){
            dashboardContent = <h4 className="loading-animation">Ucitavam...</h4>
        } else {
            // Check if user have profile
            if(Object.keys(profile).length > 0){
                // If pass user have profile
                dashboardContent = (

                    <div>
                        <ProfileActions profile={profile}/>

                        {user.role === 'admin' ?
                            <div>
                            <h1 className="profile-manager-buttons-wrapper__heading">Admin Section</h1><hr className="a-bit-of-margin"/>
                                <AdminActions/>
                            </div> : null}

                            <div>
                                <div className="profile-wrapper">
                                    <img className="profile-wrapper__image" src={require(`../../images/${user.avatar}`)} alt=""/>

                                <div className="basic-profile-wrapper">
                                    <h1 className="dashboard-text-h1">Dobrodošli <Link className="dashboard-text" to={`/profile/${profile.handle}`} >{user.firstname} {user.lastname}</Link> </h1>
                                    <h2 className="dashboard-text-h1">Vaš profil:</h2>
                                    <p className="dashboard-text-h1" style={{fontSize: '1.4rem'}}>Ime i prezime: {user.firstname} {user.lastname}</p>
                                    <p className="dashboard-text-h1" style={{fontSize: '1.4rem'}}>Lokacija: {profile.city}, {profile.country}</p>
                                    {profile.phone === '' ? null : <p className="dashboard-text-h1" style={{fontSize: '1.4rem'}}>Telefon: {profile.phone}</p>}
                                </div>


                                </div>

                                <div className="upload-btn-wrapper">
                                    <button className="uploadFilesButton-wrapper">Profilna slika</button>
                                    <input
                                        onChange={(event)=> this.fileSelectedHandler(event)}
                                        className="uploadFilesButton"
                                        placeholder=""
                                        type="file"
                                        accept=".jpg, .jpeg"
                                    />
                                </div>

                            </div>

                        <div className="dashboard__container">
                            {/*<h1 className="dashboard__heading">Dashboard</h1>*/}
                            <Companies companies={profile.ownercompany}/>
                            <Experience experience={profile.experience}/>
                            <Education education={profile.education}/>


                            {user.role === 'admin' ?
                                <div className="expandable-wrapper">
                                    <button className="collapsable dropbtn" onClick={()=> this.setState({isOpenedVIP: !this.state.isOpenedVIP})}>Vip Kartice<i className="fas fa-chevron-circle-down a-bit-of-margin arrow__collapsable"></i></button>
                                    <Collapse isOpened={this.state.isOpenedVIP}>

                                        <VipCards vipcard={profile.vipcard}/>

                                    </Collapse>
                                </div> : null}


                            <div className="expandable-wrapper">
                            <button className="collapsable dropbtn" onClick={()=> this.setState({isOpened: !this.state.isOpened})}>Moji Biznis Planovi<i className="fas fa-chevron-circle-down a-bit-of-margin arrow__collapsable"></i></button>
                            <Collapse isOpened={this.state.isOpened}>
                                <BusinessPlan businessplan={profile.businessplan}/>
                            </Collapse>
                            </div>

                            {user.role === 'admin' ?
                            <div className="expandable-wrapper">
                                <button className="collapsable dropbtn" onClick={()=> this.setState({isOpenedBP: !this.state.isOpenedBP})}>Moji Artikli<i className="fas fa-chevron-circle-down a-bit-of-margin arrow__collapsable"></i></button>
                                <Collapse isOpened={this.state.isOpenedBP}>
                                    <Article article={profile.article}/>
                                </Collapse>
                            </div> : null}


                        </div>

                    </div>

                )
            } else {
                // User is logged in but has no profile
                dashboardContent = (

                    <div className="create-profile-card">
                        <p className="create-profile-card--heading">Dobrodosli {user.firstname} {user.lastname}</p>
                        <p className="create-profile-card--content">Jos uvek nemate profil, molimo vas da ga napravite</p>
                        <Link to='/create-profile' className="create-profile-card--button">Kreirajte profil</Link>
                    </div>

                );
            }
        }

        return(
            <div className="dashboard">
                <div className="dashboard__container">
                    {/*<h1 className="dashboard__heading">Dashboard</h1>*/}
                    {dashboardContent}
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    uploadProfileImage: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
        auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile, uploadProfileImage})(Dashboard);