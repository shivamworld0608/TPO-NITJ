import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: { marginBottom: 10 },
  heading: { fontSize: 12, fontWeight: "bold", marginBottom: 5 },
  row: { flexDirection: "row", marginBottom: 5 },
  label: { fontSize: 10, fontWeight: "bold", width: "40%" },
  value: { fontSize: 10, width: "60%" },
  signature: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: 150,
    textAlign: "center",
    paddingTop: 5,
  },
  footer: { marginTop: 30, fontSize: 9 },
});

// PDF Document Component
const VehicleRequisitionPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
        REQUISITION FOR THE USE OF INSTITUTE VEHICLE
      </Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Indentor Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Employee Code:</Text>
          <Text style={styles.value}>{data.indentor.employeeCode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Name of the Indentor:</Text>
          <Text style={styles.value}>{data.indentor.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Designation:</Text>
          <Text style={styles.value}>{data.indentor.designation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dept./Section/Centre:</Text>
          <Text style={styles.value}>{data.indentor.department}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.value}>{data.purpose}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Personal / Official:</Text>
          <Text style={styles.value}>
            {data.isOfficial ? "Official" : "Personal"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Place to be visited:</Text>
          <Text style={styles.value}>{data.placeToVisit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Type of vehicle:</Text>
          <Text style={styles.value}>{data.vehicleType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Required Date & Time:</Text>
          <Text style={styles.value}>
            From: {new Date(data.requiredDateTime.from).toLocaleString()} To:{" "}
            {new Date(data.requiredDateTime.to).toLocaleString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Reporting To:</Text>
          <Text style={styles.value}>{data.reportingTo}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ width: "50%" }}>
          <Text style={styles.signature}>Signature of The Indentor</Text>
        </View>
        <View style={{ width: "50%" }}>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile No:</Text>
            <Text style={styles.value}>{data.indentor.mobileNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{data.indentor.email}</Text>
          </View>
        </View>
      </View>

      {data.driverDetails.name && (
        <View style={styles.section}>
          <Text style={styles.heading}>Driver Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name of Driver:</Text>
            <Text style={styles.value}>{data.driverDetails.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile No. of Driver:</Text>
            <Text style={styles.value}>{data.driverDetails.mobileNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Vehicle No/Type:</Text>
            <Text style={styles.value}>
              {data.driverDetails.vehicleNumber} /{" "}
              {data.driverDetails.vehicleType}
            </Text>
          </View>
        </View>
      )}

      {data.journeyReport.startTime && (
        <View style={styles.section}>
          <Text style={styles.heading}>Journey Completion Report</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Journey commenced at:</Text>
            <Text style={styles.value}>
              {new Date(data.journeyReport.startTime).toLocaleString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Journey completed at:</Text>
            <Text style={styles.value}>
              {new Date(data.journeyReport.endTime).toLocaleString()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>KM covered:</Text>
            <Text style={styles.value}>
              {data.journeyReport.kilometresCovered}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Charges, if any:</Text>
            <Text style={styles.value}>{data.journeyReport.charges}</Text>
          </View>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <View style={styles.signature}>
          <Text>Registrar</Text>
        </View>
        <View style={styles.signature}>
          <Text>Assistant Registrar (Store)</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        C.C. to:-
        {"\n"}- Driver concerned
        {"\n"}- Indentor for Information
      </Text>
    </Page>
  </Document>
);

const VehicleRequisitionForm = ({ existingData }) => {
  const initialFormData = {
    indentor: {
      employeeCode: "",
      name: "",
      designation: "",
      department: "",
      mobileNumber: "",
      email: "",
    },
    purpose: "",
    isOfficial: false,
    supportingDocument: "",
    placeToVisit: "",
    vehicleType: "",
    requiredDateTime: {
      from: "",
      to: "",
    },
    driverDetails: {
      name: "",
      mobileNumber: "",
      vehicleNumber: "",
      vehicleType: "",
    },
    reportingTo: "",
    journeyReport: {
      startTime: "",
      endTime: "",
      kilometresCovered: "",
      charges: "",
    },
  };

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [showJourneyReport, setShowJourneyReport] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data for file upload
      const submitData = new FormData();
      if (file) {
        submitData.append("supportingDocument", file);
      }

      // Add the rest of the form data
      submitData.append("formData", JSON.stringify(formData));

      // Send data to backend
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/travel-planner/vehicle`,
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Vehicle requisition submitted successfully!");
      setIsFormSubmitted(true);
      // Don't reset form data after submission so PDF can be generated
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit requisition. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJourneyReportSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.patch(
        `/api/vehicle-requisition/${formData._id}/journey-report`,
        {
          journeyReport: formData.journeyReport,
        }
      );

      toast.success("Journey report submitted successfully!");
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Error submitting journey report:", error);
      toast.error("Failed to submit journey report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleJourneyReport = () => {
    setShowJourneyReport(!showJourneyReport);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          REQUISITION FOR THE USE OF INSTITUTE VEHICLE
        </h2>
        <div className="text-right">
          <p>Date: {new Date().toLocaleDateString("en-GB")}</p>
          {isFormSubmitted && (
            <PDFDownloadLink
              document={<VehicleRequisitionPDF data={formData} />}
              fileName="vehicle_requisition.pdf"
              className="mt-2 inline-block bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Preparing PDF..." : "Download PDF"
              }
            </PDFDownloadLink>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Indentor Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                1- Employee Code:
              </label>
              <input
                type="text"
                name="indentor.employeeCode"
                value={formData.indentor?.employeeCode || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name of the Indentor:
              </label>
              <input
                type="text"
                name="indentor.name"
                value={formData.indentor?.name || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              2- Designation:
            </label>
            <input
              type="text"
              name="indentor.designation"
              value={formData.indentor?.designation || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              3- Dept./Section/Centre:
            </label>
            <input
              type="text"
              name="indentor.department"
              value={formData.indentor?.department || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              4- Purpose:
            </label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-4">
              5- Personal / Official:
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isOfficial"
                  checked={!formData.isOfficial || false}
                  onChange={() =>
                    setFormData({ ...formData, isOfficial: false })
                  }
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Personal</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isOfficial"
                  checked={formData.isOfficial || false}
                  onChange={() =>
                    setFormData({ ...formData, isOfficial: true })
                  }
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Official</span>
              </label>
            </div>

            {formData.isOfficial && (
              <div className="ml-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  (Please attach supporting document if official)
                </p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              6- Place to be visited:
            </label>
            <input
              type="text"
              name="placeToVisit"
              value={formData.placeToVisit || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              7- Type of vehicle:
            </label>
            <input
              type="text"
              name="vehicleType"
              value={formData.vehicleType || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                8- Date & Time when required (from):
              </label>
              <input
                type="datetime-local"
                name="requiredDateTime.from"
                value={formData.requiredDateTime?.from || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                and to:
              </label>
              <input
                type="datetime-local"
                name="requiredDateTime.to"
                value={formData.requiredDateTime?.to || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              9- Reporting:
            </label>
            <input
              type="text"
              name="reportingTo"
              value={formData.reportingTo || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Signature of The Indentor
            </label>
            <div className="mt-1 border-b-2 border-gray-300"></div>
          </div>
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile No:
              </label>
              <input
                type="text"
                name="indentor.mobileNumber"
                value={formData.indentor?.mobileNumber || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                E-mail:
              </label>
              <input
                type="email"
                name="indentor.email"
                value={formData.indentor?.email || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">
            Assistant Registrar (Store)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                1- Name of Driver:
              </label>
              <input
                type="text"
                name="driverDetails.name"
                value={formData.driverDetails?.name || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={!existingData}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                2- Mobile No. of Driver:
              </label>
              <input
                type="text"
                name="driverDetails.mobileNumber"
                value={formData.driverDetails?.mobileNumber || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={!existingData}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              3- Vehicle No /Vehicle type:
            </label>
            <input
              type="text"
              name="driverDetails.vehicleNumber"
              value={formData.driverDetails?.vehicleNumber || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!existingData}
            />
          </div>
        </div>

        {/* Collapsible Journey Report Section */}
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Journey completion report</h3>
            <button
              type="button"
              onClick={toggleJourneyReport}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              {showJourneyReport ? "Hide" : "Show"} Journey Report
            </button>
          </div>

          {showJourneyReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    1- Journey commenced at:
                  </label>
                  <input
                    type="datetime-local"
                    name="journeyReport.startTime"
                    value={formData.journeyReport?.startTime || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    2- Journey completed at:
                  </label>
                  <input
                    type="datetime-local"
                    name="journeyReport.endTime"
                    value={formData.journeyReport?.endTime || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  3- KM covered:
                </label>
                <input
                  type="number"
                  name="journeyReport.kilometresCovered"
                  value={formData.journeyReport?.kilometresCovered || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  4- Charges, if any:
                </label>
                <input
                  type="number"
                  name="journeyReport.charges"
                  value={formData.journeyReport?.charges || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div className="mt-8 flex justify-between">
                <div>
                  <p className="font-medium">Signature of the Indentor</p>
                  <div className="mt-1 border-b-2 border-gray-300 w-40"></div>
                </div>
                <div>
                  <p className="font-medium">Signature of the Driver</p>
                  <div className="mt-1 border-b-2 border-gray-300 w-40"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0">
            <p className="font-medium">Registrar</p>
            <div className="mt-1 border-b-2 border-gray-300 w-40"></div>
          </div>
          <div>
            <p className="font-medium">Assistant Registrar (Store)</p>
            <div className="mt-1 border-b-2 border-gray-300 w-40"></div>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-medium">C.C. to:-</p>
          <ul className="ml-8 list-disc">
            <li>Driver concerned</li>
            <li>Indentor for Information</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-grow bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isSubmitting ? "Submitting..." : "Submit Requisition"}
          </button>

          {formData.journeyReport?.startTime && (
            <button
              type="button"
              onClick={handleJourneyReportSubmit}
              disabled={isSubmitting}
              className="flex-grow bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
            >
              {isSubmitting ? "Submitting..." : "Submit Journey Report"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VehicleRequisitionForm;
