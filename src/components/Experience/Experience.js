import React from 'react'
import { BlockHeader } from '../BlockHeader/BlockHeader'
import { Company } from '../Company/Company';
import { Modal } from '../Modal/Modal';

const InputBlock = (props) => {
    const computed = 'c' + props.cIdx + (props.pIdx !== undefined ? '-p' + props.pIdx : '') + '-' + props.field
    return (
        <React.Fragment>
            <label htmlFor={computed}>{props.label}</label>
            <input type={props.type} name={computed} required={props.required} defaultValue={props.defaultValue} />
        </React.Fragment >
    )
}

export class Experience extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            companies: props.data
        }
    }

    companies = [];

    toggleEditModal = () => {
        this.companies = JSON.parse(JSON.stringify(this.props.data));
        this.setState({ isOpen: !this.state.isOpen })
    }

    unFlatten = (formData) => {
        const properPairs = [];
        const cIdxList = [];
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
            const obj = {
                c: parseInt(pair[0][1]),
                value: pair[1]
            }
            cIdxList.push(parseInt(pair[0][1]))
            const split = pair[0].split('-')
            if (split.length > 2) {
                obj.p = parseInt(split[1][1])
                obj.key = split[2]
            } else {
                obj.key = split[1]
            }
            properPairs.push(obj)
        }
        const max = Math.max(...cIdxList);
        const companies = []
        for (let i = 0; i <= max; i++) {
            companies.push({});
        }

        companies.forEach((company, idx) => {
            const totalProjects = properPairs.filter(p => p.c === idx && p.p !== undefined).map(p => parseInt(p.p))
            const max = Math.max(...totalProjects)
            company.projects = []
            for (let i = 0; i <= max; i++) {
                company.projects.push({});
            }
        })

        properPairs.forEach(pair => {
            if (pair.p === undefined) {
                companies[pair.c][pair.key] = pair.value
            } else {
                companies[pair.c].projects[pair.p][pair.key] = pair.value

            }
        })
        return companies;
    }

    submit = async (event) => {
        event.preventDefault();
        const experiences = this.unFlatten(new FormData(event.target))
        const updated = await this.props.update({ experiences })
        if (updated) {
            this.toggleEditModal();
        } else {
            console.error('Something went wrong');
        }
    }

    addCompany = () => {
        const company = {
            companyName: '',
            title: '',
            startDate: null,
            endDate: null,
            link: '',
            location: '',
            description: '',
            projects: []
        }
        const clone = JSON.parse(JSON.stringify(this.state.companies))
        clone.push(company);
        this.setState({ companies: clone })
    }

    addProject = (companyIdx) => {
        const project = {
            projectName: '',
            skills: [],
            startDate: null,
            endDate: null,
            link: '',
            description: ''
        }
        const clone = JSON.parse(JSON.stringify(this.state.companies))
        clone[companyIdx].projects.push(project);
        this.setState({ companies: clone })
    }

    renderProjectForm = (cIdx, project, pIdx) => {
        return (
            <div className='block' key={cIdx + '.' + pIdx}>
                <InputBlock cIdx={cIdx} pIdx={pIdx} label='Company Name' field='projectName' type='text' required={true} defaultValue={project.projectName} />
                {/* <InputBlock cIdx={cIdx} pIdx={pIdx} label='Skills' field='skills' type='text' required={true} defaultValue={project.skills} /> */}
                <InputBlock cIdx={cIdx} pIdx={pIdx} label='Start Date' field='startDate' type='date' required={true} defaultValue={project.startDate} />
                <InputBlock cIdx={cIdx} pIdx={pIdx} label='End Date' field='endDate' type='date' required={true} defaultValue={project.endDate} />
                <InputBlock cIdx={cIdx} pIdx={pIdx} label='Link' field='link' type='text' required={true} defaultValue={project.link} />
                <InputBlock cIdx={cIdx} pIdx={pIdx} label='Description' field='description' type='text' required={false} defaultValue={project.description} />
            </div>
        )
    }

    renderCompanyForm = (company, cIdx) => {
        return (
            <div className='block' key={cIdx}>
                <form onSubmit={this.submit}>
                    <InputBlock cIdx={cIdx} label='Company Name' field='companyName' type='text' required={true} defaultValue={company.companyName} />
                    <InputBlock cIdx={cIdx} label='Title' field='title' type='text' required={true} defaultValue={company.title} />
                    <InputBlock cIdx={cIdx} label='Start Date' field='startDate' type='date' required={true} defaultValue={company.startDate} />
                    <InputBlock cIdx={cIdx} label='End Date' field='endDate' type='date' required={true} defaultValue={company.endDate} />
                    <InputBlock cIdx={cIdx} label='Link' field='link' type='text' required={true} defaultValue={company.link} />
                    <InputBlock cIdx={cIdx} label='Location' field='location' type='text' required={true} defaultValue={company.location} />
                    <InputBlock cIdx={cIdx} label='Description' field='description' type='text' required={false} defaultValue={company.description} />
                    <h4>Projects</h4>
                    <button type='button' onClick={() => this.addProject(cIdx)}>Add Project</button>
                    {company.projects.map((project, pIdx) => this.renderProjectForm(cIdx, project, pIdx))}
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }

    render() {
        const companies = this.props.data;
        return (
            <div className="block">
                <BlockHeader title='Work Experience' edit={this.toggleEditModal} />
                {companies.map((company, idx) => <Company key={idx} data={company} />)}
                <Modal title='Work Experience' isOpen={this.state.isOpen} close={this.toggleEditModal} submit={this.submit}>
                    <button type='button' onClick={this.addCompany}>Add Company</button>
                    {this.state.companies.map((company, cIdx) => this.renderCompanyForm(company, cIdx))}
                </Modal>
            </div>
        )
    }
}