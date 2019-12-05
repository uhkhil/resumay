import React from 'react';
import { cloner, now } from '../../utils/Utils';
import { Modal } from '../Modal/Modal';

export class ExperienceEditModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            originalCompanies: cloner(props.data),
            companies: cloner(props.data)
        };
    }

    removeCompany = idx => {
        const arr = cloner(this.state.companies);
        arr.splice(idx, 1)
        this.setState({ companies: arr })
    }

    addCompany = () => {
        const arr = cloner(this.state.companies)
        const newObj = {
            title: '',
            companyName: '',
            startDate: '',
            endDate: '',
            description: '',
            projects: []
        }
        arr.push(newObj);
        const idx = arr.length - 1;
        this.setState({ companies: arr }, () => { this['ref' + idx].scrollIntoView({ behavior: 'smooth' }) })
    }

    removeProject = (companyIdx, projectIdx) => {
        const arr = cloner(this.state.companies);
        arr[companyIdx].projects.splice(projectIdx, 1)
        this.setState({ companies: arr })
    }

    addProject = (companyIdx) => {
        const arr = cloner(this.state.companies)
        const newObj = {
            projectName: '',
            link: '',
            date: '',
            description: ''
        }
        arr[companyIdx].projects.push(newObj);
        const idx = arr[companyIdx].projects.length - 1;
        this.setState({ companies: arr }, () => { this['ref' + companyIdx + idx].scrollIntoView({ behavior: 'smooth' }) })
    }

    trySubmit = async () => {
        this.submitButton.click();
    }

    submit = async ev => {
        ev.preventDefault();
        const data = this.state.companies;
        this.setState({ loading: true });
        const updated = await this.props.update({ experiences: data });
        this.setState({ loading: false });
        if (updated) {
            this.props.toggleModal();
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const id = target.dataset.id
        const compid = parseInt(target.dataset.compid);
        let projectId;
        if (id !== undefined) {
            projectId = parseInt(id)
        }
        const companies = cloner(this.state.companies);
        if (projectId !== undefined) {
            companies[compid].projects[projectId][target.name] = target.value;
        } else {
            companies[compid][target.name] = target.value;
        }
        this.setState({ companies })
    }

    renderProjectForm = (project, compIdx, idx) => (
        <div key={compIdx + idx} className='form-block' ref={el => this['ref' + compIdx + idx] = el}>
            <span className='button-remove' onClick={this.removeProject.bind(null, compIdx, idx)}><i className='fa fa-times'></i></span>
            <div className='form-group'>
                <div className='form-control'>
                    <label>Project Name*</label>
                    <input type='text' maxLength='30' required value={project.projectName} onChange={this.handleChange} data-id={idx} data-compid={compIdx} name='projectName' />
                </div>
                <div className='form-control'>
                    <label>Project link</label>
                    <input type='text' maxLength='30' value={project.link} onChange={this.handleChange} data-id={idx} data-compid={compIdx} name='link' />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-control'>
                    <label>Date*</label>
                    <input type='date' max={now()} required value={project.date} onChange={this.handleChange} data-id={idx} data-compid={compIdx} name='date' />
                </div>
            </div>
            <div className='form-group'>
                <div className='form-control'>
                    <label>Description</label>
                    <textarea maxLength='500' value={project.description} onChange={this.handleChange} data-id={idx} data-compid={compIdx} name='description' />
                </div>
            </div>
        </div>
    )

    renderCompanyForm = (company, idx) => {
        return (
            <div key={idx} className='form-block' ref={el => this['ref' + idx] = el}>
                <span className='button-remove' onClick={this.removeCompany.bind(null, idx)}><i className='fa fa-times'></i></span>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Title*</label>
                        <input type='text' maxLength='30' required value={company.title} onChange={this.handleChange} data-compid={idx} name='title' />
                    </div>
                    <div className='form-control'>
                        <label>Company*</label>
                        <input type='text' maxLength='30' value={company.companyName} onChange={this.handleChange} data-compid={idx} name='companyName' />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Location*</label>
                        <input type='text' maxLength='30' required value={company.location} onChange={this.handleChange} data-compid={idx} name='location' />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Start Date*</label>
                        <input type='date' max={company.endDate} required value={company.startDate} onChange={this.handleChange} data-compid={idx} name='startDate' />
                    </div>
                    <div className='form-control'>
                        <label>End Date*</label>
                        <input type='date' min={company.startDate} max={now()} required value={company.endDate} onChange={this.handleChange} data-compid={idx} name='endDate' />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-control'>
                        <label>Description</label>
                        <textarea maxLength='500' value={company.description} onChange={this.handleChange} data-compid={idx} name='description' />
                    </div>
                </div>
                <div className='form'>
                    <button type='button' className='button button-primary button-add' onClick={this.addProject.bind(null, idx)}>Add Project</button>
                    {company.projects.map((project, projectIdx) => this.renderProjectForm(project, idx, projectIdx))}
                </div>
            </div>
        )
    }

    render = () => {
        const { companies, loading } = this.state;
        const { isOpen, toggleModal } = this.props;
        return (
            <Modal title='Companies' isOpen={isOpen} submit={this.trySubmit} submitting={loading} close={toggleModal}>
                <form className='form' onSubmit={this.submit}>
                    <button type='button' className='button button-primary button-add' onClick={this.addCompany}>Add Company</button>
                    {companies.map((company, idx) => this.renderCompanyForm(company, idx))}
                    <button ref={ev => this.submitButton = ev} className='button-submit'>Submit</button>
                </form>
            </Modal>
        )
    }
}