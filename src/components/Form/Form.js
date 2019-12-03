import React from 'react';
import './Form.css';
import { addHistory } from '../../utils/Utils';

export class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schema: props.schema
        }

        addHistory(props.schema)
    }

    renderField = field => {
        switch (field.type) {
            case 'array':
                return (
                    <div className='form-block'>
                        <h3>{field.label}</h3>
                        <button>Add {field.label}</button>
                        {field.children.map(child => this.renderField(child))}
                    </div>
                )
            case 'group':
                return (
                    <div className='form-group'>
                        <button>Remove {field.label}</button>
                        {field.fields.map(child => this.renderField(child))}
                    </div>
                )
            case 'text':
                return (
                    <div>
                        <label htmlFor='lel'>{field.label}</label>
                        <input type='text'></input>
                    </div>
                )
            case 'number':
                return <input type='number'></input>
            default:
                return <p>lele</p>
        }
    }

    render() {
        return (
            <form>
                {this.state.schema.fields.map(field => this.renderField(field))}
            </form>
        )
    }
}