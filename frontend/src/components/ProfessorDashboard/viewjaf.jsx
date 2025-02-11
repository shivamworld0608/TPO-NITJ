import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import Swal from "sweetalert2";
import {
  Building2,
  GraduationCap,
  Briefcase,
  FileCheck,
  Contact,
  Plus,
  Trash2,
  Download,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import html2pdf from 'html2pdf.js';

function ViewJAF({ jaf: initialJAF }) {
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
    { name: "Textile Technology", type: "Non-Circuital" },
  ];

  const mTechPrograms = {
    circuital: [
      {
        name: "Computer Science & Engineering",
        specializations: [
          "Computer Science & Engineering",
          "Information Security",
        ],
      },
      {
        name: "Electronics & Communication Engineering",
        specializations: [
          "Electronics & Communication Engineering",
          "VLSI Design",
        ],
      },
      {
        name: "Instrumentation & Control Engineering",
        specializations: ["Machine Intelligence and Automation"],
      },
      { name: "Artificial Intelligence", specializations: [] },
    ],
    nonCircuital: [
      { name: "Biotechnology", specializations: [] },
      { name: "Chemical Engineering", specializations: [] },
      {
        name: "Civil Engineering",
        specializations: [
          "Structural and Construction Engineering",
          "Geotechnical -GEO-Environmental Engineering",
        ],
      },
      {
        name: "Industrial & Production Engineering",
        specializations: ["Industrial Engineering", "Manufacturing Technology"],
      },
      {
        name: "Mechanical Engineering",
        specializations: ["Design Engineering", "Thermal Engineering"],
      },
      { name: "Renewable Energy", specializations: [] },
      { name: "Textile Engineering & Management", specializations: [] },
    ],
  };

  const mbaSpecializations = ["Finance", "Marketing", "HR"];

  const scienceStreams = ["Physics", "Chemistry", "Mathematics"];

  const phdPrograms = [
    "Computer Science & Engineering",
    "Electronics & Communication Engineering",
    "Information Technology",
    "Electrical Engineering",
    "Instrumentation and Control Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Industrial and Production Engineering",
    "Textile Technology",
    "Humanities & Management",
    "Mathematics",
    "Physics",
    "Chemistry",
  ];

  const selectionProcess = [
    "Short Listing from resume / Database",
    "CGPA",
    "Aptitude test",
    "Technical test",
    "Group Discussion/Activity",
    "Personal Interview",
  ];

  // Initialize state with provided JAF data
  const [formData, setFormData] = useState(initialJAF);
  const [edit, setEdit] = useState(false);

  // Reset form data when initial JAF changes
  useEffect(() => {
    setFormData(initialJAF);
  }, [initialJAF]);

  const handleInputChange = (e) => {
    if (!edit) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field, value, checked) => {
    if (!edit) return;
    setFormData((prev) => {
      const currentValues = prev[field] || [];
      const newValues = checked
        ? [...new Set([...currentValues, value])]
        : currentValues.filter((item) => item !== value);
      return { ...prev, [field]: newValues };
    });
  };

  const handleProgramCheckboxChange = (
    programType,
    programName,
    specialization,
    checked
  ) => {

    if(!edit) return;

    setFormData((prevData) => {
      const updatedPrograms = [...prevData[programType]];
  
      // Case 1: Handling specialization selection
      if (specialization) {
        if (checked) {
          // Add specialization if not already present
          if (!updatedPrograms.includes(specialization)) {
            updatedPrograms.push(specialization);
          }
        } else {
          // Remove specialization
          const index = updatedPrograms.indexOf(specialization);
          if (index > -1) {
            updatedPrograms.splice(index, 1);
          }
        }
      }
      // Case 2: Handling main program selection
      else {
        let program;
        if (programType === "mTechPrograms") {
          // Find the program in either circuital or non-circuital
          program =
            mTechPrograms.circuital.find((p) => p.name === programName) ||
            mTechPrograms.nonCircuital.find((p) => p.name === programName);
        }
  
        if (program && program.specializations.length > 0) {
          // Handle programs with specializations
          if (checked) {
            // Add all specializations if not already present
            program.specializations.forEach((spec) => {
              if (!updatedPrograms.includes(spec)) {
                updatedPrograms.push(spec);
              }
            });
          } else {
            // Remove all specializations
            program.specializations.forEach((spec) => {
              const index = updatedPrograms.indexOf(spec);
              if (index > -1) {
                updatedPrograms.splice(index, 1);
              }
            });
          }
        } else {
          // Handle programs without specializations
          if (checked && !updatedPrograms.includes(programName)) {
            updatedPrograms.push(programName);
          } else if (!checked) {
            const index = updatedPrograms.indexOf(programName);
            if (index > -1) {
              updatedPrograms.splice(index, 1);
            }
          }
        }
      }
  
      return {
        ...prevData,
        [programType]: updatedPrograms,
      };
    });
  };
  
  const addDesignation = () => {
    if (!edit) return;
    setFormData((prev) => ({
      ...prev,
      designations: [...prev.designations, { title: "", stipend: "", ctc: "" }],
    }));
  };

  const updateDesignation = (index, field, value) => {
    if (!edit) return;
    const newDesignations = [...formData.designations];
    newDesignations[index][field] = value;
    setFormData((prev) => ({ ...prev, designations: newDesignations }));
  };

  const removeDesignation = (index) => {
    if (!edit) return;
    const newDesignations = formData.designations.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, designations: newDesignations }));
  };

  const addHrContact = () => {
    if (!edit) return;
    setFormData((prev) => ({
      ...prev,
      hrContacts: [
        ...prev.hrContacts,
        { name: "", designation: "", email: "", phone: "" },
      ],
    }));
  };

  const updateHrContact = (index, field, value) => {
    if (!edit) return;
    const newContacts = [...formData.hrContacts];
    newContacts[index][field] = value;
    setFormData((prev) => ({ ...prev, hrContacts: newContacts }));
  };

  const removeHrContact = (index) => {
    if (!edit) return;
    const newContacts = formData.hrContacts.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, hrContacts: newContacts }));
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/jaf/updatejaf/${formData._id}`,
        formData,
        { withCredentials: true }
      );
      toast.success("JAF form updated successfully😊");
      setEdit(false);
    } catch (error) {
      toast.error("Error in updating JAF form");
      console.error("Update error:", error);
    }
  };

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleSaveClick = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to edit this in Future!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green-300",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, submit it!",
    });

    if (result.isConfirmed) {
      handleSubmit();
    }
  };

  // const downloadPDF = () => {
  //   const element = document.getElementById('jaf-form');
  //   const opt = {
  //     margin: 1,
  //     filename: 'JAF_Form.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  //   };

  //   html2pdf().set(opt).from(element).save();
  // };


  const downloadPDF = async () => {
    // Show loading state in UI
    const downloadButton = document.querySelector('button:has(.download)');
    if (downloadButton) {
      const originalContent = downloadButton.innerHTML;
      downloadButton.disabled = true;
      downloadButton.innerHTML = 'Generating PDF...';
    }
  
    try {
      const element = document.getElementById('jaf-form');
      if (!element) {
        throw new Error('Form element not found');
      }
  
      // Clone the element to avoid modifying the original
      const clonedElement = element.cloneNode(true);
      
      // Add print-specific styles
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @media print {
          #jaf-form {
            font-family: Arial, sans-serif !important;
            line-height: 1.6 !important;
            font-size: 12pt !important;
            color: black !important;
            background: white !important;
          }
          #jaf-form * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          input[type="checkbox"] {
            -webkit-appearance: none;
            border: 1px solid black;
            width: 12px;
            height: 12px;
            position: relative;
          }
          input[type="checkbox"]:checked:after {
            content: '✓';
            position: absolute;
            left: 1px;
            top: -3px;
          }
        }
      `;
      document.head.appendChild(styleSheet);
  
      // Configure PDF options
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `JAF_Form_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          allowTaint: false,
          removeContainer: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
  
      // Pre-process images
      const images = clonedElement.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      })));
  
      // Generate and save PDF
      await html2pdf()
        .from(clonedElement)
        .set(opt)
        .save();
  
      // Cleanup
      styleSheet.remove();
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      // Reset button state
      const downloadButton = document.querySelector('button:has(.download)');
      if (downloadButton) {
        downloadButton.disabled = false;
        downloadButton.innerHTML = `<Download className="w-4 h-4" /> Download PDF`;
      }
    }
  };

  const isElementVisible = (element) => {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  };

  const renderActionButton = () => {
    return (
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          onClick={downloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        {edit ? (
          <Button
            type="button"
            onClick={handleSaveClick}
            className="bg-custom-blue hover:bg-blue-700 text-white px-8 py-2"
          >
            Save Changes
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleEditClick}
            className="bg-custom-blue hover:bg-blue-700 text-white px-8 py-2"
          >
            Edit Form
          </Button>
        )}
      </div>
    );
  };

  // const renderActionButton = () => {
  //   if (edit) {
  //     return (
  //       <Button
  //         type="submit"
  //         className="bg-custom-blue hover:bg-blue-700 text-white px-8 py-2"
  //       >
  //         Save Changes
  //       </Button>
  //     );
  //   } else {
  //     return (
  //       <Button
  //         className="bg-custom-blue hover:bg-blue-700 text-white px-8 py-2"
  //         onClick={() => setEdit(true)}
  //       >
  //         Edit Form
  //       </Button>
  //     );
  //   }
  // };

  return (
    <>
      <form
        id="jaf-form"
        onSubmit={(e) => e.preventDefault()}
        className="max-w-6xl mx-auto p-6 space-y-8"
      >
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
            <p className="text-gray-600">
              G T Road Bye Pass, Jalandhar-144008, Punjab
            </p>
            <h2 className="text-xl font-semibold mt-4 text-custom-blue">
              Job Announcement Form - 2024-25 Batch
            </h2>
          </CardHeader>

          <CardContent className="space-y-8 mt-8">
            {/* Recruiter Details Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-blue-700 border-b pb-2">
                <Building2 className="w-6 h-6 text-custom-blue" />
                <h3 className="text-custom-blue">Recruiter Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Organization Name*
                  </label>
                  <Input
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={edit ? handleInputChange : undefined}
                    placeholder="Enter organization name"
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Website URL*
                  </label>
                  <Input
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={edit ? handleInputChange : undefined}
                    placeholder="Enter website URL"
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={edit ? handleInputChange : undefined}
                    className="w-full p-2 border rounded-md border-gray-300"
                  >
                    <option value="">Select Category</option>
                    <option value="Government">Government</option>
                    <option value="PSU">PSU</option>
                    <option value="Private">Private</option>
                    <option value="MNC">MNC</option>
                    <option value="Startup">Startup</option>
                    <option value="NGO">NGO</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Sector*</label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={edit ? handleInputChange : undefined}
                    className="w-full p-2 border rounded-md border-gray-300"
                  >
                    <option value="">Select Sector</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="IT">IT</option>
                    <option value="R&D">R&D</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Networking">Networking</option>
                    <option value="Educational">Educational</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Interested in Participating*
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <Checkbox
                        checked={formData.placementType.includes(
                          "Virtual Placement"
                        )}
                        onChange={
                          edit
                            ? (checked) =>
                                handleCheckboxChange(
                                  "placementType",
                                  "Virtual Placement",
                                  checked === true
                                )
                            : undefined
                        }
                      />
                      <span className="ml-2">Virtual Placement</span>
                    </label>
                    <label className="flex items-center">
                      <Checkbox
                        checked={formData.placementType.includes(
                          "Campus Placement"
                        )}
                        onChange={
                          edit
                            ? (checked) =>
                                handleCheckboxChange(
                                  "placementType",
                                  "Campus Placement",
                                  checked === true
                                )
                            : undefined
                        }
                      />
                      <span className="ml-2">Campus Placement</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-blue-700 border-b pb-2">
                <GraduationCap className="w-6 h-6 text-custom-blue" />
                <h3 className="text-custom-blue">Programs</h3>
              </div>

              <div className="space-y-8">
                {/* B.Tech Programs */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">
                    B.Tech Programs (4-Year Programme)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {bTechPrograms.map((program) => (
                      <div
                        key={program.name}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={program.name}
                          checked={formData.bTechPrograms.includes(
                            program.name
                          )}
                          onChange={
                            edit
                              ? (checked) =>
                                  handleProgramCheckboxChange(
                                    "bTechPrograms",
                                    program.name,
                                    null,
                                    checked === true
                                  )
                              : undefined
                          }
                        />
                        <label htmlFor={program.name} className="text-sm">
                          {program.name}
                          <span className="text-xs text-gray-500 ml-1">
                            ({program.type})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* M.Tech Programs */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">
                    M.Tech Programs (2-Year Programme)
                  </h4>

                  {/* Circuital Branches */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-600">
                      Circuital Branches
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {mTechPrograms.circuital.map((program) => (
                        <div key={program.name} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`mtech-${program.name}`}
                              checked={
                                program.specializations.length === 0
                                  ? formData.mTechPrograms.includes(
                                      program.name
                                    )
                                  : program.specializations.every((spec) =>
                                      formData.mTechPrograms.includes(spec)
                                    )
                              }
                              onChange={
                                edit
                                  ? (checked) =>
                                      handleProgramCheckboxChange(
                                        "mTechPrograms",
                                        program.name,
                                        null,
                                        checked === true
                                      )
                                  : undefined
                              }
                            />
                            <label
                              htmlFor={`mtech-${program.name}`}
                              className="text-sm font-medium"
                            >
                              {program.name}
                            </label>
                          </div>
                          <div className="ml-6 space-y-1">
                            {program.specializations.map((spec) => (
                              <div
                                key={spec}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`spec-${spec}`}
                                  checked={formData.mTechPrograms.includes(
                                    spec
                                  )}
                                  onChange={
                                    edit
                                      ? (checked) =>
                                          handleProgramCheckboxChange(
                                            "mTechPrograms",
                                            program.name,
                                            spec,
                                            checked === true
                                          )
                                      : undefined
                                  }
                                />
                                <label
                                  htmlFor={`spec-${spec}`}
                                  className="text-xs"
                                >
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
                    <h5 className="text-sm font-medium text-gray-600">
                      Non-Circuital Branches
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {mTechPrograms.nonCircuital.map((program) => (
                        <div key={program.name} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`mtech-${program.name}`}
                              checked={
                                program.specializations.length === 0
                                  ? formData.mTechPrograms.includes(
                                      program.name
                                    )
                                  : program.specializations.every((spec) =>
                                      formData.mTechPrograms.includes(spec)
                                    )
                              }
                              onChange={
                                edit
                                  ? (checked) =>
                                      handleProgramCheckboxChange(
                                        "mTechPrograms",
                                        program.name,
                                        null,
                                        checked === true
                                      )
                                  : undefined
                              }
                            />
                            <label
                              htmlFor={`mtech-${program.name}`}
                              className="text-sm font-medium"
                            >
                              {program.name}
                            </label>
                          </div>
                          {program.specializations.length > 0 && (
                            <div className="ml-6 space-y-1">
                              {program.specializations.map((spec) => (
                                <div
                                  key={spec}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`spec-${spec}`}
                                    checked={formData.mTechPrograms.includes(
                                      spec
                                    )}
                                    onChange={
                                      edit
                                        ? (checked) =>
                                            handleProgramCheckboxChange(
                                              "mTechPrograms",
                                              program.name,
                                              spec,
                                              checked === true
                                            )
                                        : undefined
                                    }
                                  />
                                  <label
                                    htmlFor={`spec-${spec}`}
                                    className="text-xs"
                                  >
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
                        <Checkbox
                          id={`mba-${spec}`}
                          checked={formData.mbaProgramSpecializations.includes(
                            spec
                          )}
                          onChange={
                            edit
                              ? (checked) =>
                                  handleCheckboxChange(
                                    "mbaProgramSpecializations",
                                    spec,
                                    checked === true
                                  )
                              : undefined
                          }
                        />
                        <label htmlFor={`mba-${spec}`} className="text-sm">
                          {spec}
                        </label>
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
                        <Checkbox
                          id={`msc-${stream}`}
                          checked={formData.scienceStreamsSpecializations.includes(
                            stream
                          )}
                          onChange={
                            edit
                              ? (checked) =>
                                  handleCheckboxChange(
                                    "scienceStreamsSpecializations",
                                    stream,
                                    checked === true
                                  )
                              : undefined
                          }
                        />
                        <label htmlFor={`msc-${stream}`} className="text-sm">
                          {stream}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PhD Streams */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">PhD Programs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {phdPrograms.map((stream) => (
                      <div key={stream} className="flex items-center space-x-2">
                        <Checkbox
                          id={`phd-${stream}`}
                          checked={formData.phdPrograms.includes(stream)}
                          onChange={
                            edit
                              ? (checked) =>
                                  handleCheckboxChange(
                                    "phdPrograms",
                                    stream,
                                    checked === true
                                  )
                              : undefined
                          }
                        />
                        <label htmlFor={`phd-${stream}`} className="text-sm">
                          {stream}
                        </label>
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
                <h3 className="text-custom-blue">Required Skills & Details</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Skill Set Required*
                  </label>
                  <Textarea
                    name="requiredSkills"
                    value={formData.requiredSkills}
                    onChange={edit ? handleInputChange : undefined}
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
                  <h3 className="text-custom-blue">Job Details</h3>
                </div>
                <Button
                  type="button"
                  onClick={edit ? addDesignation : undefined}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-custom-blue"
                >
                  <Plus className="w-4 h-4" />
                  Add Designation
                </Button>
              </div>

              <div className="space-y-6">
                {formData.designations.map((designation, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Designation {index + 1}</h4>
                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={
                            edit ? () => removeDesignation(index) : undefined
                          }
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
                        <label className="block text-sm font-medium">
                          Designation Title*
                        </label>
                        <Input
                          value={designation.title}
                          onChange={
                            edit
                              ? (e) =>
                                  updateDesignation(
                                    index,
                                    "title",
                                    e.target.value
                                  )
                              : undefined
                          }
                          placeholder="Enter job designation"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Stipend (₹)*
                        </label>
                        <Input
                          value={designation.stipend}
                          onChange={
                            edit
                              ? (e) =>
                                  updateDesignation(
                                    index,
                                    "stipend",
                                    e.target.value
                                  )
                              : undefined
                          }
                          placeholder="Enter Stipend if Intern"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          CTC (₹)*
                        </label>
                        <Input
                          value={designation.ctc}
                          onChange={
                            edit
                              ? (e) =>
                                  updateDesignation(
                                    index,
                                    "ctc",
                                    e.target.value
                                  )
                              : undefined
                          }
                          placeholder="Enter CTC if PPO or FTE"
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Job Location*
                  </label>
                  <div className="space-y-4">
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <Checkbox
                          checked={formData.jobLocation.includes("India")}
                          onChange={
                            edit
                              ? (checked) => {
 
                                  handleCheckboxChange(
                                    "jobLocation",
                                    "India",
                                    checked === true
                                  );
                                }
                              : undefined
                          }
                        />
                        <span className="ml-2">India</span>
                      </label>
                      <label className="flex items-center">
                        <Checkbox
                          checked={formData.jobLocation.includes("Abroad")}
                          onChange={
                            edit
                              ? (checked) =>
                                  handleCheckboxChange(
                                    "jobLocation",
                                    "Abroad",
                                    checked === true
                                  )
                              : undefined
                          }
                        />
                        <span className="ml-2">Abroad</span>
                      </label>
                    </div>
                    <Input
                      name="specificLocations"
                      value={formData.specificLocations}
                      onChange={edit ? handleInputChange : undefined}
                      placeholder="Specify locations"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Bond or Service Contract
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bond"
                        checked={formData.bond === true}
                        onChange={
                          edit
                            ? () =>
                                setFormData((prev) => ({ ...prev, bond: true }))
                            : undefined
                        }
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bond"
                        checked={formData.bond === false}
                        onChange={
                          edit
                            ? () =>
                                setFormData((prev) => ({
                                  ...prev,
                                  bond: false,
                                }))
                            : undefined
                        }
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium">
                    Selection Process*
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectionProcess.map((process) => (
                      <div
                        key={process}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={process}
                          checked={formData.selectionProcess.includes(process)}
                          onChange={
                            edit
                              ? (checked) =>
                                  handleCheckboxChange(
                                    "selectionProcess",
                                    process,
                                    checked === true
                                  )
                              : undefined
                          }
                        />
                        <label htmlFor={process} className="text-sm">
                          {process}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Additional Selection Details
                    </label>
                    <Textarea
                      name="additionalSelectionDetails"
                      value={formData.additionalSelectionDetails}
                      onChange={edit ? handleInputChange : undefined}
                      placeholder="Enter any additional selection process details"
                      className="min-h-[80px] border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Summer Internship Opportunities
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="internship"
                        checked={
                          formData.summerInternshipOpportunities === true
                        }
                        onChange={
                          edit
                            ? () =>
                                setFormData((prev) => ({
                                  ...prev,
                                  summerInternshipOpportunities: true,
                                }))
                            : undefined
                        }
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="internship"
                        checked={
                          formData.summerInternshipOpportunities === false
                        }
                        onChange={
                          edit
                            ? () =>
                                setFormData((prev) => ({
                                  ...prev,
                                  summerInternshipOpportunities: false,
                                }))
                            : undefined
                        }
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    For pre-final year students (2 months)
                  </p>
                </div>
              </div>
            </section>

            {/* HR Contact Details Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between text-lg font-semibold text-blue-700 border-b pb-2">
                <div className="flex items-center gap-2">
                  <Contact className="w-6 h-6 text-custom-blue" />
                  <h3 className="text-custom-blue">HR Contact Details</h3>
                </div>
                <Button
                  type="button"
                  onClick={edit ? addHrContact : undefined}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 text-custom-blue"
                >
                  <Plus className="w-4 h-4" />
                  Add Contact
                </Button>
              </div>

              <div className="space-y-6">
                {formData.hrContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-gray-50 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">
                        Contact Person {index + 1}
                      </h4>
                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={
                            edit ? () => removeHrContact(index) : undefined
                          }
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
                        <label className="block text-sm font-medium">
                          Name*
                        </label>
                        <Input
                          value={contact.name}
                          onChange={
                            edit
                              ? (e) =>
                                  updateHrContact(index, "name", e.target.value)
                              : undefined
                          }
                          placeholder="Enter name"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Designation*
                        </label>
                        <Input
                          value={contact.designation}
                          onChange={
                            edit
                              ? (e) =>
                                  updateHrContact(
                                    index,
                                    "designation",
                                    e.target.value
                                  )
                              : undefined
                          }
                          placeholder="Enter designation"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Email*
                        </label>
                        <Input
                          type="email"
                          value={contact.email}
                          onChange={
                            edit
                              ? (e) =>
                                  updateHrContact(
                                    index,
                                    "email",
                                    e.target.value
                                  )
                              : undefined
                          }
                          placeholder="Enter email"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Phone Number*
                        </label>
                        <Input
                          type="tel"
                          value={contact.phone}
                          onChange={
                            edit
                              ? (e) =>
                                  updateHrContact(
                                    index,
                                    "phone",
                                    e.target.value
                                  )
                              : undefined
                          }
                          placeholder="Enter phone number"
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Postal Address
              </label>
              <Textarea
                name="postalAddress"
                value={formData.postalAddress}
                onChange={edit ? handleInputChange : undefined}
                placeholder="Enter postal address"
                className="min-h-[80px] border-gray-300"
              />
            </div>

            {renderActionButton()}
          </CardContent>
        </Card>
      </form>
    </>
  );
}

export default ViewJAF;