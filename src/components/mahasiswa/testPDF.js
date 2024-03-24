import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

const TestPDF = () => {
  const pdf =
    "https://storage.googleapis.com/si-repository-feb/oLN9O6Ksk3eG8qGtDFlT.pdf";
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="svg"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} />
        ))}
      </Document>
    </div>
  );
};

export default TestPDF;
