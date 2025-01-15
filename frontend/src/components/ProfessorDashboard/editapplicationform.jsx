import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ArrowLeft, Plus, Save } from 'lucide-react';
import { Alert, AlertDescription } from "../ui/alert";
import axios from 'axios';

const EditApplicationForm = ({ jobId, onClose }) => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const studentProperties = ['gender', 'department', 'cgpa', 'name'];

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${jobId}`,
           {withCredentials:true}
        );
        const data = response.data;
        setTitle(data.title);
        setFields(data.fields || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [jobId]);

  const handleFieldChange = (index, key, value) => {
    setFields(fields.map((field, i) => 
      i === index ? { ...field, [key]: value } : field
    ));
  };

  const handleOptionChange = (index, optionIndex, value) => {
    setFields(fields.map((field, i) => 
      i === index 
        ? {
            ...field,
            options: field.options.map((opt, j) => 
              j === optionIndex ? value : opt
            )
          }
        : field
    ));
  };

  const addOption = (index) => {
    setFields(fields.map((field, i) => 
      i === index 
        ? { ...field, options: [...(field.options || []), ''] }
        : field
    ));
  };

  const addField = () => {
    setFields([
      ...fields,
      {
        fieldName: '',
        fieldType: 'text',
        isRequired: false,
        isAutoFill: false,
        options: []
      }
    ]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const saveForm = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.REACT_APP_BASE_URL}/api/form-templates/${jobId}`,
        { title, fields },
        {withCredentials:true}
      );
      
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto bg-white shadow-xl">
      <CardHeader>
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={onClose}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold text-center">
          Edit Application Form Template
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="title">Form Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter form title"
            className="w-full"
          />
        </div>

        {fields.map((field, index) => (
          <Card key={index} className="p-4 space-y-4 border border-gray-400" >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Field {index + 1}</h3>
              <Button
                variant="destructive"
                className='text-red-500'
                size="sm"
                onClick={() => removeField(index)}
              >
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Field Name</Label>
                <Input
                  value={field.fieldName}
                  onChange={(e) => handleFieldChange(index, 'fieldName', e.target.value)}
                  placeholder="Enter field name"
                />
              </div>

              <div className="space-y-2">
                <Label>Field Type</Label>
                <Select
                  value={field.fieldType}
                  onValueChange={(value) => handleFieldChange(index, 'fieldType', value)}
                  options={[
                    { value: "text", label: "Text" },
                    { value: "number", label: "Number" },
                    { value: "email", label: "Email" },
                    { value: "date", label: "Date" },
                    { value: "select", label: "Select" },
                    { value: "file", label: "File" },
                    { value: "checkbox", label: "Checkbox" },
                  ]}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
              <Checkbox
  id={`required-${index}`}
  checked={field.isRequired}
  onChange={(e) =>
    handleFieldChange(index, 'isRequired', e.target.checked)
  }
/>
<Label htmlFor={`required-${index}`}>Required</Label>

<Checkbox
  id={`autofill-${index}`}
  checked={field.isAutoFill}
  onChange={(e) =>
    handleFieldChange(index, 'isAutoFill', e.target.checked)
  }
/>
<Label htmlFor={`autofill-${index}`}>Auto-Fill</Label>

              </div>
            </div>

            {field.isAutoFill && (
              <div className="space-y-2">
                <Label>Student Property</Label>
                <Select
                  value={field.studentPropertyPath || ''}
                  onValueChange={(value) => 
                    handleFieldChange(index, 'studentPropertyPath', value)
                  }
                  options={studentProperties.map((property) => ({
                    value: property,
                    label: property,
                  }))}
                />
              </div>
            )}

            {field.fieldType === 'select' && (
              <div className="space-y-4">
                <Label>Options</Label>
                {field.options.map((option, optionIndex) => (
                  <Input
                    key={optionIndex}
                    value={option}
                    onChange={(e) => 
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addOption(index)}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
            )}
          </Card>
        ))}

        <div className="flex flex-col space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={addField}
            className="w-full bg-custom-blue text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Field
          </Button>

          <Button
            onClick={saveForm}
            className="w-full bg-green-500 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditApplicationForm;
