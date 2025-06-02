import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaEye,FaFastBackward,FaFastForward } from 'react-icons/fa';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
import NITJlogo from "../../assets/nitj-logo.png";
import NotoSansDevanagari from '../../assets/fonts/NotoSansDevanagari-Regular.ttf';

const NOCManagement = () => {
  const [nocs, setNocs] = useState([]);
  const [filteredNocs, setFilteredNocs] = useState([]); // For filtered results
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [searchQuery, setSearchQuery] = useState(''); // For search filter
  const nocsPerPage = 50;

  // Fetch NOCs with pagination
  useEffect(() => {
    const fetchNOCs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/noc/getonp`, {
          params: { page: currentPage, limit: nocsPerPage },
          withCredentials: true,
        });
        setNocs(response.data.nocs);
        setFilteredNocs(response.data.nocs); // Initialize filteredNocs
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
      setFilteredNocs(nocs); // Reset to original list if query is empty
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
  const renderNOCList = () => {
    // Calculate the range for the current page
    const startRange = (currentPage - 1) * nocsPerPage + 1;
    const endRange = Math.min(currentPage * nocsPerPage, nocs.length);
    const totalItems = totalPages * nocsPerPage;

    // Generate page numbers to display (e.g., show 5 pages at a time)
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
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
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
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-blue"></div>
          </div>
        ) : filteredNocs?.length === 0 ? (
          <p className="text-gray-600 italic">No NOCs available.</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNocs?.map((noc) => (
                <div
                  key={noc._id}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                >
                  <p className="text-lg font-semibold text-gray-900">{noc.companyName}</p>
                  <p className="text-xs text-custom-blue bg-custom-blue/10 p-1 rounded-lg inline-block font-semibold mt-1"># {noc.nocId}</p>
                  <p className="text-xs text-gray-600 mt-2">Student: {noc.studentName}</p>
                  <p className="text-xs text-gray-600 mt-1">Roll No: {noc.rollNo}</p>
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
            <div className="flex items-center justify-between mt-6 ">
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
          </>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
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