import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/layout';
import { Router } from '../../../routes';


class RequestNew extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        loading: '',
        errorMessage: ''
    }

    static async getInitialProps(props){
        const { address } = props.query;

        return { address }; 
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });

        const { description, value, recipient } = this.state;

        const campaign = Campaign(this.props.address);

        try{
            const accounts = await web3.eth.getAccounts();
            
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, 'ether'),
                    recipient
                ).send({
                    from: accounts[0]
                });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);

        } catch(err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    }


    render(){
        return(
            <Layout>
                <h3>Create a new Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                        value = {this.state.description}
                        onChange={event => this.setState({description: event.target.value})}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                        value = {this.state.value}
                        onChange={event => this.setState({value: event.target.value})}/>
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                        value = {this.state.recipient}
                        onChange={event => this.setState({recipient: event.target.value})}/>
                    </Form.Field>

                    <Button primary
                        loading={this.state.loading}
                        disabled={this.state.loading}>
                        Create Request
                    </Button>
                    <Message error header='oh damn' content={this.state.errorMessage}/>

                </Form>

            </Layout>
        );
    }

}
export default RequestNew;