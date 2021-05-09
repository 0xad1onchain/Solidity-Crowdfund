import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Router } from '../../routes';


class CampaignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createContract(this.state.minimumContribution)
                .send({
                    from: accounts[0],
                });

            Router.pushRoute('/');
        } catch (err) {
            console.log(err.message);
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit={ this.onSubmit } error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="Wei" 
                            labelPosition="right" 
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                            value={this.state.minimumContribution}
                        />

                    </Form.Field>

                    <Message error header="Oops!" content={ this.state.errorMessage } />

                    <Button 
                        type="submit" 
                        primary 
                        loading={ this.state.loading }
                        disabled={ this.state.loading }>
                            Create!
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;