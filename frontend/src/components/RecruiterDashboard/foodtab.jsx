import React, { useState } from "react";
import { Trash2, PlusCircle } from "lucide-react";

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
    <div className="mt-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 sm:p-8 p-2">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Meal Details
          </h3>
          <p className="text-gray-600 mt-2">
            Please specify the number of persons required for each meal
          </p>
        </div>

        <div className="grid gap-8">
          {foodDetails.tableRows.map((row, index) => (
            <div key={index} className="bg-gray-50 rounded-lg sm:p-6 p-2 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 mr-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={row.date || ""}
                    onChange={(e) => handleRowChange(index, "date", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                  />
                  {errors[`date-${index}`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`date-${index}`]}</p>
                  )}
                </div>
                <button
                  onClick={() => removeRow(index)}
                  className="p-2 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors self-end"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["breakfast", "lunch", "dinner", "snacks"].map((meal) => (
                  <div key={meal} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {meal}
                    </label>
                    <input
                      type="number"
                      value={row[meal] || ""}
                      onChange={(e) => handleRowChange(index, meal, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
                      min="0"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={addRow}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-lg border-2 border-dashed border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors w-full"
          >
            <PlusCircle className="w-5 h-5" />
            Add Another Day
          </button>

          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={foodDetails.notes || ""}
              onChange={(e) => setFoodDetails({ ...foodDetails, notes: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:border-transparent bg-white"
              rows={3}
              placeholder="Enter any special dietary requirements, preferences, or additional notes..."
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full mt-6 py-4 px-6 bg-custom-blue text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 transition-colors text-lg"
      >
        Continue to Next Step
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-custom-blue mb-2">
          Food Arrangements
        </h2>
        <p className="text-custom-blue">
          Would you like to arrange meals for your event?
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <button
          onClick={() => setWantFood(true)}
          className={`px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            wantFood
              ? "bg-custom-blue text-white hover:bg-custom-blue shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setWantFood(false);
            onNext();
          }}
          className={`px-6 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
            wantFood === false
              ? "bg-red-500 text-white hover:bg-red-600 shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          No
        </button>
      </div>
      {wantFood && renderFoodForm()}
    </div>
  );
}

export default FoodArrangementTab;