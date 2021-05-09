import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { Router } from '../routes';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {

    state = {
        value: '',
        loading: false,
        errorMessage: ''
    };

    onSubmit = async (event) => {

        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        const address = this.props.address;

        try{
            const accounts = await web3.eth.getAccounts();

            const campaign = Campaign(address);

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });   

            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            console.log(err);
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: '' });

    };


    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label="Ether"
                        labelPosition="right"
                    />
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary 
                    type="submit"
                    loading={this.state.loading}
                    disabled={this.state.loading}>
                        Contribute!
                </Button>
            </Form>
        );
    }
};

export default ContributeForm;