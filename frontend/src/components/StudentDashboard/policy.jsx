import React from 'react';
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

const Policy = () => {
  const policies = [
    'Policy 1: Description of policy 1.',
    'Policy 2: Description of policy 2.',
    'Policy 3: Description of policy 3.',
    'Policy 4: Description of policy 4.',
  ];

  const guidelines = [
    'Guideline 1: Description of guideline 1.',
    'Guideline 2: Description of guideline 2.',
    'Guideline 3: Description of guideline 3.',
    'Guideline 4: Description of guideline 4.',
  ];

  const downloadPdf = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_BASE_URL}/policyfile`,
        {
          withCredentials: true, 
          responseType: "blob", 
        }
      );

      // Create a Blob from the response data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Create a temporary <a> element to trigger the download
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute(
        "download",
        `bill_${User_Id}_${date}.pdf`
      ); // Set the desired filename for the downloaded file

      // Append the <a> element to the body and click it to trigger the download
      document.body.appendChild(tempLink);
      tempLink.click();

      // Clean up the temporary elements and URL
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">College Policies and Guidelines</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Policies</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {policies.map((policy, index) => (
              <li key={index} className="p-2 rounded hover:bg-slate-50">
                {policy}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Guidelines</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {guidelines.map((guideline, index) => (
              <li key={index} className="p-2 rounded hover:bg-slate-50">
                {guideline}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button className="w-full sm:w-auto">
        <Download
         onClick={downloadPdf}
         className="mr-2 h-4 w-4" />
        Download Policies and Guidelines (PDF)
      </Button>
    </div>
  );
};

export default Policy;