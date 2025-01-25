import React, { useState } from "react";

function FoodArrangementTab({
  wantFood,
  setWantFood,
  foodDetails,
  setFoodDetails,
  onNext,
}) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    foodDetails.tableRows.forEach((row, index) => {
      if (!row.date) newErrors[`date-${index}`] = "Date is required.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...foodDetails.tableRows];
    updatedRows[index][field] = value;
    setFoodDetails((prev) => ({ ...prev, tableRows: updatedRows }));
  };

  const addRow = () => {
    setFoodDetails((prev) => ({
      ...prev,
      tableRows: [
        ...prev.tableRows,
        { date: "", breakfast: "", lunch: "", dinner: "", snacks: "" },
      ],
    }));
  };

  const removeRow = (index) => {
    const updatedRows = foodDetails.tableRows.filter((_, i) => i !== index);
    setFoodDetails((prev) => ({ ...prev, tableRows: updatedRows }));
  };

  const renderFoodForm = () => (
    <div className="space-y-6 mt-6">
      <h3 className="text-lg font-medium text-blue-900">Meal Details</h3>
      <h3 className="text-lg font-medium text-blue-900 text-center">Arrangement to be made for Nos. of persons</h3>
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Breakfast</th>
            <th className="border border-gray-300 p-2">Lunch</th>
            <th className="border border-gray-300 p-2">Dinner</th>
            <th className="border border-gray-300 p-2">Snacks</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodDetails.tableRows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                <input
                  type="date"
                  value={row.date || ""}
                  onChange={(e) =>
                    handleRowChange(index, "date", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                {errors[`date-${index}`] && (
                  <p className="text-red-500 text-sm">{errors[`date-${index}`]}</p>
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={row.breakfast || ""}
                  onChange={(e) =>
                    handleRowChange(index, "breakfast", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={row.lunch || ""}
                  onChange={(e) =>
                    handleRowChange(index, "lunch", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={row.dinner || ""}
                  onChange={(e) =>
                    handleRowChange(index, "dinner", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={row.snacks || ""}
                  onChange={(e) =>
                    handleRowChange(index, "snacks", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => removeRow(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Row
      </button>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          value={foodDetails.notes || ""}
          onChange={(e) =>
            setFoodDetails({ ...foodDetails, notes: e.target.value })
          }
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <button
        onClick={handleNext}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900">
        Do you need food arrangements?
      </h2>
      <div className="flex gap-4">
        <button
          onClick={() => setWantFood(true)}
          className={`flex-1 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
            wantFood === true
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setWantFood(false);
            onNext();
          }}
          className={`flex-1 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
            wantFood === false
              ? "bg-red-500 text-white shadow-lg shadow-red-200"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          No
        </button>
      </div>
      {wantFood === true && renderFoodForm()}
    </div>
  );
}

export default FoodArrangementTab;