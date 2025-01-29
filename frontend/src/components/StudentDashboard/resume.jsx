import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEye, faEdit, faDownload, faSave, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';

const ResumeBuilder = () => {
    const [mode, setMode] = useState('home');
    const [resume, setResume] = useState({
        name: "",
        contact: {
            github: "",
            linkedin: "",
            email: "",
            phone: "",
        },
        education: [
            {
                institution: "",
                location: "",
                degree: "",
                percentage: "",
                duration: "",
            },
        ],
        experience: [
            {
                title: "",
                company: "",
                description: [""],
                techStack: [""],
                duration: "",
            },
        ],
        projects: [
            {
                name: "",
                description: [""],
                techStack: [""],
                link: "",
            },
        ],
        skills: [
            {
                category: "",
                skills: [""],
            },
        ],
        achievements: [
            {
                title: "",
                description: "",
            },
        ],
        interests: [""],
        coursework: [""],
        responsibilities: [
            {
                role: "",
                description: "",
            },
        ],
    });

    const handleInputChange = (section, index, field, value, subIndex) => {
        setResume((prevResume) => {
            const updatedResume = structuredClone(prevResume); // Deep clone to preserve reactivity

            if (section === "name") {
                updatedResume.name = value;
            } else if (section === "contact") {
                updatedResume.contact[field] = value;
            } else if (Array.isArray(updatedResume[section])) {
                if (subIndex !== undefined) {
                    updatedResume[section][index][field][subIndex] = value;
                } else {
                    updatedResume[section][index][field] = value;
                }
            }

            return updatedResume;
        });
    };

    const addArrayItem = (section, defaultItem) => {
        setResume((prev) => ({
            ...prev,
            [section]: [...prev[section], defaultItem],
        }));
    };

    const removeArrayItem = (section, index) => {
        setResume((prev) => {
            const newSection = [...prev[section]];
            newSection.splice(index, 1);
            return { ...prev, [section]: newSection };
        });
    };

    const addArraySubItem = (section, index, field) => {
        setResume((prev) => {
            const updatedResume = structuredClone(prev);
            updatedResume[section][index][field].push("");
            return updatedResume;
        });
    };

    const removeArraySubItem = (section, index, field, subIndex) => {
        setResume(prev => {
            const newResume = { ...prev };
            newResume[section][index][field].splice(subIndex, 1);
            return newResume;
        });
    };

    const ResumeForm = ({ isEditable }) => (
        <div className="space-y-6 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            placeholder="Name"
                            value={resume.name}
                            onChange={(e) => handleInputChange('name', null, null, e.target.value)}
                            disabled={!isEditable}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Email"
                                value={resume.contact.email}
                                onChange={(e) => handleInputChange('contact', null, 'email', e.target.value)}
                                disabled={!isEditable}
                            />
                            <Input
                                placeholder="Phone"
                                value={resume.contact.phone}
                                onChange={(e) => handleInputChange('contact', null, 'phone', e.target.value)}
                                disabled={!isEditable}
                            />
                            <Input
                                placeholder="GitHub"
                                value={resume.contact.github}
                                onChange={(e) => handleInputChange('contact', null, 'github', e.target.value)}
                                disabled={!isEditable}
                            />
                            <Input
                                placeholder="LinkedIn"
                                value={resume.contact.linkedin}
                                onChange={(e) => handleInputChange('contact', null, 'linkedin', e.target.value)}
                                disabled={!isEditable}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Education Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Education
                        {isEditable && (
                            <Button
                                onClick={() => addArrayItem('education', {
                                    institution: '',
                                    location: '',
                                    degree: '',
                                    percentage: '',
                                    duration: ''
                                })}
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="w-4 h-4 mr-2" />
                                Add Education
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {resume.education.map((edu, index) => (
                        <div key={index} className="space-y-4 mb-6 relative">
                            {isEditable && resume.education.length > 1 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-0 right-0"
                                    onClick={() => removeArrayItem('education', index)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                </Button>
                            )}
                            <Input
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)}
                                disabled={!isEditable}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    placeholder="Location"
                                    value={edu.location}
                                    onChange={(e) => handleInputChange('education', index, 'location', e.target.value)}
                                    disabled={!isEditable}
                                />
                                <Input
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                                    disabled={!isEditable}
                                />
                                <Input
                                    placeholder="Percentage"
                                    value={edu.percentage}
                                    onChange={(e) => handleInputChange('education', index, 'percentage', e.target.value)}
                                    disabled={!isEditable}
                                />
                                <Input
                                    placeholder="Duration"
                                    value={edu.duration}
                                    onChange={(e) => handleInputChange('education', index, 'duration', e.target.value)}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Experience Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Experience
                        {isEditable && (
                            <Button
                                onClick={() =>
                                    addArrayItem("experience", {
                                        title: "",
                                        company: "",
                                        description: [""],
                                        techStack: [""],
                                        duration: "",
                                    })
                                }
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="w-4 h-4 mr-2" />
                                Add Experience
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {resume.experience.map((exp, index) => (
                        <div key={index} className="space-y-4 mb-6 relative">
                            {isEditable && resume.experience.length > 1 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-0 right-0"
                                    onClick={() => removeArrayItem("experience", index)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                </Button>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    placeholder="Title"
                                    value={exp.title}
                                    onChange={(e) =>
                                        handleInputChange("experience", index, "title", e.target.value)
                                    }
                                    disabled={!isEditable}
                                />
                                <Input
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) =>
                                        handleInputChange("experience", index, "company", e.target.value)
                                    }
                                    disabled={!isEditable}
                                />
                            </div>
                            {exp.description.map((desc, subIndex) => (
                                <div key={subIndex} className="flex gap-2">
                                    <Textarea
                                        placeholder="Description"
                                        value={desc}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "experience",
                                                index,
                                                "description",
                                                e.target.value,
                                                subIndex
                                            )
                                        }
                                        disabled={!isEditable}
                                    />
                                    {isEditable && subIndex === exp.description.length - 1 && (
                                        <Button
                                            onClick={() =>
                                                addArraySubItem("experience", index, "description")
                                            }
                                            size="sm"
                                        >
                                            <FontAwesomeIcon icon={faPlusCircle} className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Input
                                placeholder="Duration"
                                value={exp.duration}
                                onChange={(e) =>
                                    handleInputChange("experience", index, "duration", e.target.value)
                                }
                                disabled={!isEditable}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
          

            {/* Projects Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Projects
                        {isEditable && (
                            <Button
                                onClick={() => addArrayItem('projects', {
                                    name: '',
                                    description: [''],
                                    techStack: [''],
                                    link: ''
                                })}
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {resume.projects.map((project, index) => (
                        <div key={index} className="space-y-4 mb-6 relative">
                            {isEditable && resume.projects.length > 1 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-0 right-0"
                                    onClick={() => removeArrayItem('projects', index)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                </Button>
                            )}
                            <Input
                                placeholder="Project Name"
                                value={project.name}
                                onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                                disabled={!isEditable}
                            />
                            {project.description.map((desc, subIndex) => (
                                <div key={subIndex} className="flex gap-2">
                                    <Textarea
                                        placeholder="Description"
                                        value={desc}
                                        onChange={(e) => handleInputChange('projects', index, 'description', e.target.value, subIndex)}
                                        disabled={!isEditable}
                                    />
                                    {isEditable && subIndex === project.description.length - 1 && (
                                        <Button
                                            onClick={() => addArraySubItem('projects', index, 'description')}
                                            size="sm"
                                        >
                                            <FontAwesomeIcon icon={faPlusCircle} className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Input
                                placeholder="Project Link"
                                value={project.link}
                                onChange={(e) => handleInputChange('projects', index, 'link', e.target.value)}
                                disabled={!isEditable}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Skills
                        {isEditable && (
                            <Button
                                onClick={() => addArrayItem('skills', {
                                    category: '',
                                    skills: ['']
                                })}
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="w-4 h-4 mr-2" />
                                Add Skill Category
                            </Button>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {resume.skills.map((skillCategory, index) => (
                        <div key={index} className="space-y-4 mb-6 relative">
                            {isEditable && resume.skills.length > 1 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-0 right-0"
                                    onClick={() => removeArrayItem('skills', index)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                </Button>
                            )}
                            <Input
                                placeholder="Skill Category"
                                value={skillCategory.category}
                                onChange={(e) => handleInputChange('skills', index, 'category', e.target.value)}
                                disabled={!isEditable}
                            />
                            {skillCategory.skills.map((skill, subIndex) => (
                                <div key={subIndex} className="flex gap-2">
                                    <Input
                                        placeholder="Skill"
                                        value={skill}
                                        onChange={(e) => handleInputChange('skills', index, 'skills', e.target.value, subIndex)}
                                        disabled={!isEditable}
                                    />
                                    {isEditable && subIndex === skillCategory.skills.length - 1 && (
                                        <Button
                                            onClick={() => addArraySubItem('skills', index, 'skills')}
                                            size="sm"
                                        >
                                            <FontAwesomeIcon icon={faPlusCircle} className="w-4 h-4" />
                                        </Button>
                                    )}
                                    {isEditable && skillCategory.skills.length > 1 && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeArraySubItem('skills', index, 'skills', subIndex)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    const handleSave = () => {
        console.log('Saving resume:', resume);
        setMode('home');
    };

    const handleDownload = () => {
        console.log('Downloading resume:', resume);
    };

    if (mode === 'home') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Resume Builder</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            className="w-full"
                            onClick={() => setMode('create')}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} className="w-4 h-4 mr-2" />
                            Create New Resume
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => setMode('edit')}
                            variant="outline"
                        >
                            <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                            Edit Resume
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => setMode('view')}
                            variant="outline"
                        >
                            <FontAwesomeIcon icon={faEye} className="w-4 h-4 mr-2" />
                            View Resume
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <Button
                        variant="outline"
                        onClick={() => setMode('home')}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div className="space-x-2">
                        {mode !== 'view' && (
                            <Button onClick={handleSave}>
                                <FontAwesomeIcon icon={faSave} className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={handleDownload}
                        >
                            <FontAwesomeIcon icon={faDownload} className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                    </div>
                    
                </div>
                <ResumeForm isEditable={mode !== 'view'} />
            </div>
        </div>
    );
};

export default ResumeBuilder;