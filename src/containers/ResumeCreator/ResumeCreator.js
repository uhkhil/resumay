import React from 'react';
import { Profile } from '../../components/Profile/Profile';
import { Tags } from '../../components/Tags/Tags';
import { Bio } from '../../components/Bio/Bio';
import { Experience } from '../../components/Experience/Experience';
import { Education } from '../../components/Education/Education';
import { Certification } from '../../components/Certifications/Certifications';
import { Events } from '../../components/Events/Events';

export class ResumeCreator extends React.Component {
    state = {
        profileData: {
            image: 'data:image/jpeg;base64,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',
            firstName: 'Dwight',
            lastName: 'Shrute',
            email: 'paperbeatsemail@email.com',
            phone: '9876543219',
            city: 'Someplace',
            country: 'Tatooine'
        },
        tags: [
            {
                _id: '1',
                value: 'React Native'
            },
            {
                _id: '2',
                value: 'Angular'
            },
            {
                _id: '3',
                value: 'AWS'
            },
        ],
        experiences: [
            {
                companyName: 'Dunder Mifflin',
                companyId: 'dundee',
                title: 'Asst. to the Regional Manager',
                startDate: '2005-01-01',
                endDate: '2009-08-01',
                isOngoing: false,
                link: 'https://www.dunder.com',
                location: 'USA',
                description: 'I was the best employee ever',
                projects: [
                    {
                        projectName: 'Selling paper',
                        skills: [
                            {
                                _id: '1',
                                display: 'Sales'
                            },
                            {
                                _id: '2',
                                display: 'Marketing'
                            },
                            {
                                _id: '3',
                                display: 'Aplha male'
                            },
                        ],
                        startDate: '2005-01-01',
                        endDate: '2009-08-01',
                        link: 'https://www.sales.com',
                        description: 'I was the best salesman ever.'
                    },
                    {
                        projectName: 'Making beets',
                        skills: [
                            {
                                _id: '1',
                                display: 'Sales'
                            },
                            {
                                _id: '2',
                                display: 'Marketing'
                            },
                            {
                                _id: '3',
                                display: 'Aplha male'
                            },
                        ],
                        startDate: '2005-01-01',
                        endDate: '2009-08-01',
                        link: 'https://www.sales.com',
                        description: 'I was the best salesman ever.'
                    }
                ]
            }
        ],
        education: [
            {
                degreeName: 'High school',
                degreeId: '1',
                startDate: '1985-01-01',
                endDate: '1995-01-01',
                isOngoing: false,
                instituteName: 'Shrute High school',
                instituteId: '2',
                location: 'Shrute farms',
                description: 'I got the best schooling'
            }
        ],
        certifications: [
            {
                certificationName: 'Karate black belt',
                certificationId: 'lel',
                startDate: '2010-10-01',
                endDate: '2019-10-02',
                instituteName: 'Karate school',
                location: 'USA',
                description: 'Mastered the art of neutralizing enemies.'
            }
        ],
        events: [
            {
                instituteName: 'Dunder Mifflin',
                award: 'Best salesman',
                date: '2005-10-10',
                description: 'Received the award for 10 years in a row.'
            }
        ],
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry."
    }

    update = async data => {
        console.log('TCL: ResumeCreator -> data', data);
        if (data.bio) {
            this.setState({ bio: data.bio })
        }
        if (data.experiences) {
            this.setState({ experiences: data.experiences })
        }
        return true;
    }

    render() {
        return (
            <div className="">
                <div className="row">
                    <div className="four columns">
                        <Profile data={this.state.profileData} update={this.update} />
                        <Tags data={this.state.tags} update={this.update} />
                    </div>
                    <div className="eight columns">
                        <Bio data={this.state.bio} update={this.update} />
                        <Experience data={this.state.experiences} update={this.update} />
                        {/* <Education data={this.state.education} update={this.update} />
                        <Certification data={this.state.certifications} update={this.update} />
                        <Events data={this.state.events} update={this.update} /> */}
                    </div>
                </div>
            </div>
        )
    }
}