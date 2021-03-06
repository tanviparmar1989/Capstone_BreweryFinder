import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { baseUrl } from "../../Shared/baseUrl";
import { Modal, Form, Input, Button } from "antd";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};

class PostBreweries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      city: "",
      zipcode: 0,
      phoneNumber: "",
      description: "",
      breweryLogoUrl: "",
      websiteUrl: "",
      userId: 1,
      hours: "",
      lat: 0,
      lng: 0,
    };
  }

  postNewBrewery() {
    const breweryObject = {
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      zipcode: Number(this.state.zipcode),
      phoneNumber: Number(this.state.phoneNumber),
      description: this.state.description,
      breweryLogoUrl: this.state.breweryLogoUrl,
      websiteUrl: this.state.websiteUrl,
      userId: this.state.userId,
      hours: this.state.hours,
      lat: this.state.lat,
      lng: this.state.lng,
    };

    fetch(baseUrl + "/breweries", {
      method: "POST",
      body: JSON.stringify(breweryObject),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "same-origin",
    });
    this.props.updateBreweries(breweryObject);
    this.setState({
      visible: false,
    });
    console.log(breweryObject);
  }

  getRole = (authority) => {
    return { authority };
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    this.setState({
      visible: false,
    });
    this.postNewBrewery();
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <div
          className={
            this.props.user.username !== "admin" ? "hidden" : "center "
          }
        >
          <Button type="primary" onClick={this.showModal}>
            Add Brewery
          </Button>
        </div>
        <Modal
          title="Add Brewery"
          visible={this.state.visible}
          onOk={this.submitHandler}
          onCancel={this.handleCancel}
          okText="Submit"
          cancelText="Cancel"
        >
          <div>
            <Form>
              <Form.Item label="Brewery Name">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                  placeholder="Brewery Name"
                />
              </Form.Item>
              <Form.Item label="Address">
                <Input
                  type="text"
                  id="address"
                  name="address"
                  onChange={(e) => this.setState({ address: e.target.value })}
                  required
                  placeholder="Address"
                />
              </Form.Item>
              <Form.Item label="City">
                <Input
                  type="text"
                  id="city"
                  name="city"
                  onChange={(e) => this.setState({ city: e.target.value })}
                  required
                  placeholder="City"
                />
              </Form.Item>
              <Form.Item label="Phone Number">
                <Input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={(e) =>
                    this.setState({ phoneNumber: e.target.value })
                  }
                  required
                  placeholder="Phone Number"
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea
                  type="text"
                  id="description"
                  name="description"
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  required
                  placeholder="Description"
                />
              </Form.Item>
              <Form.Item label="Logo Url">
                <Input
                  type="text"
                  id="breweryLogoUrl"
                  name="breweryLogoUrl"
                  onChange={(e) =>
                    this.setState({ breweryLogoUrl: e.target.value })
                  }
                  required
                  placeholder="Url"
                />
              </Form.Item>
              <Form.Item label="Website Url">
                <Input
                  type="text"
                  id="website"
                  name="website"
                  onChange={(e) =>
                    this.setState({ websiteUrl: e.target.value })
                  }
                  required
                  placeholder="Website"
                />
              </Form.Item>
              <Form.Item label="Brewer Id">
                <Input
                  type="text"
                  id="userId"
                  name="userId"
                  onChange={(e) => this.setState({ userId: e.target.value })}
                  required
                  placeholder="Assign a Brewer to this Brewery"
                />
              </Form.Item>
              <Form.Item label="Hours">
                <Input
                  type="text"
                  id="hours"
                  name="hours"
                  onChange={(e) => this.setState({ hours: e.target.value })}
                  required
                  placeholder="hours"
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps)(PostBreweries));
