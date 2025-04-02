import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import axios from "axios";
import html2pdf from "html2pdf.js"; // Import html2pdf

const MealArrangementForm = ({ existingData, isEditing = false }) => {
  const printRef = useRef();
  const [edit, setEdit] = useState(false);

  const purposeOptions = [
    { id: 1, text: "Meeting of BOGs/Finance Committee/Senate/B&WC", num: 8 },
    { id: 2, text: "Selection Committee/Screening Committee", num: 9 },
    { id: 3, text: "Audit Team", num: null },
    { id: 4, text: "Experts to deliver lectures", num: null },
    {
      id: 5,
      text: "Dissertation project evaluation/Viva-voce Examination",
      num: 12,
    },
    { id: 6, text: "Accreditation Team", num: 13 },
    { id: 7, text: "Departmental Visiting Committee", num: 14 },
    { id: 8, text: "Pre Placement Talk / Campus Interviews", num: null },
    { id: 9, text: "Industry-Institute-Interaction activities", num: null },
    { id: 10, text: "Board of Studies meeting", num: null },
    {
      id: 11,
      text: "Short term course/Seminar/Conference/ Workshop",
      num: null,
    },
    {
      id: 12,
      text: "Comprehensive/Pre-submission/Final Viva-voce Examination and Thesis Evaluation etc.",
      num: null,
    },
    { id: 13, text: "Personal Programmes", num: null },
    { id: 14, text: "Any other", num: null },
  ];

  // Initialize form state with existing data or defaults
  const [formData, setFormData] = useState({
    recruiterId: "",
    visitingOrganization: "",
    purposeOfVisit: "",
    mealArrangements: [
      {
        date: format(new Date(), "yyyy-MM-dd"),
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snacks: 0,
      },
    ],
    notes: "",
    bookingPerson: {
      name: "",
      designation: "",
      department: "",
      mobileNumber: "",
      email: "",
      address: "",
    },
    departmentHeadApproval: {
      approved: false,
      remarks: "",
      approvalDate: null,
    },
    guestHouseSupervisorApproval: {
      approved: false,
      remarks: "",
    },
    inviteeList: [""],
  });

  // Load existing data if in edit mode
  useEffect(() => {
    if (isEditing && existingData) {
      // Format dates for the form
      const formattedData = {
        ...existingData,
        mealArrangements: existingData.mealArrangements.map((arr) => ({
          ...arr,
          date: format(new Date(arr.date), "yyyy-MM-dd"),
        })),
      };
      setFormData(formattedData);
    }
  }, [isEditing, existingData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle meal arrangement changes
  const handleMealChange = (index, field, value) => {
    const updatedArrangements = [...formData.mealArrangements];
    updatedArrangements[index] = {
      ...updatedArrangements[index],
      [field]: field === "date" ? value : parseInt(value, 10) || 0,
    };

    setFormData({
      ...formData,
      mealArrangements: updatedArrangements,
    });
  };

  // Add new meal arrangement row
  const addMealArrangement = () => {
    setFormData({
      ...formData,
      mealArrangements: [
        ...formData.mealArrangements,
        {
          date: format(new Date(), "yyyy-MM-dd"),
          breakfast: 0,
          lunch: 0,
          dinner: 0,
          snacks: 0,
        },
      ],
    });
  };

  // Remove meal arrangement row
  const removeMealArrangement = (index) => {
    if (formData.mealArrangements.length > 1) {
      const updatedArrangements = formData.mealArrangements.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        mealArrangements: updatedArrangements,
      });
    }
  };

  // Handle invitee list changes
  const handleInviteeChange = (index, value) => {
    const updatedInvitees = [...formData.inviteeList];
    updatedInvitees[index] = value;

    setFormData({
      ...formData,
      inviteeList: updatedInvitees,
    });
  };

  // Add new invitee field
  const addInvitee = () => {
    setFormData({
      ...formData,
      inviteeList: [...formData.inviteeList, ""],
    });
  };

  // Remove invitee field
  const removeInvitee = (index) => {
    if (formData.inviteeList.length > 1) {
      const updatedInvitees = formData.inviteeList.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        inviteeList: updatedInvitees,
      });
    }
  };

  // Handle department head approval
  const handleApprovalChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      departmentHeadApproval: {
        ...formData.departmentHeadApproval,
        [name]: checked,
        approvalDate: checked ? new Date() : null,
      },
    });
  };

  // Handle guest house supervisor approval
  const handleGuestHouseApprovalChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      guestHouseSupervisorApproval: {
        ...formData.guestHouseSupervisorApproval,
        [name]: checked,
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format dates for backend
    const formattedData = {
      ...formData,
      mealArrangements: formData.mealArrangements.map((arr) => ({
        ...arr,
        date: new Date(arr.date),
      })),
    };
    console.log(formattedData);

    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/travel-planner/food`,
        formattedData,
        { withCredentials: true }
      );
      console.log("Success:", response.data);
      alert("Form submitted successfully!");
      setEdit(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  // Replace handlePrint with html2pdf logic
  const handleDownloadPDF = () => {
    const element = printRef.current;
    if (!element) {
      console.error("No content to print!");
      return;
    }

    // Configure html2pdf options
    const options = {
      margin: 1,
      filename: "Meal_Arrangement_Form.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate and download PDF
    html2pdf().from(element).set(options).save();
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form for submission */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-6 border rounded shadow">
          {!edit && (
            <div className="p-6">
              {/* PDF View */}
              <div ref={printRef} className="p-6 bg-white">
                {/* Header */}
                <div className="text-center mb-2">
                  <h2 className="text-base font-bold">
                    DR B R AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY,
                    JALANDHAR-144008, PUNJAB (INDIA)
                  </h2>
                </div>

                {/* Document Info */}
                <div className="flex justify-between mb-1 text-sm">
                  <div>Ref no.NITJ/: {formData._id}</div>
                  <div>Dated: {format(new Date(), "dd/MM/yyyy")}</div>
                  <div>G-9</div>
                </div>

                {/* Title */}
                <div className="text-center font-bold mb-4 text-base">
                  <h2 className="underline">
                    ARRANGEMENT FOR LUNCH/DINNER/BREAKFAST
                  </h2>
                </div>

                {/* Organization & Purpose */}
                <div className="mb-4 text-sm">
                  <div className="flex items-baseline mb-2">
                    <span className="whitespace-nowrap">
                      The officials from
                    </span>
                    <div className="border-b border-black flex-1 mx-2 min-w-[250px]">
                      {formData.visitingOrganization}
                    </div>
                    <span>are visiting the Institute for the purpose of</span>
                  </div>
                  <div className="mb-1">(tick whichever is applicable)</div>

                  {/* Purpose table */}
                  <table className="border-collapse border border-black mb-2 text-sm">
                    <tbody>
                      {[...Array(7)].map((_, index) => {
                        const firstPurpose = purposeOptions.find(
                          (p) => p.id === index + 1
                        );
                        const secondPurpose = purposeOptions.find(
                          (p) => p.id === index + 8
                        );

                        return (
                          <tr key={index}>
                            <td className="border border-black p-1 w-6 text-center">
                              {index + 1}
                            </td>
                            <td className="border border-black p-1">
                              {firstPurpose?.text}
                              {formData.purposeOfVisit === firstPurpose?.text &&
                                " ✓"}
                            </td>
                            <td className="border border-black p-1 w-6 text-center">
                              {index + 8}
                            </td>
                            <td className="border border-black p-1">
                              {secondPurpose?.text}
                              {formData.purposeOfVisit ===
                                secondPurpose?.text && " ✓"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Invitee section */}
                  <div className="mb-4 text-sm">
                    <div>
                      The list of invitees is attached. Please arrange to
                      provide the breakfast/lunch/dinner as per the following
                      details:-
                    </div>

                    {formData.inviteeList &&
                      formData.inviteeList.map((invitee, index) => (
                        <span key={index} className="mb-2 mr-5 ">
                          {index + 1}. {invitee}
                        </span>
                      ))}

                    {/* Meal Planning Table */}
                    <div className="mb-2 mt-1">
                      Arrangement to be made for Nos. of persons
                    </div>
                    <table className="w-full border-collapse border border-black mb-2 text-sm">
                      <thead>
                        <tr>
                          <th className="border border-black p-1">Date</th>
                          <th className="border border-black p-1">
                            Breakfast
                            <br />
                            Nos.
                          </th>
                          <th className="border border-black p-1">
                            Lunch
                            <br />
                            Nos.
                          </th>
                          <th className="border border-black p-1">
                            Dinner
                            <br />
                            Nos.
                          </th>
                          <th className="border border-black p-1">
                            Tea/Coffee/Snacks
                            <br />
                            Nos.
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.mealArrangements.map((meal, index) => (
                          <tr key={index}>
                            <td className="border border-black p-1">
                              {formatDate(meal.date)}
                            </td>
                            <td className="border border-black p-1 text-center">
                              {meal.breakfast > 0 ? meal.breakfast : ""}
                            </td>
                            <td className="border border-black p-1 text-center">
                              {meal.lunch > 0 ? meal.lunch : ""}
                            </td>
                            <td className="border border-black p-1 text-center">
                              {meal.dinner > 0 ? meal.dinner : ""}
                            </td>
                            <td className="border border-black p-1 text-center">
                              {meal.snacks > 0 ? meal.snacks : ""}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mb-2 text-sm">
                      payment shall be made by the person making/submitting
                      requisition for booking.
                    </div>

                    {/* Booking Person Info */}
                    <div className="mb-1 text-sm">
                      <div className="font-bold mb-1">
                        Details of person making the Booking
                      </div>
                      <div className="mb-2">
                        <div className="flex">
                          <div className="w-24">Name</div>
                          <div className="border-b border-black flex-1 min-w-[300px]">
                            {formData.bookingPerson.name}
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex">
                          <div className="w-24">Designation</div>
                          <div className="border-b border-black flex-1 min-w-[300px]">
                            {formData.bookingPerson.designation}
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex">
                          <div className="w-40">Department/Section/Centre</div>
                          <div className="border-b border-black flex-1 min-w-[300px] ml-5">
                            {formData.bookingPerson.department}
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 flex">
                        <div className="w-24">Mobile No</div>
                        <div className="border-b border-black w-40 mr-4">
                          {formData.bookingPerson.mobileNumber}
                        </div>
                        <div className="w-14">E-mail</div>
                        <div className="border-b border-black flex-1 min-w-[200px]">
                          {formData.bookingPerson.email}
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex">
                          <div className="w-24">Address</div>
                          <div className="border-b border-black flex-1 min-w-[300px]">
                            {formData.bookingPerson.address}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mb-2">
                        <div className="text-center">
                          <div className="border-b border-black w-40 h-8 mb-1"></div>
                          <div>(Signature)</div>
                        </div>
                      </div>
                      <div className="text-right mb-2">
                        Remarks by Head of the Department/Section
                      </div>
                    </div>

                    {/* Department Head Section */}
                    <div className="mb-2 text-sm">
                      {/* <div className="h-12 mb-4">{formData.departmentHeadApproval.remarks}</div> */}
                      <div className="flex">
                        <div className="w-12">Date:</div>
                        <div className="border-b border-black w-32 mr-12">
                          {formData.departmentHeadApproval.approvalDate
                            ? format(
                                new Date(
                                  formData.departmentHeadApproval.approvalDate
                                ),
                                "dd/MM/yyyy"
                              )
                            : ""}
                        </div>
                        <div className="text-center">
                          Head of the Department/Office
                        </div>
                      </div>
                    </div>

                    {/* Office Use Section */}
                    <div className="mb-6 text-sm">
                      <div className="text-center font-bold mb-1">
                        For office use only
                      </div>
                      <div className="mb-2">
                        Arrangement of lunch/dinner/breakfast/snacks can be
                        provided as requested above. May please allow.
                      </div>
                      <div className="flex justify-end space-x-4">
                        <div className="text-center">
                          <div className="border-b border-black w-40 h-8 mb-1"></div>
                          <div>Guest House Supervisor</div>
                        </div>
                        <div className="text-center">
                          <div className="border-b border-black w-40 h-8 mb-1"></div>
                          <div>Registrar</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Control buttons outside printable area */}
          {!edit && (
            <div className="flex justify-end gap-4 p-6 bg-gray-50 border-t">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Download as PDF
              </button>

              <button
                type="button"
                className="border px-4 py-2 rounded hover:bg-gray-100"
                onClick={() => setEdit(true)}
              >
                Edit Form
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Hidden form for data input */}
      {edit && (
        <div className="border rounded shadow p-6">
          <h3 className="text-lg font-bold mb-4">
            Form Details (This section won't appear in the PDF)
          </h3>

          {/* Organization & Purpose */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="visitingOrganization">The officials from</label>
              <input
                id="visitingOrganization"
                name="visitingOrganization"
                value={formData.visitingOrganization}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="purposeOfVisit">
                Purpose of visit (select applicable)
              </label>
              <select
                id="purposeOfVisit"
                onChange={(e) =>
                  setFormData({ ...formData, purposeOfVisit: e.target.value })
                }
                value={formData.purposeOfVisit}
                className="w-full border p-2 rounded"
              >
                <option value="">Select purpose</option>
                {purposeOptions.map((purpose) => (
                  <option key={purpose.id} value={purpose.text}>
                    {purpose.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Invitee List */}
          <div className="mb-6">
            <label>The list of invitees:</label>
            <div className="space-y-2 mt-2">
              {formData.inviteeList.map((invitee, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={invitee}
                    onChange={(e) => handleInviteeChange(index, e.target.value)}
                    placeholder={`Invitee ${index + 1}`}
                    className="flex-1 border p-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeInvitee(index)}
                    disabled={formData.inviteeList.length <= 1}
                    className="border px-3 py-1 rounded bg-red-50 hover:bg-red-100 disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addInvitee}
                className="border px-3 py-1 rounded mt-2 bg-blue-50 hover:bg-blue-100"
              >
                Add Invitee
              </button>
            </div>
          </div>

          {/* Meal Arrangements Table */}
          <div className="mb-6">
            <label className="block mb-2">
              Arrangement to be made for Nos. of persons
            </label>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Breakfast (Nos.)</th>
                    <th className="border p-2">Lunch (Nos.)</th>
                    <th className="border p-2">Dinner (Nos.)</th>
                    <th className="border p-2">Tea/Coffee/Snacks (Nos.)</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.mealArrangements.map((arrangement, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        <input
                          type="date"
                          value={arrangement.date}
                          onChange={(e) =>
                            handleMealChange(index, "date", e.target.value)
                          }
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          min="0"
                          value={arrangement.breakfast}
                          onChange={(e) =>
                            handleMealChange(index, "breakfast", e.target.value)
                          }
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          min="0"
                          value={arrangement.lunch}
                          onChange={(e) =>
                            handleMealChange(index, "lunch", e.target.value)
                          }
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          min="0"
                          value={arrangement.dinner}
                          onChange={(e) =>
                            handleMealChange(index, "dinner", e.target.value)
                          }
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          min="0"
                          value={arrangement.snacks}
                          onChange={(e) =>
                            handleMealChange(index, "snacks", e.target.value)
                          }
                          className="w-full border p-1 rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <button
                          type="button"
                          onClick={() => removeMealArrangement(index)}
                          disabled={formData.mealArrangements.length <= 1}
                          className="w-full border px-2 py-1 rounded bg-red-50 hover:bg-red-100 disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addMealArrangement}
              className="border px-3 py-1 rounded mt-2 bg-blue-50 hover:bg-blue-100"
            >
              Add Date
            </button>
          </div>

          {/* Booking Person Details */}
          <div className="mb-6">
            <h3 className="font-bold text-center mb-4">
              Details of person making the Booking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bookingPerson.name">Name</label>
                <input
                  id="bookingPerson.name"
                  name="bookingPerson.name"
                  value={formData.bookingPerson?.name || ""}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="bookingPerson.designation">Designation</label>
                <input
                  id="bookingPerson.designation"
                  name="bookingPerson.designation"
                  value={formData.bookingPerson?.designation || ""}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="bookingPerson.department">
                  Department/Section/Centre
                </label>
                <input
                  id="bookingPerson.department"
                  name="bookingPerson.department"
                  value={formData.bookingPerson?.department || ""}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="bookingPerson.mobileNumber">Mobile No</label>
                <input
                  id="bookingPerson.mobileNumber"
                  name="bookingPerson.mobileNumber"
                  value={formData.bookingPerson?.mobileNumber || ""}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="bookingPerson.email">E-mail</label>
                <input
                  id="bookingPerson.email"
                  name="bookingPerson.email"
                  type="email"
                  value={formData.bookingPerson?.email || ""}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="bookingPerson.address">Address</label>
                <input
                  id="bookingPerson.address"
                  name="bookingPerson.address"
                  value={formData.bookingPerson?.address || ""}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded mt-1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Approval Section */}
          <div className="mb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="departmentApproval"
                  name="approved"
                  checked={formData.departmentHeadApproval.approved || false}
                  onChange={handleApprovalChange}
                />
                <label htmlFor="departmentApproval">
                  Department Head Approval
                </label>
              </div>
              <div>
                <label htmlFor="departmentHeadRemarks">Remarks</label>
                <textarea
                  id="departmentHeadRemarks"
                  name="departmentHeadApproval.remarks"
                  value={formData.departmentHeadApproval.remarks || ""}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full border p-2 rounded mt-1"
                ></textarea>
              </div>
            </div>
          </div>

          {/* For office use only */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="guestHouseApproval"
                name="approved"
                checked={
                  formData.guestHouseSupervisorApproval.approved || false
                }
                onChange={handleGuestHouseApprovalChange}
              />
              <label htmlFor="guestHouseApproval">
                Guest House Supervisor Approval
              </label>
            </div>
            <div>
              <label htmlFor="guestHouseSupervisorRemarks">Remarks</label>
              <textarea
                id="guestHouseSupervisorRemarks"
                name="guestHouseSupervisorApproval.remarks"
                value={formData.guestHouseSupervisorApproval.remarks || ""}
                onChange={handleInputChange}
                rows={2}
                className="w-full border p-2 rounded mt-1"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-4 p-6 bg-gray-50 border-t">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Download as PDF
            </button>
            {edit && (
              <button
                type="button"
                className="border px-4 py-2 rounded hover:bg-gray-100"
                onClick={() => {
                  setEdit(false);
                  window.location.reload();
                }}
              >
                Cancel
              </button>
            )}

            {edit && (
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit Meal Arrangement
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealArrangementForm;
