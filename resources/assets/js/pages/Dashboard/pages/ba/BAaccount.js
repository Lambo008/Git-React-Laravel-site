import React, { Component } from "react";
import axios from "axios";

const vStyle = {
  color : 'red',
};

class BAaccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_ba_memeber: false,
      prop_id: null,
      ota_password: null,
      api_key: null,
      prop_key: null,
      is_bin_enable: false,
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  

  componentWillMount() {
    fetch("/ba/account/get_ba_credential")
      .then(response => response.json())
      .then(data => {
        // var res = response.data;
        console.log(data);
        if (data.success == false) {
          
        } else {
          var param = data.data;
          this.setState({
            is_ba_memeber: true,
            prop_id : param.prop_id,
            ota_password : param.ota_password,
            api_key : param.api_key,
            prop_key : param.prop_key,
            is_bin_enable : param.is_bin_enable,
          });
          console.log(param);
        }
        
      })
      .catch(error => {
        console.log(error);
      });
  }

  onClickUpdate(event) {
    axios.get("/ba/api/update").then(response => {
      var res = response.data;
      if (res.success == false) {
        alert("Not success");
      } else {
        alert("Success");
      }
    });
  }

  handleChecked(event) {
    this.setState({
      is_bin_enable : !this.state.is_bin_enable,
    });
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fieldVlaue = event.target.value;

    this.setState({
      [fieldName] : fieldVlaue,
    });
  }

  handleSubmit(event){
    event.preventDefault();
 
    axios.post('/ba/account/register', {
      prop_id:this.state.prop_id,
      ota_password:this.state.ota_password,
      api_key : this.state.api_key,
      prop_key: this.state.prop_key,
      is_bin_enable : this.state.is_bin_enable
    }).then(function(response){
      console.log('aaa');
    });
  }
  render() {
    return (
      <div className="col-md-8 col-sm-8 col-lg-8">
        <div className="panel">
          <div className="panel panel-header">
            <h1>Booking Automation Credential Info</h1>
          </div>
          <div className="panel panel-body">
            <div>
              <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                  <label className="col-sm-4">Prop ID</label>
                  <input
                    type="text"
                    placeholder="prop_id"
                    name="prop_id"
                    onChange={this.handleChange}
                    defaultValue={this.state.prop_id || ""}
                  />
                </div>

                <div className="form-group">
                  <label className="col-sm-4">OTA Password</label>
                  <input
                    type="text"
                    placeholder="OTA password"
                    name="ota_password"
                    onChange={this.handleChange}
                    defaultValue={this.state.ota_password || ""}
                  />
                </div>

                <div className="form-group">
                  <label className="col-sm-4">APIKey</label>
                  <input
                    type="text"
                    placeholder="api_key"
                    name="api_key"
                    onChange={this.handleChange}
                    defaultValue={this.state.api_key || ""}
                  />
                </div>

                <div className="form-group">
                  <label className="col-sm-4">PropKey</label>
                  <input
                    type="text"
                    placeholder="propkey"
                    name="prop_key"
                    onChange={this.handleChange}
                    defaultValue={this.state.prop_key || ""}
                  />
                </div>

                <div className="form-group">
                  <input type="checkbox" 
                          name="is_bin_enable" 
                          checked={ this.state.is_bin_enable } 
                          onChange={this.handleChecked} style={{ verticalAlign: "initial"}}/>
                  <label>Enable Book it now?</label>
                </div>

                <div className="form-group">
                  <button className="btn btn-success" type="submit">
                    Save
                  </button>
                  <button className="btn btn-danger" type="reset">
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BAaccount;