import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from "./actions/authAction";
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import PrivateRoute from './components/common/PrivateRoute';


// Import components
import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
import Landing from './components/pages/landing/landing';
import Register from './components/auth/RegistrationPage';
import Dashboard from './components/dashboard/dashboard';
import {clearCurrentProfile} from "./actions/profileActions";
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from "./components/add-credentials/AddEducation";
import AddBusinessPlan from "./components/add-credentials/AddBusinessPlan";
// import Article from "./components/dashboard/Article";
import AddArticle from "./components/add-credentials/AddArticle";
import Onama from "./components/pages/about/Onama";
import Profiles from "./components/profiles/Profiles";
import Profile from './components/profile/Profile';
import ArticleNews from "./components/articles/ArticleNews";
import Zahtevi from "./components/zahtevi/Zahtevi";
import Berza from "./components/pages/privrednaberza/Berza";
import ArtikalBiznisPlan from "./components/pages/privrednaberza/ArtikalBiznisPlan";
import AddVipCard from "./components/add-credentials/AddVipCard";
import AddCompany from "./components/add-credentials/AddCompany";
import Post from "./components/posts/Post";
import SinglePost from './components/post/Post';
import Blog from "./components/blogs/Blog";
import Companies from "./components/companies/Companies";
import ArtikalKompanija from "./components/companies/artikal/ArtikalKompanija";
import FriendRequests from "./components/friends/friendRequests/FriendRequests";
import Chat from "./components/chat/Chat";
import Friends from "./components/friends/friendList/Friends";
import VipCard from "./components/pages/vipcard/VipCard";
import Email from "./components/mail/Email";
import Footer from "./components/footer/Footer";



// Check for token
if(localStorage.jwtToken){
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        // Logout user
        store.dispatch(logoutUser());
        // Clear current profile
        store.dispatch(clearCurrentProfile());
        // Redirect to main
        window.location.href = '/';
    }
}


class App extends Component {
  render() {
    return (

        <Provider  store={ store }>
            <Router>
              <div className="App">

                {/*<Chat/>*/}

                <Header/>
                  <div>

                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/onama" component={Onama}/>
                    <Route exact path="/vip-card" component={VipCard}/>
                    <Route exact path="/vesti/:vestiId" component={ArticleNews} name="vest"/>
                    <Route exact path="/biznis-plan/:biznisId" component={ArtikalBiznisPlan} name="vest"/>
                    <Route exact path="/kompanije" component={Companies} name="vest"/>
                    <Route exact path="/kompanija-item/:kompanijaId" component={ArtikalKompanija} name="vest"/>


                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    </Switch>

                    <Switch>
                        <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                    </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/edit-profile"
                              component={EditProfile}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/add-experience"
                              component={AddExperience}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/add-education"
                              component={AddEducation}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/add-business-plan"
                              component={AddBusinessPlan}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/add-article"
                              component={AddArticle}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/add-vip-card"
                              component={AddVipCard}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/add-company"
                              component={AddCompany}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/profiles"
                              component={Profiles}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/profile/:handle"
                              component={Profile}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/zahtevi"
                              component={Zahtevi}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/privredna-berza"
                              component={Berza}
                          />
                      </Switch>

                      {/*<Switch>*/}
                          {/*<PrivateRoute*/}
                              {/*exact*/}
                              {/*path="/vip-card"*/}
                              {/*component={VipCard}*/}
                          {/*/>*/}
                      {/*</Switch>*/}

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/postovi"
                              component={Post}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/friend-requests"
                              component={FriendRequests}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/friends-list"
                              component={Friends}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/chat"
                              component={Chat}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/mails"
                              component={Email}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/post/:id"
                              component={SinglePost}
                          />
                      </Switch>

                      <Switch>
                          <PrivateRoute
                              exact
                              path="/blog"
                              component={Blog}
                          />
                      </Switch>




                  </div>

                <Footer/>
              </div>

            </Router>
        </Provider>
    );
  }
}

export default App;
