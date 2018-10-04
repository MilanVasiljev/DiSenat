import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHtml from 'react-render-html';

class EmailList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            profileSelected: ''
        }
        this.onQuillChange = this.onQuillChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.openMail = this.openMail.bind(this);
    }

    componentDidUpdate(){
        if(this.state.profileSelected !== this.props.currentlySelectedUser)
        this.setState({profileSelected: this.props.currentlySelectedUser})
        console.log('selected profile is: ' + this.state.profileSelected + ' i am: ' + this.props.user)
    }

    onQuillChange(e){
        this.setState({text: e})
    }

    onSubmit(e){
        // preventDefault(e);
        console.log('submited')
        this.forceUpdate();
    }

    openMail(e){
        console.log('Mail opened ' + e)
    }



    render() {
        return (
            <div>
                {(this.props.emailSender === this.state.profileSelected || this.props.emailRecipient === this.state.profileSelected)
                    && (this.props.emailSender === this.props.user || this.props.emailRecipient === this.props.user)?
            <div
                onClick={() => this.props.selectEmail(this.props.mailId)}
                className="email-list">
                {/*<h3 className="email-list--title">{this.props.emailSender}</h3>*/}
                {/*<h4>|</h4>*/}

                <h3 className="email-list--title">{this.props.emailTitle}</h3>
                <p className="email-list--content">{renderHtml(this.props.emailMessage.substring(0, 40))}</p>

                <p className="email-list--username">{this.props.username}</p>
            </div> : null}

            </div>
        );
    }
}


EmailList.modules = {
    toolbar: [
        ['link', 'image', 'video']
    ]
};

EmailList.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video', 'code-block'
];

export default EmailList;