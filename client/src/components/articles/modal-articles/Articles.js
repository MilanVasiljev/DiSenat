import React, {Component} from 'react';

class Articles extends Component {
    render(){
        return(
            <div className="article__content">
                <h3 className="heading-3 margin-bottom-small">Why it's important?</h3>
                <h2 className="heading-2 heading-4--dark margin-bottom-medium">&ldquo;Created by Facebook for Facebook&rdquo;</h2>
                <h3 className="heading-3 model-padding" >Mark Twain</h3>
                <p className="article__text margin-bottom-large">
                    ReactJS is an open source JavaScript library designed by Facebook for creating rich and engaging web apps fast and efficiently. The core objective of ReactJS is providing the best possible rendering performance. Its strength comes from the focus on individual components.                     </p>
                <button className="btn-1">Go to offical site</button>
            </div>
        )
    }
}

export default Articles;