import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { 
  Building2, 
  GraduationCap, 
  MapPin, 
  User2, 
  Briefcase,
  Users,
  FileCheck,
  Contact,
  Plus,
  Trash2
} from 'lucide-react';

const JobAnnouncementForm = () => {
  const [hrContacts, setHrContacts] = useState([{ name: '', designation: '', email: '', phone: '' }]);
  const [otherSelectionDetails, setOtherSelectionDetails] = useState('');

  const addHrContact = () => {
    setHrContacts([...hrContacts, { name: '', designation: '', email: '', phone: '' }]);
  };

  const removeHrContact = (index) => {
    if (hrContacts.length > 1) {
      const newContacts = hrContacts.filter((_, i) => i !== index);
      setHrContacts(newContacts);
    }
  };

  const updateHrContact = (index, field, value) => {
    const newContacts = hrContacts.map((contact, i) => {
      if (i === index) {
        return { ...contact, [field]: value };
      }
      return contact;
    });
    setHrContacts(newContacts);
  };

  const bTechPrograms = [
    { name: "Computer Science & Engineering", type: "Circuital" },
    { name: "Electronics & Communication Engineering", type: "Circuital" },
    { name: "Instrumentation and Control Engineering", type: "Circuital" },
    { name: "Electrical Engineering", type: "Circuital" },
    { name: "Information Technology", type: "Circuital" },
    { name: "Biotechnology", type: "Non-Circuital" },
    { name: "Chemical Engineering", type: "Non-Circuital" },
    { name: "Civil Engineering", type: "Non-Circuital" },
    { name: "Industrial & Production Engineering", type: "Non-Circuital" },
    { name: "Mechanical Engineering", type: "Non-Circuital" },
    { name: "Textile Technology", type: "Non-Circuital" }
  ];

  const mTechPrograms = {
    circuital: [
      { name: "Computer Science & Engineering", specializations: [
        "Computer Science & Engineering",
        "Information Security",
        "Data Science",
        "Artificial Intelligence"
      ]},
      { name: "Electronics & Communication Engineering", specializations: [
        "Signal Processing and Machine Learning",
        "VLSI Design"
      ]},
      { name: "Electrical Engineering", specializations: [
        "Electric Vehicle Design"
      ]},
      { name: "Information Technology", specializations: [
        "Data Analytics"
      ]}
    ],
    nonCircuital: [
      { name: "Biotechnology", specializations: [] },
      { name: "Chemical Engineering", specializations: [] },
      { name: "Civil Engineering", specializations: [
        "Structural and Construction Engineering",
        "Geotechnical – GEO-Environmental Engineering"
      ]},
      { name: "Industrial & Production Engineering", specializations: [
        "Industrial Engineering & Data Analytics"
      ]},
      { name: "Mechanical Engineering", specializations: [
        "Design Engineering"
      ]},
      { name: "Textile Engineering", specializations: [
        "Textile Engineering & Management"
      ]},
      { name: "Renewable Energy", specializations: [] }
    ]
  };

  const mbaSpecializations = [
    "Finance",
    "Marketing",
    "HR"
  ];

  const scienceStreams = [
    "Physics",
    "Chemistry",
    "Mathematics"
  ];

  const selectionProcess = [
    "Short Listing from resume / Database",
    "CGPA",
    "Aptitude test",
    "Technical test",
    "Group Discussion/Activity",
    "Personal Interview"
  ];

  const [designations, setDesignations] = useState([
    { title: '', ctc: '' }
  ]);

  // Add functions to handle designations
  const addDesignation = () => {
    setDesignations([...designations, { title: '', ctc: '' }]);
  };

  const removeDesignation = (index) => {
    if (designations.length > 1) {
      const newDesignations = designations.filter((_, i) => i !== index);
      setDesignations(newDesignations);
    }
  };

  const updateDesignation = (index, field, value) => {
    const newDesignations = designations.map((designation, i) => {
      if (i === index) {
        return { ...designation, [field]: value };
      }
      return designation;
    });
    setDesignations(newDesignations);
  };


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Card className="border-t-4 border-t-blue-600">
        <CardHeader className="text-center bg-gradient-to-b from-blue-50 to-white py-8">
          <img 
            src="/nitj-logo.png"
            alt="NIT Logo"
            className="mx-auto w-24 h-24 mb-4"
          />
          <CardTitle className="text-3xl font-bold text-custom-blue">
            Dr. B R Ambedkar National Institute of Technology
          </CardTitle>
          <p className="text-gray-600">G T Road Bye Pass, Jalandhar-144008, Punjab</p>
          <h2 className="text-xl font-semibold mt-4 text-custom-blue">Job Announcement Form - 2024-25 Batch</h2>
        </CardHeader>

        <CardContent className="space-y-8 mt-8">
          {/* Recruiter Details Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-blue-700 border-b pb-2">
              <Building2 className="w-6 h-6 text-custom-blue" />
              <h3 className='text-custom-blue'>Recruiter Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Organization Name*</label>
                <Input placeholder="Enter organization name" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Website URL*</label>
                <Input placeholder="Enter website URL" className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Category*</label>
                <select className="w-full p-2 border rounded-md border-gray-300">
                  <option value="">Select Category</option>
                  <option>Government</option>
                  <option>PSU</option>
                  <option>Private</option>
                  <option>MNC</option>
                  <option>Startup</option>
                  <option>NGO</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Sector*</label>
                <select className="w-full p-2 border rounded-md border-gray-300">
                  <option value="">Select Sector</option>
                  <option>Core Engineering</option>
                  <option>IT</option>
                  <option>R&D</option>
                  <option>Analytics</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Networking</option>
                  <option>Educational</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Interested in Participating*</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Virtual Placement
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Campus Placement
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Programs Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-blue-700 border-b pb-2">
              <GraduationCap className="w-6 h-6 text-custom-blue" />
              <h3 className='text-custom-blue'>Programs</h3>
            </div>

            <div className="space-y-8">
              {/* B.Tech Programs */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">B.Tech Programs (4-Year Programme)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {bTechPrograms.map((program) => (
                    <div key={program.name} className="flex items-center space-x-2">
                      <Checkbox id={program.name} />
                      <label htmlFor={program.name} className="text-sm">
                        {program.name}
                        <span className="text-xs text-gray-500 ml-1">({program.type})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* M.Tech Programs */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">M.Tech Programs (2-Year Programme)</h4>
                
                {/* Circuital Branches */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-600">Circuital Branches</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {mTechPrograms.circuital.map((program) => (
                      <div key={program.name} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`mtech-${program.name}`} />
                          <label htmlFor={`mtech-${program.name}`} className="text-sm font-medium">
                            {program.name}
                          </label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {program.specializations.map((spec) => (
                            <div key={spec} className="flex items-center space-x-2">
                              <Checkbox id={`spec-${spec}`} />
                              <label htmlFor={`spec-${spec}`} className="text-xs">
                                {spec}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Non-Circuital Branches */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-600">Non-Circuital Branches</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {mTechPrograms.nonCircuital.map((program) => (
                      <div key={program.name} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`mtech-${program.name}`} />
                          <label htmlFor={`mtech-${program.name}`} className="text-sm font-medium">
                            {program.name}
                          </label>
                        </div>
                        {program.specializations.length > 0 && (
                          <div className="ml-6 space-y-1">
                            {program.specializations.map((spec) => (
                              <div key={spec} className="flex items-center space-x-2">
                                <Checkbox id={`spec-${spec}`} />
                                <label htmlFor={`spec-${spec}`} className="text-xs">
                                  {spec}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MBA Programs */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">MBA Programs</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mbaSpecializations.map((spec) => (
                    <div key={spec} className="flex items-center space-x-2">
                      <Checkbox id={`mba-${spec}`} />
                      <label htmlFor={`mba-${spec}`} className="text-sm">{spec}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Science Streams */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">M.Sc. Programs</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {scienceStreams.map((stream) => (
                    <div key={stream} className="flex items-center space-x-2">
                      <Checkbox id={`msc-${stream}`} />
                      <label htmlFor={`msc-${stream}`} className="text-sm">{stream}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

         {/* Skill Set Required */}
         <section className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-blue-700 border-b pb-2">
              <FileCheck className="w-6 h-6 text-custom-blue" />
              <h3 className='text-custom-blue'>Required Skills & Details</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Skill Set Required*</label>
                <Textarea 
                  placeholder="Enter required skills and competencies"
                  className="min-h-[100px] border-gray-300"
                />
              </div>
            </div>
          </section>

          {/* Job Details Section */}
            <section className="space-y-6">
        <div className="flex items-center justify-between text-lg font-semibold text-blue-700 border-b pb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-custom-blue" />
            <h3 className='text-custom-blue'>Job Details</h3>
          </div>
          <Button 
            onClick={addDesignation}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-custom-blue"
          >
            <Plus className="w-4 h-4" />
            Add Designation
          </Button>
        </div>

        <div className="space-y-6">
          {designations.map((designation, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Designation {index + 1}</h4>
                {index > 0 && (
                  <Button
                    onClick={() => removeDesignation(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Designation Title*</label>
                  <Input
                    value={designation.title}
                    onChange={(e) => updateDesignation(index, 'title', e.target.value)}
                    placeholder="Enter job designation"
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium"> Stipend (₹)*</label>
                  <Input
                    value={designation.ctc}
                    onChange={(e) => updateDesignation(index, 'ctc', e.target.value)}
                    placeholder="Enter Stipend if Intern"
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">CTC (₹)*</label>
                  <Input
                    value={designation.ctc}
                    onChange={(e) => updateDesignation(index, 'ctc', e.target.value)}
                    placeholder="Enter CTC if PPO or FTE"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>
          ))}


              <div className="space-y-2">
                <label className="block text-sm font-medium">Job Location*</label>
                <div className="space-y-4">
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      India
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Abroad
                    </label>
                  </div>
                  <Input placeholder="Specify locations" className="border-gray-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Bond or Service Contract</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input type="radio" name="bond" className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="bond" className="mr-2" />
                    No
                  </label>
                </div>
                <Input placeholder="If yes, specify details" className="border-gray-300 mt-2" />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium">Selection Process*</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectionProcess.map((process) => (
                    <div key={process} className="flex items-center space-x-2">
                      <Checkbox id={process} />
                      <label htmlFor={process} className="text-sm">{process}</label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Additional Selection Details</label>
                  <Textarea 
                    placeholder="Enter any additional selection process details"
                    className="min-h-[80px] border-gray-300"
                    value={otherSelectionDetails}
                    onChange={(e) => setOtherSelectionDetails(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Summer Internship Opportunities</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input type="radio" name="internship" className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="internship" className="mr-2" />
                    No
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">For pre-final year students (2 months)</p>
              </div>
            </div>
          </section>

          {/* HR Contact Details Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between text-lg font-semibold text-blue-700 border-b pb-2">
              <div className="flex items-center gap-2">
                <Contact className="w-6 h-6 text-custom-blue" />
                <h3 className='text-custom-blue'>HR Contact Details</h3>
              </div>
              <Button 
                onClick={addHrContact}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-custom-blue"
              >
                <Plus className="w-4 h-4 text-custom-blue" />
                Add Contact
              </Button>
            </div>

            <div className="space-y-6">
              {hrContacts.map((contact, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Contact Person {index + 1}</h4>
                    {index > 0 && (
                      <Button
                        onClick={() => removeHrContact(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Name*</label>
                      <Input
                        value={contact.name}
                        onChange={(e) => updateHrContact(index, 'name', e.target.value)}
                        placeholder="Enter name"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Designation*</label>
                      <Input
                        value={contact.designation}
                        onChange={(e) => updateHrContact(index, 'designation', e.target.value)}
                        placeholder="Enter designation"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Email*</label>
                      <Input
                        type="email"
                        value={contact.email}
                        onChange={(e) => updateHrContact(index, 'email', e.target.value)}
                        placeholder="Enter email"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Phone Number*</label>
                      <Input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => updateHrContact(index, 'phone', e.target.value)}
                        placeholder="Enter phone number"
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button 
              className="bg-custom-blue hover:bg-blue-700 text-white px-8 py-2"
            >
              Submit Form
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobAnnouncementForm;