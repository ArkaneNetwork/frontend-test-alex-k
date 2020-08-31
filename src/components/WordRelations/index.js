import React, { Component } from 'react';
import {
    Button, Col, Form, Row, Table, Alert
} from 'react-bootstrap';
import {connect} from "react-redux";
import {CHANGE_FILTER, ENABLE_REVERSE, SAVE_RELATION_REQUEST} from "../../actions";
import styles from './index.module.css';

const RELATIONS = ['synonym', 'antonym', 'related'];

class WordRelations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            firstWord: '',
            secondWord: '',
            relation: null,
            relationFilter: 'all',
            inverseOption: 'off',
            errorMessage: ''
        }
    }

    validationField = (field) => {
        const regex = /^[A-Za-z\s]+$/;
        if(!regex.test(field)) {
            this.setState({errorMessage: 'You should use only A-Z or a-z letters  and space'})
            return false;
        }

        return true
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({validated: true})
        } else {

            const {firstWord, secondWord, relation} = this.state;
            const checkingStatusFWord = this.validationField(firstWord);
            const checkingStatusSWord = this.validationField(secondWord);
            if(checkingStatusFWord && checkingStatusSWord) {
                const data = {
                    firstWord: firstWord.toLowerCase().trim(),
                    secondWord: secondWord.toLowerCase().trim(),
                    relation
                }
                this.props.saveRelation(data)
            }
        }

    };

    changeField = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    changeFilter = (e) => {
        this.props.changeFilter({type: e.target.value})
    };

    changeInverseStatus = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.props.addReverse();
    }

    render() {
        const {validated, inverseOption, errorMessage} = this.state;
        const {relations} = this.props;

        return (
            <React.Fragment>
                {errorMessage && <Alert key={'alert'} variant={'danger'}>
                    {errorMessage}
                </Alert>}

                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Label>A word</Form.Label>
                            <Form.Control required placeholder="A word" name="firstWord" onChange={this.changeField} />
                        </Col>
                        <Col>
                            <Form.Label>Another word</Form.Label>
                            <Form.Control required placeholder="Another word" name="secondWord" onChange={this.changeField} />
                        </Col>
                        <Col>
                            <Form.Label>Select relation</Form.Label>
                            <Form.Control as="select" name="relation" required placeholder="Select relation" onChange={this.changeField}>
                                <option></option>
                                {RELATIONS.map(elem => <option value={elem}>{elem}</option>)}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit" className={styles['submit-btn-block']}>Save</Button>
                        </Col>
                    </Row>
                </Form>

                <Form>
                    <Row>
                        <Col>
                            <Form.Label>Select relation filter</Form.Label>
                            <Form.Control as="select" name="relationFilter" required
                                          placeholder="Select relation"
                                          onChange={this.changeFilter}>
                                <option value={'all'}>all</option>
                                {RELATIONS.map(elem => <option value={elem}>{elem}</option>)}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Check type="checkbox" name="inverseOption"
                                        className={styles['inverse-mode']}
                                        label="Inverse relation" value={inverseOption === 'on' ? 'off' : 'on'}
                                        onChange={this.changeInverseStatus}/>
                        </Col>
                    </Row>
                </Form>

                {relations.length > 0 && (
                    <div className={styles['relations-table']}>
                        <Table striped bordered hover >
                            <thead>
                            <tr>
                                <th>w1</th>
                                <th>w2</th>
                                <th>relation</th>
                                {inverseOption === 'on' && <th>inversion</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {relations.map(elem =>
                                (<tr>
                                    <td>{elem.firstWord}</td>
                                    <td>{elem.secondWord}</td>
                                    <td>{elem.relation}</td>
                                    {inverseOption === 'on' && <td>{elem.status ? 'yes' : 'no'}</td>}
                                </tr>)
                            )}
                            </tbody>
                        </Table>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { relations } = state;
    return {
        relations: relations.data,
    };
};

const mapDispatchToProps = (dispatch) => ({
    saveRelation: (data) => {
        dispatch({ type: SAVE_RELATION_REQUEST, data });
    },
    changeFilter: (data) => {
        dispatch({ type: CHANGE_FILTER, data });
    },
    addReverse: () => {
        dispatch({ type: ENABLE_REVERSE });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WordRelations);