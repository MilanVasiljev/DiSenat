import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Truncate from 'react-truncate';
import renderHTML from 'react-render-html';


class Kompanija extends Component {
    render(){

        const {profile} = this.props;
        const {matchId} = this.props;
        let articles, smallArticles, firstArticleId;


        for(let i = 0; i < profile.ownercompany.length; i++) {
            if(profile.ownercompany[i]._id === matchId){
                articles = (

                    <div className="read-article-wrapper">

                        <div class="card-news">
                            <div class="thumbnail"><img class="left" src={profile.ownercompany[i].imageurl}/></div>
                            <div class="right" style={{padding: '0', marginTop: '-10rem'}}>
                                <h1 className="news-header-1">{profile.ownercompany[i].name}</h1>
                                <div class="separator"></div>

                                <div className="news-paragraph kompanija-podaci">
                                    <h2 className="">Podaci o kompaniji:</h2>
                                    <p><b>Polje rada: </b> {profile.ownercompany[i].fieldofwork}</p>
                                    <p><b>Drzava: </b> {profile.ownercompany[i].country}</p>
                                    <p><b>Grad: </b> {profile.ownercompany[i].city}</p>
                                    <p><b>Adresa: </b> {profile.ownercompany[i].address}</p>
                                    <p><b>Telefon: </b> {profile.ownercompany[i].phone}</p>
                                    <p><b>Email: </b> {profile.ownercompany[i].email}</p>
                                    <p><b>Web sajt: </b> {profile.ownercompany[i].website}</p>
                                    <Link to={`/profile/${profile.ownercompany[i].handle}`}><b style={{color: 'blue'}}>Kontaktirajte vlasnika kompanije</b></Link>

                                </div>

                            </div>


                            <p className="news-paragraph">
                                {renderHTML(profile.ownercompany[i].description)}
                            </p>

                            {/*<button className="contact-button bus-button" style={{alignSelf: 'center', marginBottom: `3rem`, marginLeft: '3rem'}}>Zainteresovan sam za saradnju</button>*/}
                            <Link to="/" class="circlefab"><i class="fa fa-arrow-left fa-3x"> </i></Link>
                        </div>

                    </div>
                )
                firstArticleId = profile.ownercompany[i]._id;
                break;
            }
        }

        return(
            <div>
                <div>
                    {articles}
                </div>
            </div>
        )
    }
}

Kompanija.propTypes = {
    profile: PropTypes.object.isRequired
}

export default Kompanija;