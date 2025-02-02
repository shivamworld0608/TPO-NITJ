import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const JAFPDFDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Dr. B R Ambedkar National Institute of Technology</Text>
        <Text style={styles.subHeader}>Job Announcement Form - 2024-25 Batch</Text>

        {/* Recruiter Details */}
        <Text style={styles.subHeader}>Recruiter Details</Text>
        <Text style={styles.text}>Organization Name: {formData.organizationName}</Text>
        <Text style={styles.text}>Website URL: {formData.websiteUrl}</Text>
        <Text style={styles.text}>Category: {formData.category}</Text>
        <Text style={styles.text}>Sector: {formData.sector}</Text>
        <Text style={styles.text}>Placement Type: {formData.placementType.join(', ')}</Text>

        {/* Programs */}
        <Text style={styles.subHeader}>Programs</Text>
        <Text style={styles.text}>B.Tech Programs: {formData.bTechPrograms.join(', ')}</Text>
        <Text style={styles.text}>M.Tech Programs: {formData.mTechPrograms.join(', ')}</Text>
        <Text style={styles.text}>MBA Specializations: {formData.mbaProgramSpecializations.join(', ')}</Text>
        <Text style={styles.text}>M.Sc. Programs: {formData.scienceStreamsSpecializations.join(', ')}</Text>
        <Text style={styles.text}>PhD Programs: {formData.phdPrograms.join(', ')}</Text>

        {/* Job Details */}
        <Text style={styles.subHeader}>Job Details</Text>
        {formData.designations.map((designation, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.text}>Designation {index + 1}: {designation.title}</Text>
            <Text style={styles.text}>Stipend: {designation.stipend}</Text>
            <Text style={styles.text}>CTC: {designation.ctc}</Text>
          </View>
        ))}

        {/* HR Contact Details */}
        <Text style={styles.subHeader}>HR Contact Details</Text>
        {formData.hrContacts.map((contact, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.text}>Contact Person {index + 1}: {contact.name}</Text>
            <Text style={styles.text}>Designation: {contact.designation}</Text>
            <Text style={styles.text}>Email: {contact.email}</Text>
            <Text style={styles.text}>Phone: {contact.phone}</Text>
          </View>
        ))}

        {/* Additional Information */}
        <Text style={styles.subHeader}>Additional Information</Text>
        <Text style={styles.text}>Postal Address: {formData.postalAddress}</Text>
      </View>
    </Page>
  </Document>
);

export default JAFPDFDocument;