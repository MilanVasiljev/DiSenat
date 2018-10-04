import React from "react";
import { Carousel } from "react-responsive-carousel";

    let Background = 'https://upload.wikimedia.org/wikipedia/commons/b/bf/W%C5%82adys%C5%82aw_Bartoszewski_Wystawa_G%C5%82os_Wolnej_Europy_Senat_RP_01.JPG';

    export default () => (

    <Carousel

        autoPlay
        interval={10000}
        swipeable={true}
        emulateTouch={true}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}>

        {/*<div className="wrap-caroseul">*/}
            {/*<img className="slider" src='https://www.businessnewsdaily.com/images/i/000/007/874/original/free-business-plan-templates.jpg?1421856207' alt=""/>*/}
            {/*<div className="wrap-inside">*/}
            {/*<h1 className="wrap-caroseul__headline">Headline</h1>*/}
            {/*<p className="wrap-caroseul__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>*/}
            {/*</div>*/}
            {/*<div className="wrap-caroseul__button">O DiSenatu</div>*/}
        {/*</div>*/}

        {/*<div>*/}
            {/*<img className="slider" src='http://smallville.com.au/wp-content/uploads/2016/12/rsz_shutterstock_402194665.jpg' alt=""/>*/}
            {/*<h1 className="wrap-caroseul__headline">Headline</h1>*/}
            {/*<p className="wrap-caroseul__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>*/}

            {/*<div className="wrap-caroseul__button">Privilege Club</div>*/}
        {/*</div>*/}
        {/*<div>*/}
            {/*<img className="slider" src='http://ecceconferences.org/wp-content/uploads/2017/11/business-consulting2.jpg' alt=""/>*/}
            {/*<h1 className="wrap-caroseul__headline">Headline</h1>*/}
            {/*<p className="wrap-caroseul__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>*/}

            {/*<div className="wrap-caroseul__button">VIP Cards</div>*/}
        {/*</div>*/}



        <div className="movie_card" id="tomb">
            <div className="info_section">
                <div className="movie_header">
                    {/*<img class="locandina" src={require('../../../images/splogo2.png')}/>*/}
                    <h1>DiSENAT Privrednika JIE</h1>
                    <h4>2018</h4>

                </div>
                <div className="movie_desc">
                    <p className="text">
                        Regionalni inovativni Centar je digitalno udruženje Privilege Club-ova,
                        poslovnih i klubova Dijaspore, organizacija i preduzetnika regiona.
                        Vaše prisustvo u SENAT-u bila bi čast za nas.                    </p>
                </div>
                {/*<p className="contact-button contact-button--1" style={{marginLeft: '2rem', paddingBottom: '2rem'}}>Pročitaj članak</p>*/}
            </div>
            <div className="blur_back tomb_back"></div>
        </div>


        <div className="movie_card" id="tomb">
            <div className="info_section">
                <div className="movie_header">
                    <h1>Privilege Club </h1>
                    <h4>2018</h4>

                </div>
                <div className="movie_desc">
                    <p className="text">
                        Četri osnovna cilja DiSenat-a u regionu su:
                        1. Predstavljanje,  2. Umreženje, 3. Obrazovanje,  4. Članstvo u
                        Privilege Club-u
                        Ako podržavate ove ciljeve, učestvujete aktivno u ovom projektu.
                    </p>
                </div>
                {/*<p className="contact-button contact-button--1" style={{marginLeft: '2rem', paddingBottom: '2rem'}}>Pročitaj članak</p>*/}
            </div>
            <div className="blur_back bright_back"></div>
        </div>

        <div className="movie_card" id="tomb">
            <div className="info_section">
                <div className="movie_header">
                    <h1>MeD Platforma i članovi</h1>
                    <h4>2018</h4>

                </div>
                <div className="movie_desc">
                    <p className="text">
                        Mikroekonomska Diplomatija privrednika će obezbediti svakom članu
                        kluba povelju SENATOR. Svaka VIP kartica imenuje vlasnika
                        Ekonomskim Diplomatom kluba.
                        Obezbedite prepruku za svoju karticu
                    </p>
                </div>
                {/*<p className="contact-button contact-button--1" style={{marginLeft: '2rem', paddingBottom: '2rem'}}>Pročitaj članak</p>*/}
            </div>
            <div className="blur_back" style={{background: `url(${Background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
        </div>






    </Carousel>
)