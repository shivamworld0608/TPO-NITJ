import pandas as pd
import json
import secrets
import string

# Function04 to generate a 12-character strong random password
def generate_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(characters) for _ in range(length))
    return password

# Define course durations
course_durations = {
    "B.Tech": 4,
    "M.Tech": 2,
    "B.Sc.-B.Ed.": 4,
    "MBA": 2,
    "M.Sc.": 2
}

# Read the Excel file
excel_file = "NITJStudentdata.xlsx"  # Replace with the actual path to your Excel file
try:
    df = pd.read_excel(excel_file)
except FileNotFoundError:
    print(f"Error: The file '{excel_file}' was not found. Please check the file path.")
    exit(1)
except Exception as e:
    print(f"Error reading Excel file: {str(e)}")
    exit(1)

# Initialize the list to store student data
students = []

# Define default values for fields not present in the Excel sheet
default_values = {
    "phone": "",
    "address": "",
    "cgpa": "",
    "active_backlogs": False,
    "backlogs_history": False,
    "debarred": False,
    "disability": False,
    "image": "",
    "placementstatus": "Not Placed",
    "internshipstatus": "No Intern",
    "account_deactivate": False,
    "otp": ""
}

# Process each row in the DataFrame
for _, row in df.iterrows():
    student = {}
    
    # Map fields from Excel to schema
    student["name"] = row["Name"] if pd.notna(row["Name"]) else ""
    student["email"] = row["Official Email Id"] if pd.notna(row["Official Email Id"]) else ""
    student["rollno"] = str(row["Roll No."]) if pd.notna(row["Roll No."]) else ""
    student["department"] = row["Branch"] if pd.notna(row["Branch"]) else ""
    student["course"] = row["Course"] if pd.notna(row["Course"]) else ""
    student["gender"] = row["Gender"] if pd.notna(row["Gender"]) else "Other"
    
    # Handle category: Replace EWS with GEN-EWS
    category = row["Category"] if pd.notna(row["Category"]) else ""
    if category == "EWS":
        student["category"] = "GEN-EWS"
    else:
        student["category"] = category
    
    # Generate a random strong password
    student["password"] = generate_password()
    
    # Calculate adjusted batch based on course duration
    original_batch = row["Batch"] if pd.notna(row["Batch"]) else None
    course = row["Course"] if pd.notna(row["Course"]) else ""
    
    if original_batch and course in course_durations:
        try:
            batch_year = int(original_batch)
            duration = course_durations[course]
            adjusted_batch = batch_year + duration
            student["batch"] = str(adjusted_batch)
        except ValueError:
            student["batch"] = ""  # Fallback if batch cannot be converted to int
    else:
        student["batch"] = ""  # Fallback if batch or course is invalid
    
    # Add default values for fields not in Excel
    for field, value in default_values.items():
        student[field] = value
    
    # Append the student to the list
    students.append(student)

# Write the data to a JSON file
output_json = "students.json"
with open(output_json, "w") as json_file:
    json.dump(students, json_file, indent=4)

print(f"JSON file '{output_json}' has been generated successfully.")