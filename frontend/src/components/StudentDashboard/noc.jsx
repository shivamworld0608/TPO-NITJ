import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
import { FaPlus, FaEye, FaDownload,FaUpload } from 'react-icons/fa';
import NITJlogo from "../../assets/nitj-logo.png"; 
import NotoSansDevanagari from '../../assets/fonts/NotoSansDevanagari-Regular.ttf';

const NOC = () => {
  const { userData } = useSelector((state) => state.auth);
  const [nocs, setNocs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [selectedNocId, setSelectedNocId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    dateSubmitted: '',
    respondentEmail: '',
    salutation: userData?.gender === 'female' ? 'Ms.' : 'Mr.',
    studentName: userData?.name || '',
    rollNo: userData?.rollno || '',
    course: userData?.course || '',
    batch: userData?.batch || '',
    year: '',
    semester: '',
    department: userData?.department || '',
    internshipFrom: '',
    internshipTo: '',
    internshipDuration: '',
    contactPersonName: '',
    contactPersonDesignation: '',
    contactPersonPhone: '',
    contactPersonEmail: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Reset form data
  const resetFormData = () => {
    setFormData({
      companyName: '',
      dateSubmitted: '',
      respondentEmail: '',
      salutation: userData?.gender === 'female' ? 'Ms.' : 'Mr.',
      studentName: userData?.name || '',
      rollNo: userData?.rollno || '',
      course: userData?.course || '',
      batch: userData?.batch || '',
      year: '',
      semester: '',
      department: userData?.department || '',
      internshipFrom: '',
      internshipTo: '',
      internshipDuration: '',
      contactPersonName: '',
      contactPersonDesignation: '',
      contactPersonPhone: '',
      contactPersonEmail: '',
    });
  };

  // Fetch all NOCs
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.REACT_APP_BASE_URL}/noc`, { withCredentials: true })
      .then(response => {
        setNocs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching NOCs:', error);
        setLoading(false);
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  // Show toast
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
  };

  // Submit or update NOC
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Yo! Please fill out all the fields before submitting! 😎', 'error');
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      if (editingId) {
        await axios.put(`${import.meta.env.REACT_APP_BASE_URL}/noc/${editingId}`, formDataToSend, { 
          headers: { 'Content-Type': 'application/json' }, 
          withCredentials: true 
        });
        setNocs(nocs.map(noc => noc._id === editingId ? { ...noc, ...formData } : noc));
        setEditingId(null);
      } else {
        const response = await axios.post (`${import.meta.env.REACT_APP_BASE_URL}/noc`, formDataToSend, { 
          headers: { 'Content-Type': 'application/json' }, 
          withCredentials: true 
        });
        setNocs([...nocs, response.data]);
      }
      resetFormData();
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting NOC:', error);
      showToast('Oops! Something went wrong. Try again later! 😅', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle offer letter upload
  const handleOfferLetterUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      showToast('Please select a valid PDF file!', 'error');
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append('offerLetter', file);
 
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/noc/upload-offer-letter/${selectedNocId}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percent);
      },
      });
      setNocs(nocs.map(n => n._id === selectedNocId ? { ...n, offerLetter: response.data.offerLetter } : n));
      setIsUploading(false);
      setShowUploadPopup(false);
      showToast('Offer letter uploaded successfully!', 'success');
    } catch (error) {
      console.error('Error uploading offer letter:', error);
      showToast('Failed to upload offer letter. Try again!', 'error');
    }
  };

  // View offer letter
  const handleViewOfferLetter = (offerLetterUrl, nocId) => {
    if (offerLetterUrl) {
        console.log("offerLetterUrl", offerLetterUrl);
      window.open(`${import.meta.env.REACT_APP_BASE_URL}${offerLetterUrl}`, '_blank');
    } else {
      showToast('No offer letter uploaded yet!', 'error');
    }
  };

  // Generate and download PDF
  const generatePDF = async (noc) => {
    const fontBuffer = await fetch(NotoSansDevanagari).then((res) => res.arrayBuffer());
    const logoBuffer = await fetch(NITJlogo).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
  
    const englishFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const englishBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const unicodeFont = await pdfDoc.embedFont(fontBuffer);
    const logoImage = await pdfDoc.embedPng(logoBuffer);
    const fontSize = 12;
    const margin = 50;
    let y = height - margin;
  
    const drawLine = (space = 1) => {
      y -= space * 10;
    };
  
    const wrapText = (text, font, fontSize, maxWidth) => {
      const lines = [];
      const paragraphs = text.split('\n');
      paragraphs.forEach((paragraph) => {
        if (font.widthOfTextAtSize(paragraph, fontSize) <= maxWidth) {
          lines.push(paragraph);
        } else {
          let currentLine = '';
          let currentWidth = 0;
          for (let char of paragraph) {
            const charWidth = font.widthOfTextAtSize(char, fontSize);
            if (currentWidth + charWidth <= maxWidth) {
              currentLine += char;
              currentWidth += charWidth;
            } else {
              lines.push(currentLine);
              currentLine = char;
              currentWidth = charWidth;
            }
          }
          if (currentLine) lines.push(currentLine);
        }
      });
      return lines;
    };
  
    const drawText = (
      text,
      {
        font = englishFont,
        boldFont = englishBoldFont,
        size = fontSize,
        align = 'left',
        lineHeight = 18,
        color = rgb(0, 0, 0),
        wrap = true,
        highlightPhrases = [],
        underlinePhrases = [],
        maxWidth = width - margin * 2,
        y: overrideY,
        x: overrideX,
      } = {}
    ) => {
      if (!text || typeof text !== 'string') return;
      const lines = wrap && font !== unicodeFont ? wrapText(text, font, size, maxWidth) : [text];
  
      lines.forEach((line, lineIndex) => {
        let x = overrideX !== undefined ? overrideX : margin;
        const totalTextWidth = font.widthOfTextAtSize(line, size);
  
        // Calculate alignment
        if (align === 'center') {
          x = width / 2 - totalTextWidth / 2;
        } else if (align === 'right') {
          x = width - margin - totalTextWidth;
        }
  
        // Handle justification
        if (align === 'justify' && lineIndex < lines.length - 1 && line.trim().length > 0) {
          const words = line.split(/\s+/).filter(word => word.length > 0);
          if (words.length > 1) {
            // Calculate total width of words and spaces
            const totalWordsWidth = words.reduce((sum, word) => {
              const wordFont = highlightPhrases.some(phrase => word.includes(phrase)) ? boldFont : font;
              return sum + wordFont.widthOfTextAtSize(word, size);
            }, 0);
            const totalSpacesWidth = maxWidth - totalWordsWidth;
            const spaceWidth = words.length > 1 ? totalSpacesWidth / (words.length - 1) : 0;
  
            let currentX = x;
            words.forEach((word, wordIndex) => {
              let wordFont = font;
              let isHighlighted = false;
              let isUnderlined = false;
  
              // Check for highlighted or underlined phrases
              for (const phrase of highlightPhrases.concat(underlinePhrases)) {
                if (word.includes(phrase)) {
                  wordFont = highlightPhrases.includes(phrase) ? boldFont : font;
                  isHighlighted = highlightPhrases.includes(phrase);
                  isUnderlined = underlinePhrases.includes(phrase);
                  break;
                }
              }
  
              const wordWidth = wordFont.widthOfTextAtSize(word, size);
              page.drawText(word, {
                x: currentX,
                y: overrideY !== undefined ? overrideY : y,
                size,
                font: wordFont,
                color,
              });
  
              if (isUnderlined) {
                page.drawLine({
                  start: { x: currentX, y: (overrideY !== undefined ? overrideY : y) - 2 },
                  end: { x: currentX + wordWidth, y: (overrideY !== undefined ? overrideY : y) - 2 },
                  thickness: 1,
                  color,
                });
              }
  
              currentX += wordWidth;
              if (wordIndex < words.length - 1) {
                currentX += spaceWidth;
              }
            });
  
            if (overrideY === undefined) y -= lineHeight;
            return;
          }
        }
  
        // Handle non-justified text or text with highlights
        let remainingLine = line;
        let currX = x;
        while (remainingLine.length > 0) {
          let matchedPhrase = null;
          let matchedLength = 0;
          let isHighlighted = false;
          let isUnderlined = false;
  
          // Check for matching phrases at the start of remainingLine
          for (const phrase of highlightPhrases.concat(underlinePhrases)) {
            if (remainingLine.startsWith(phrase) && phrase?.length > matchedLength) {
              matchedPhrase = phrase;
              matchedLength = phrase.length;
              isHighlighted = highlightPhrases.includes(phrase);
              isUnderlined = underlinePhrases.includes(phrase);
              break; // Found the longest matching phrase at this position
            }
          }
  
          if (matchedPhrase) {
            // Draw highlighted/underlined phrase
            const wordFont = isHighlighted ? boldFont : font;
            const wordWidth = wordFont.widthOfTextAtSize(matchedPhrase, size);
  
            page.drawText(matchedPhrase, {
              x: currX,
              y: overrideY !== undefined ? overrideY : y,
              size,
              font: wordFont,
              color,
            });
  
            if (isUnderlined) {
              page.drawLine({
                start: { x: currX, y: (overrideY !== undefined ? overrideY : y) - 2 },
                end: { x: currX + wordWidth, y: (overrideY !== undefined ? overrideY : y) - 2 },
                thickness: 1,
                color,
              });
            }
  
            currX += wordWidth;
            remainingLine = remainingLine.slice(matchedPhrase.length);
  
            // Add space if there's more text
            if (remainingLine.length > 0 && remainingLine[0] === ' ') {
              const spaceWidth = font.widthOfTextAtSize(' ', size);
              currX += spaceWidth;
              remainingLine = remainingLine.slice(1);
            }
          } else {
            // Draw normal text
            const nextSpace = remainingLine.indexOf(' ');
            const word = nextSpace === -1 ? remainingLine : remainingLine.slice(0, nextSpace);
            const displayWord = nextSpace === -1 ? word : word + ' ';
            const wordWidth = font.widthOfTextAtSize(displayWord, size);
  
            page.drawText(displayWord, {
              x: currX,
              y: overrideY !== undefined ? overrideY : y,
              size,
              font,
              color,
            });
  
            currX += wordWidth;
            remainingLine = nextSpace === -1 ? '' : remainingLine.slice(nextSpace + 1);
          }
        }
  
        if (overrideY === undefined) y -= lineHeight;
      });
    };
  
    const logoWidth = 70;
    const logoHeight = 70;
    page.drawImage(logoImage, {
      x: margin,
      y: height - margin - logoHeight+5,
      width: logoWidth,
      height: logoHeight,
    });
  
    const textMaxWidth = width - margin * 3 - logoWidth;
    drawText('Dr B R Ambedkar National Institute of Technology, Jalandhar', {
      size: 13,
      align: 'left',
      font: englishFont,
      boldFont: englishBoldFont,
      highlightPhrases: ['Dr B R Ambedkar', 'National Institute of Technology, Jalandhar'],
      maxWidth: textMaxWidth,
      x: margin + logoWidth + 30,
      y: height - margin - 14,
    });
    drawText('(An Institute of National Importance under Ministry of Education, Govt. of India)', {
      size: 10,
      align: 'left',
      maxWidth: textMaxWidth + 40,
      x: margin + logoWidth + 30+10,
      y: height - margin - 14 -18,
    });
    drawText('G T Road, Bye Pass, Jalandhar: 144027 (Punjab) India', {
      size: 10,
      align: 'left',
      maxWidth: textMaxWidth,
      x: margin + logoWidth + 30+50,
      y: height - margin - 14 - 18 - 18,
    });
  
    drawLine(10);
    drawText('Training & Placement Centre', {
      size: 12,
      align: 'center',
      font: englishFont,
      boldFont: englishBoldFont,
      underlinePhrases: ['Training & Placement Centre'],
      highlightPhrases: ['Training & Placement Centre'],
    });
    drawLine(2);
  
    const currentY = y;
    drawText(`Reference No. ${noc.nocId}`, {
      font: englishFont,
      size: 12,
      highlightPhrases: ['Reference No.'],
      underlinePhrases: [noc.nocId],
      y: currentY,
    });
    drawText(`Date: ${new Date(noc.dateSubmitted).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}`, {
      font: englishFont,
      size: 12,
      highlightPhrases: ['Date:'],
      align: 'right',
      y: currentY,
    });
    y = currentY;
    drawLine(3);
  
    drawText(`Subject: No Objection Certificate for Undergoing Internship at ${noc.companyName}`, {
      font: englishFont,
      size: 12,
      boldFont: englishBoldFont,
      highlightPhrases: [noc.companyName, 'Subject:'],
      underlinePhrases: [noc.companyName],
    });
    drawLine();
  
    drawText('TO WHOMSOEVER, IT MAY CONCERN', {
      font: englishFont,
      align: 'center',
      size: 12,
      boldFont: englishBoldFont,
      highlightPhrases: ['TO WHOMSOEVER, IT MAY CONCERN'],
    });
    drawLine();
  
    drawText(
      `It is to certify that ${noc.salutation} ${noc.studentName}, with Roll No. ${noc.rollNo}, is currently studying in ${noc.course}, ${noc.year} Year, ${noc.semester} Semester, in the Department of ${noc.department} at Dr. B.R. Ambedkar National Institute of Technology (NIT) Jalandhar. The Centre for Training and Placement (CTP), NIT Jalandhar has no objection if ${noc.studentName} is allowed to undergo an internship at your esteemed organization from ${new Date(noc.internshipFrom).toLocaleDateString()} to ${new Date(noc.internshipTo).toLocaleDateString()}, for a duration of ${noc.internshipDuration}.`,
      {
        font: englishFont,
        align: 'justify',
        boldFont: englishBoldFont,
        highlightPhrases: [noc.salutation, noc.studentName, noc.rollNo, noc.course, noc.year, noc.semester, noc.companyName, new Date(noc.internshipFrom).toLocaleDateString(), new Date(noc.internshipTo).toLocaleDateString(), noc.internshipDuration, 'Dr. B.R. Ambedkar National Institute of Technology (NIT) Jalandhar'],
        underlinePhrases: [],
      }
    );
    drawLine();
  
    drawText(
      `This NOC has been issued upon the student's request and is duly signed and stamped in its original form. It is valid only for the stated period and purpose. Furthermore, this NOC will be considered valid only if the student or an official from the company/industry/organization submits the student's joining letter to the CTP, NIT Jalandhar, within one week of receiving an offer based on this NOC. Failure to submit the joining letter will result in non-evaluation of internship/training for credit purposes. The permission is granted on the condition that the student will not seek any relaxation in academic activities due to this internship.`,
      { font: englishFont, align: 'justify' }
    );
    drawLine(2);
  
    drawText('Best regards,');
    drawLine(6);
    drawText(`Head\nDepartment of ${noc.department}`, {
      font: englishFont,
      boldFont: englishBoldFont,
      highlightPhrases: ['Head', 'Department', 'of', noc.department],
    });
    drawLine(6);
  
    // Fixed signature section with proper alignment
    const signatureStartY = y;
    drawText('Head, Internship', {
      font: englishBoldFont,
      align: 'right',
      y: signatureStartY,
    });
    drawText('Centre for Training and Placement', {
      font: englishBoldFont,
      align: 'right',
      y: signatureStartY - 18,
    });
    drawText('Dr. B.R. Ambedkar National Institute of Technology Jalandhar', {
      font: englishBoldFont,
      align: 'right',
      y: signatureStartY - 36,
    });
    y = signatureStartY - 54;
  
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `NOC_${noc.studentName}_${noc.nocId}.pdf`;
    link.click();
  };

  const renderNOCList = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold flex items-center space-x-3 text-gray-900">
          <span>No Objection <span className="text-custom-blue">Certificate</span></span>
        </h2>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <button
            onClick={() => {
              setShowForm(true);
              resetFormData();
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-custom-blue text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-300"
          >
            <FaPlus />
            <span>Apply for NOC</span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : nocs.length === 0 ? (
        <p className="text-gray-600 italic">No NOCs available.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nocs.map((noc) => (
            <div
                          key={noc._id}
                          className="p-6 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                        >
                          <p className="text-lg font-semibold text-gray-900">{noc.companyName}</p>
                          <p className="bg-custom-blue/10 rounded-lg p-1 text-custom-blue text-xs font-semibold inline-block mt-2"># {noc.nocId}</p>
                          <p className="text-xs text-gray-600 mt-2">
                            Submitted: {new Date(noc.dateSubmitted).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            <button
                              onClick={() => generatePDF(noc)}
                             className="flex items-center space-x-1 text-sm text-custom-blue hover:text-white px-3 py-1 rounded-md border border-custom-blue hover:bg-custom-blue transition duration-300"
                            >
                             <FaDownload />
                              <span>NOC</span>
                            </button>
                            <button
                              onClick={() => handleViewOfferLetter(noc.offerLetter, noc._id)}
                              className="flex items-center space-x-1 text-sm text-custom-blue hover:text-white px-3 py-1 rounded-md border border-custom-blue hover:bg-custom-blue transition duration-300"
                            >
                              <FaEye />
                              <span>Offer Letter</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedNocId(noc._id);
                                setShowUploadPopup(true);
                              }}
                            className="flex items-center space-x-1 text-sm text-custom-blue hover:text-white px-3 py-1 rounded-md border border-custom-blue hover:bg-custom-blue transition duration-300"
                            >
                              <FaUpload />
                              <span>Offer Letter</span>
                            </button>
                          </div>
                        </div>
                      ))}
                 </div>
                )}
           </div>
           );

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {toast.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg animate-fade-in-out z-[1000] ${
          toast.type === 'error' ? 'bg-white border border-red-500 text-red-500' : 
          toast.type === 'success' ? 'bg-white border border-green-500 text-green-500' : 
          'bg-white border border-blue-500 text-blue-500'
        }`}>
          {toast.message}
        </div>
      )}
      {showUploadPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-700">Upload Offer Letter</h3>
              <button
                onClick={() => setShowUploadPopup(false)}
                className="text-gray-600 hover:text-gray-800 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col items-center">
              <label className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition duration-300">
                <span className="text-gray-600">Choose a PDF file</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleOfferLetterUpload}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-sm text-gray-500">Only PDF files are allowed</p>
            </div>
          </div>
        </div>
      )}
      {!showForm ? (
        renderNOCList()
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 border border-gray-200 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Apply for <span className='text-custom-blue'>NOC</span></h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                resetFormData();
              }}
              className="text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Salutation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Roll No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Course <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${formData.year === '' ? 'text-gray-600' : 'text-black'}`}
                  required
                >
                  <option value="" disabled hidden>Select Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Semester <span className="text-red-500">*</span>
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${formData.semester === '' ? 'text-gray-600' : 'text-black'}`}
                  required
                >
                  <option value="" disabled hidden>Select Semester</option>
                  <option value="2nd">2nd</option>
                  <option value="4th">4th</option>
                  <option value="6th">6th</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Date Submitted <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateSubmitted"
                  value={formData.dateSubmitted}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Respondent Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="respondentEmail"
                  value={formData.respondentEmail}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Internship From <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="internshipFrom"
                  value={formData.internshipFrom}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Internship To <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="internshipTo"
                  value={formData.internshipTo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Internship Duration <span className="text-red-500">*</span>
                </label>
                <select
                  name="internshipDuration"
                  value={formData.internshipDuration}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${formData.internshipDuration === '' ? 'text-gray-600' : 'text-black'}`}
                  required
                >
                  <option value="" disabled hidden>Specify internship duration</option>
                  <option value="more than 30 days">More than 30 days</option>
                  <option value="more than 30 days and less than 45 days">30-45 days</option>
                  <option value="more than 45 days less than 60 days">45-60 days</option>
                  <option value="more than 60 days">More than 60 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Contact Person Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Contact Person Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPersonDesignation"
                  value={formData.contactPersonDesignation}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Contact Person Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPersonPhone"
                  value={formData.contactPersonPhone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Contact Person Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactPersonEmail"
                  value={formData.contactPersonEmail}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-md transition duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-custom-blue text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : editingId ? 'Update NOC' : 'Apply for NOC'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NOC;