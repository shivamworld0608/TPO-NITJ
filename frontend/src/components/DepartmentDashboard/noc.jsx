import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaEye, FaFastBackward, FaFastForward, FaTimes } from 'react-icons/fa';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
import NITJlogo from '../../assets/nitj-logo.png';
import NotoSansDevanagari from '../../assets/fonts/NotoSansDevanagari-Regular.ttf';

const NOCManagement = () => {
  const [nocs, setNocs] = useState([]);
  const [filteredNocs, setFilteredNocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const nocsPerPage = 50;

  // Fetch NOCs with pagination
  useEffect(() => {
    const fetchNOCs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/noc/getond`, {
          params: { page: currentPage, limit: nocsPerPage },
          withCredentials: true,
        });
        setNocs(response.data.nocs);
        setFilteredNocs(response.data.nocs);
        setTotalPages(Math.ceil(response.data.total / nocsPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NOCs:', error);
        showToast('Failed to fetch NOCs. Please try again!', 'error');
        setLoading(false);
      }
    };
    fetchNOCs();
  }, [currentPage]);

  // Handle search filter
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === '') {
      setFilteredNocs(nocs);
    } else {
      const filtered = nocs.filter((noc) =>
        noc.rollNo.toLowerCase().includes(query)
      );
      setFilteredNocs(filtered);
    }
  };

  // Show toast
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle jump to page
  const handleJumpToPage = (e) => {
    const page = parseInt(e.target.value, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // View offer letter
  const handleViewOfferLetter = (offerLetterUrl, nocId) => {
    if (offerLetterUrl) {
      window.open(`${import.meta.env.REACT_APP_BASE_URL}${offerLetterUrl}`, '_blank');
    } else {
      showToast('No offer letter uploaded yet!', 'error');
    }
  };

  // Show contact popup
  const handleShowContact = (noc) => {
    setSelectedContact({
      name: noc.contactPersonName,
      designation: noc.contactPersonDesignation,
      email: noc.contactPersonEmail,
      phone: noc.contactPersonPhone,
    });
    setShowContactPopup(true);
  };

  // Close contact popup
  const handleClosePopup = () => {
    setShowContactPopup(false);
    setSelectedContact(null);
  };

  // Generate and download PDF (unchanged)
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
        const words = paragraph.split(' ');
        let currentLine = '';
        let currentWidth = 0;

        words.forEach((word, index) => {
          const wordWithSpace = word + (index < words.length - 1 ? ' ' : '');
          const wordWidth = font.widthOfTextAtSize(wordWithSpace, fontSize);

          if (currentWidth + wordWidth <= maxWidth) {
            currentLine += wordWithSpace;
            currentWidth += wordWidth;
          } else {
            if (currentLine.trim()) lines.push(currentLine.trim());
            currentLine = wordWithSpace;
            currentWidth = wordWidth;
          }
        });

        if (currentLine.trim()) lines.push(currentLine.trim());
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

      const segments = [];
      let remainingText = text;
      let currentIndex = 0;

      while (remainingText.length > 0) {
        let matchIndex = remainingText.length;
        let matchedPhrase = '';
        let matchedType = '';

        for (const phrase of [...highlightPhrases, ...underlinePhrases]) {
          const index = remainingText.indexOf(phrase);
          if (index !== -1 && index < matchIndex) {
            matchIndex = index;
            matchedPhrase = phrase;
            matchedType = highlightPhrases.includes(phrase) && underlinePhrases.includes(phrase)
              ? 'bold-underline'
              : highlightPhrases.includes(phrase)
              ? 'bold'
              : 'underline';
          }
        }

        if (matchIndex === 0) {
          segments.push({ text: matchedPhrase, type: matchedType, startIndex: currentIndex });
          currentIndex += matchedPhrase.length;
          remainingText = remainingText.slice(matchedPhrase.length);
        } else {
          const endIndex = matchIndex === remainingText.length ? remainingText.length : matchIndex;
          segments.push({ text: remainingText.slice(0, endIndex), type: 'normal', startIndex: currentIndex });
          currentIndex += endIndex;
          remainingText = remainingText.slice(endIndex);
        }
      }

      const lines = [];
      const lineSegments = [];
      let currentLineSegments = [];
      let currentLineWidth = 0;

      for (const segment of segments) {
        const words = segment.text.split(/(\s+)/);
        for (const word of words) {
          if (word === '') continue;
          const isSpace = /^\s+$/.test(word);
          const fontToUse = segment.type.includes('bold') ? boldFont : font;
          const wordWidth = fontToUse.widthOfTextAtSize(word, size);

          if (wrap && !isSpace && currentLineWidth + wordWidth > maxWidth && currentLineSegments.length > 0) {
            lines.push(currentLineSegments);
            currentLineSegments = [];
            currentLineWidth = 0;
          }

          currentLineSegments.push({
            text: word,
            font: fontToUse,
            isUnderline: segment.type.includes('underline'),
            isSpace,
            width: wordWidth,
          });
          currentLineWidth += wordWidth;
        }
      }

      if (currentLineSegments.length > 0) {
        lines.push(currentLineSegments);
      }

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const yPos = overrideY !== undefined ? overrideY : y;
        const totalTextWidth = line.reduce((acc, w) => acc + w.width, 0);
        const spaceCount = line.filter(w => w.isSpace).length;

        const shouldJustify = align === 'justify' && spaceCount > 0 && i !== lines.length - 1;
        const extraSpace = shouldJustify ? (maxWidth - totalTextWidth) / spaceCount : 0;

        let x = overrideX !== undefined ? overrideX : margin;
        if (align === 'center') {
          x = width / 2 - totalTextWidth / 2;
        } else if (align === 'right') {
          x = width - margin - totalTextWidth;
        }

        let currentX = x;
        for (const w of line) {
          page.drawText(w.text, {
            x: currentX,
            y: yPos,
            size,
            font: w.font,
            color,
          });

          if (w.isUnderline) {
            page.drawLine({
              start: { x: currentX, y: yPos - 3 },
              end: { x: currentX + w.width, y: yPos - 3 },
              thickness: 1,
              color,
            });
          }

          currentX += w.width;
          if (shouldJustify && w.isSpace) {
            currentX += extraSpace;
          }
        }

        if (overrideY === undefined) y -= lineHeight;
      }
    };

    const logoWidth = 70;
    const logoHeight = 70;
    page.drawImage(logoImage, {
      x: margin,
      y: height - margin - logoHeight + 7,
      width: logoWidth,
      height: logoHeight,
    });

    const textMaxWidth = width - margin * 3 - logoWidth;
    drawText('Dr. B.R. Ambedkar National Institute of Technology, Jalandhar', {
      size: 13,
      align: 'left',
      font: englishFont,
      boldFont: englishBoldFont,
      highlightPhrases: ['Dr. B.R. Ambedkar', 'National Institute of Technology, Jalandhar'],
      x: margin + logoWidth + 30,
      y: height - margin - 14,
    });
    drawText('(An Institute of National Importance under Ministry of Education, Govt. of India)', {
      size: 10,
      align: 'left',
      maxWidth: textMaxWidth + 40,
      x: margin + logoWidth + 30 + 10,
      y: height - margin - 14 - 18,
    });
    drawText('G T Road, Bye Pass, Jalandhar: 144027 (Punjab) India', {
      size: 10,
      align: 'left',
      maxWidth: textMaxWidth,
      x: margin + logoWidth + 30 + 50,
      y: height - margin - 14 - 18 - 18,
    });

    drawLine(10);
    drawText(`DEPARTMENT OF ${noc.department}`, {
      size: 12,
      align: 'center',
      font: englishFont,
      boldFont: englishBoldFont,
      underlinePhrases: [`DEPARTMENT OF ${noc.department}`],
      highlightPhrases: [`DEPARTMENT OF ${noc.department}`],
    });
    drawLine(2);

    const currentY = y;
    drawText(`Reference No. ${noc.nocId}`, {
      font: englishFont,
      size: 12,
      highlightPhrases: ['Reference No.'],
      underlinePhrases: [],
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
      underlinePhrases: [],
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
      `It is to certify that ${noc.salutation} ${noc.studentName} , with Roll No. ${noc.rollNo}, is currently studying in ${noc.course}, ${noc.year} Year, ${noc.semester} Semester, in the Department of ${noc.department} at Dr. B.R. Ambedkar National Institute of Technology, Jalandhar. The Department of ${noc.department}, NIT Jalandhar has no objection if ${noc.studentName} is allowed to undergo an internship at your esteemed organization from ${new Date(noc.internshipFrom).toLocaleDateString()} to ${new Date(noc.internshipTo).toLocaleDateString()}, for a duration of ${noc.internshipDuration}.`,
      {
        font: englishFont,
        align: 'justify',
        boldFont: englishBoldFont,
        highlightPhrases: [noc.salutation, noc.studentName, noc.rollNo, noc.course, noc.year, noc.semester, noc.department, noc.companyName, new Date(noc.internshipFrom).toLocaleDateString(), new Date(noc.internshipTo).toLocaleDateString(), noc.internshipDuration],
        underlinePhrases: [],
      }
    );
    drawLine();

    drawText(
      `This NOC has been issued upon the student's request and is duly signed and stamped in its original form. It is valid only for the stated period and purpose. Furthermore, this NOC will be considered valid only if the student submits the joining letter to the their department, within one week of receiving an offer based on this NOC. Failure to submit the joining letter will result in non-evaluation of internship/training for credit purposes. The permission is granted on the condition that the student will not seek any relaxation in academic activities due to this internship.`,
      { font: englishFont, align: 'justify' }
    );
    drawLine(2);

    drawText('Best regards,');
    drawLine(6);
    drawText('HEAD OF DEPARTMENT', {
      font: englishFont,
      boldFont: englishBoldFont,
      highlightPhrases: ['HEAD OF DEPARTMENT'],
    });
    drawText(`${noc.department}`, {
      font: englishFont,
      boldFont: englishBoldFont,
      highlightPhrases: [`${noc.department}`],
    });
    drawText('NIT JALANDHAR', {
      font: englishFont,
      boldFont: englishBoldFont,
      highlightPhrases: ['NIT JALANDHAR'],
    });
    drawLine(6);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `NOC_${noc.studentName}_${noc.nocId}.pdf`;
    link.click();
  };

  const renderNOCList = () => {
    const startRange = (currentPage - 1) * nocsPerPage + 1;
    const endRange = Math.min(currentPage * nocsPerPage, nocs.length);
    const totalItems = totalPages * nocsPerPage;

    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex flex-col min-h-[calc(100vh-9rem)]">
        <div className="mb-6 flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center space-x-3 text-gray-900">
              <span>NOC <span className="text-custom-blue">Management</span></span>
            </h2>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search by Roll No..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-blue"></div>
            </div>
          ) : filteredNocs?.length === 0 ? (
            <p className="text-gray-600 italic">No NOCs available.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNocs?.map((noc) => (
                <div
                  key={noc._id}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative"
                >
                  <button
                    onClick={() => handleShowContact(noc)}
                    className="absolute top-3 right-3 text-custom-blue hover:text-custom-blue-dark"
                    title="View Contact Info"
                  >
                    <FaEye size={18} />
                  </button>
                  <p className="text-lg font-semibold text-gray-900">{noc.companyName}</p>
                  <p className="text-xs text-custom-blue bg-custom-blue/10 p-1 rounded-lg inline-block font-semibold mt-1"># {noc.nocId}</p>
                  <p className="text-xs text-gray-600 mt-2">Student: {noc.studentName}</p>
                  <p className="text-xs text-gray-600 mt-1">Email: {noc.respondentEmail}</p>
                  <p className="text-xs text-gray-600 mt-1">
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
                      <span>Download NOC</span>
                    </button>
                    <button
                      onClick={() => handleViewOfferLetter(noc.offerLetter, noc._id)}
                      className="flex items-center space-x-1 text-sm text-custom-blue hover:text-white px-3 py-1 rounded-md border border-custom-blue hover:bg-custom-blue transition duration-300"
                    >
                      <FaEye />
                      <span>View Offer Letter</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showContactPopup && selectedContact && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
              <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative transform transition-all animate-fade-in">
                <button
                  onClick={handleClosePopup}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  title="Close"
                >
                  <FaTimes size={20} />
                </button>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Person Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">Name:</span>
                    <span className="text-gray-600">{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">Designation:</span>
                    <span className="text-gray-600">{selectedContact.designation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-custom-blue hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-custom-blue hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Pagination at the bottom */}
        {!loading && filteredNocs?.length > 0 && (
          <div className="mt-auto border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                {startRange} - {endRange} / {totalItems}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-custom-blue hover:bg-custom-blue/10'
                  }`}
                >
                  <FaFastBackward />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-custom-blue hover:bg-blue-100'
                  }`}
                >
                  ◄
                </button>
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? 'border border-custom-blue text-custom-blue'
                        : 'text-custom-blue hover:bg-custom-blue/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-custom-blue hover:bg-blue-100'
                  }`}
                >
                  ►
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded-md ${
                    currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-custom-blue hover:bg-blue-100'
                  }`}
                >
                  <FaFastForward />
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Jump to</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={handleJumpToPage}
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      {toast.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg animate-fade-in-out z-[1000] ${
            toast.type === 'error'
              ? 'bg-white border border-red-500 text-red-500'
              : toast.type === 'success'
              ? 'bg-white border border-green-500 text-green-500'
              : 'bg-white border border-custom-blue text-custom-blue'
          }`}
        >
          {toast.message}
        </div>
      )}
      {renderNOCList()}
    </div>
  );
};

export default NOCManagement;