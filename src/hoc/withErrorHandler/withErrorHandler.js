import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      }

      this.requestInterceptor = axios.interceptors.request.use((request) => {
        this.setState({
          error: null
        }); // Clears errors on request

        return request;
      })

      this.responseInterceptor = axios.interceptors.response.use((response) => {
        return response;
      }, (error) => {
        this.setState({
          error: error
        });
      });
    }

    componentWillUnmount = () => {
      // Clears old interceptors
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      }); // Clears error on close of modal
    }

    render() {
      return (
        <>
          <Modal isModalOpen={this.state.error} activeModal="error" errorMessage={this.state.error ? this.state.error.message : null} toggleModal={this.errorConfirmedHandler} />
          <WrappedComponent {...this.props} />
        </>
      )
    }
  }
}

export default withErrorHandler;
