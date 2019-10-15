import React from 'react'
import PasswordMask from 'react-password-mask';
import Axios from 'axios';

export default class ApiKey extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            public_api_key : null,
            secret_api_key : null
        }
        this.handleGenerateApiKeys = this.handleGenerateApiKeys.bind(this)
    }
    componentDidMount(){
        Axios.get('/ajax/dashboard/getapikeys')
        .then(Response=>{
            console.log(Response.data)
            this.setState({
                public_api_key : Response.data.public_api_key,
                secret_api_key : Response.data.secret_api_key
            })
        })
    }
    handleGenerateApiKeys (e){
        e.preventDefault();
        Axios.post('/ajax/dashboard/generateapikeys')
        .then(Response=>{
            console.log(Response.data)
            this.setState({
                public_api_key : Response.data.public_api_key,
                secret_api_key : Response.data.secret_api_key
            })
        })
    }
    render() {
        return <div className="col-md-9">
            <div className="aside-main-content">
                <div className="side-cnt">
                    <div className="head-label">
                        <h4>API Keys</h4>
                    </div>
                    <div className="aside-main-cn">
                        <form onSubmit={this.handleGenerateApiKeys}>
                            <div className="form-group">
                                <label htmlFor="public_api_key">Public Key:</label>
                                <PasswordMask
                                    id="password"
                                    name="password"
                                    placeholder="Public API Key"
                                    readOnly
                                    value={this.state.public_api_key}
                                    // onChange={this.handleChange.bind(this)}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="secret_api_key">Secret Key:</label>
                                {/* <input className="form-control" id="secret_api_key" readOnly/> */}
                                <PasswordMask
                                    id="password"
                                    name="password"
                                    placeholder="Secret API Key"
                                    readOnly
                                    value={this.state.secret_api_key}
                                    // onChange={this.handleChange.bind(this)}
                                    />
                            </div>
                            <button type="submit" className="btn btn-primary">{this.state.public_api_key ? 'Re-' : ''}Generate</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    }
}