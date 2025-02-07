import React from 'react';
import { Download } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';


const CardSkeleton = () => (
    <div className="space-y-3 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse space-y-2 p-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#ffffff',
      fontFamily: 'Helvetica',
    },
    header: {
      marginBottom: 30,
      borderBottom: '2 solid #2563eb',
      paddingBottom: 15,
    },
    title: {
      fontSize: 28,
      color: '#1e40af',
      marginBottom: 12,
      fontFamily: 'Helvetica-Bold',
    },
    subtitle: {
      fontSize: 12,
      color: '#6b7280',
      marginBottom: 8,
    },
    section: {
      marginTop: 25,
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 18,
      color: '#1e40af',
      backgroundColor: '#f0f9ff',
      padding: 10,
      marginBottom: 15,
      borderRadius: 4,
      fontFamily: 'Helvetica-Bold',
    },
    companyDetails: {
      marginLeft: 20,
      marginBottom: 20,
      backgroundColor: '#ffffff',
      padding: 15,
      borderRadius: 4,
      border: '1 solid #e5e7eb',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 8,
      alignItems: 'center',
    },
    label: {
      width: 130,
      fontSize: 12,
      color: '#4b5563',
      fontFamily: 'Helvetica-Bold',
    },
    value: {
      flex: 1,
      fontSize: 12,
      color: '#111827',
    },
    studentSection: {
      marginTop: 10,
      marginBottom: 15,
      padding: 15,
      backgroundColor: '#f8fafc',
      borderRadius: 4,
    },
    studentHeader: {
      fontSize: 16,
      color: '#1e40af',
      marginBottom: 10,
      fontFamily: 'Helvetica-Bold',
      borderBottom: '1 solid #e5e7eb',
      paddingBottom: 5,
    },
    studentInfo: {
      marginLeft: 15,
      marginTop: 8,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 40,
      right: 40,
      textAlign: 'center',
      color: '#6b7280',
      fontSize: 10,
      borderTop: '1 solid #e5e7eb',
      paddingTop: 15,
    },
    watermark: {
      position: 'absolute',
      bottom: 60,
      right: 40,
      fontSize: 8,
      color: '#9ca3af',
      transform: 'rotate(-45deg)',
    },
    headerMetadata: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      color: '#6b7280',
      fontSize: 10,
    },
  });
  
  const PlacementPDF = ({ placement }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Placement Details</Text>
          <View style={styles.headerMetadata}>
            <Text style={styles.subtitle}>
              Reference: PL-{placement._id?.slice(-6).toUpperCase() || 'XXXXXX'}
            </Text>
            <Text style={styles.subtitle}>
              Generated on {new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Information</Text>
          <View style={styles.companyDetails}>
            <View style={styles.row}>
              <Text style={styles.label}>Company Name:</Text>
              <Text style={styles.value}>{placement.company_name || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Placement Type:</Text>
              <Text style={styles.value}>{placement.placement_type || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Batch:</Text>
              <Text style={styles.value}>{placement.batch || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Degree:</Text>
              <Text style={styles.value}>{placement.degree || 'N/A'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>CTC:</Text>
              <Text style={styles.value}>
                {placement.ctc >= 1000000 
                  ? `₹${(placement.ctc / 1000000).toFixed(2)} LPA` 
                  : `₹${(placement.ctc / 100000).toFixed(2)} LPA`}
              </Text>
            </View>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Students</Text>
          {placement?.shortlisted_students?.map((student, index) => (
            <View key={index} style={styles.studentSection}>
              <Text style={styles.studentHeader}>Student {index + 1}</Text>
              <View style={styles.studentInfo}>
                <View style={styles.row}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{student.name || 'N/A'}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Department:</Text>
                  <Text style={styles.value}>{student.department || 'N/A'}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{student.email || 'N/A'}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Gender:</Text>
                  <Text style={styles.value}>{student.gender || 'N/A'}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
  
        <Text style={styles.footer}>
          This document is automatically generated and confidential. Any unauthorized distribution is strictly prohibited.
        </Text>
      </Page>
    </Document>
  );

const PlacementDetailsDownload = ({ placement }) => {
  if (!placement) return null;

  const downloadPDF = async () => {
    const blob = await pdf(<PlacementPDF placement={placement} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${placement.company_name || 'placement'}-details.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="p-3 hover:bg-gray-100 rounded transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
      onClick={downloadPDF}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-gray-800 font-medium mb-1">
            {placement.company_name || 'Company Name Not Available'}
          </div>
          <div className="text-sm text-gray-600">
            {`${placement.placement_type || 'N/A'} - ${placement.degree || 'N/A'}`}
          </div>
          <div className="text-sm text-gray-600">
            {placement.ctc >= 1000000 
              ? `${(placement.ctc / 1000000).toFixed(2)} LPA` 
              : `${(placement.ctc / 100000).toFixed(2)} LPA`}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(placement.createdAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
        <Download 
          className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
        />
      </div>
    </div>
  );
};

const RecentPlacements = ({ placements = [], loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl h-[320px]">
        <div className="px-4 py-3 bg-custom-blue text-white">
          <h2 className="text-lg font-medium">Recent Placements</h2>
        </div>
        <CardSkeleton />
      </div>
    );
  }

  // Handle the case when placements is undefined or null
  if (!Array.isArray(placements)) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl h-[320px]">
        <div className="px-4 py-3 bg-custom-blue text-white">
          <h2 className="text-lg font-medium">Recent Placements</h2>
        </div>
        <div className="p-4 text-center text-gray-500">
          No placement data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl h-[320px]">
      <div className="px-4 py-3 bg-custom-blue text-white">
        <h2 className="text-lg font-medium">Recent Placements</h2>
      </div>
      <div className={`p-4 h-[calc(100%-48px)] ${
        placements.length > 2
          ? "overflow-y-auto scrollbar-thin scrollbar-thumb-[#3b82f6] scrollbar-track-gray-200 scrollbar-thumb-height-10"
          : "overflow-y-hidden"
      }`}>
        {placements.length === 0 ? (
           <div className="min-h-[250px] flex items-center justify-center">
      <div className="p-6 bg-white rounded-lg text-center w-full max-w-md mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-custom-blue animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        {/* Message */}
        <p className="text-sm text-gray-800 font-medium">No Recent Placements</p>
        <p className="text-xs text-gray-500 mt-1">You're all caught up!</p>
      </div>
    </div>
        ) : (
          <div className="space-y-4">
            {placements.map((placement, index) => (
              <PlacementDetailsDownload 
                key={placement._id || index} 
                placement={placement}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPlacements;