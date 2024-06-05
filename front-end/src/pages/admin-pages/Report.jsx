import React, { useState } from "react";
import Layout from "layouts/AdminLayouts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BusinessReport from "components/admin-components/BusinessReport";
import AttendanceReport from "components/admin-components/AttendaceReport";

const Report = () => {
  const [reportType, setReportType] = useState("");
  const [duration, setDuration] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  const [imgData, setImgData] = useState(null); // State to store the image data

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic
    console.log(`Report Type: ${reportType}, Duration: ${duration}`);

    // If report type is "business" or "attendance", trigger download of respective report
    if (reportType === "business" || reportType === "attendance") {
      setShowPDF(true); // Set showPDF state to true to render the report section
      setTimeout(() => {
        captureImage(); // Capture image after a brief delay to ensure report section is rendered
      }, 500);
    }
  };

  const captureImage = () => {
    // Set fixed width and height for the canvas
    const canvasWidth = 800; // Adjust as needed
    const canvasHeight = 600; // Adjust as needed

    // Get the content of the report section
    const reportSection = document.getElementById("report-section");

    // Use html2canvas to capture the content as an image with fixed dimensions
    html2canvas(reportSection, { width: canvasWidth, height: canvasHeight })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        setImgData(imgData); // Store the image data in state
        generatePDF(imgData); // Generate PDF with the captured image data
      })
      .catch((error) => {
        console.error("Error capturing content as image:", error);
      });
  };
  const generatePDF = () => {
    // Initialize jsPDF
    const pdf = new jsPDF("p", "mm", "a4");

    // Get the content of the report section
    const reportSection = document.getElementById("report-section");

    // Use html2canvas to capture the content as an image with full dimensions
    html2canvas(reportSection)
      .then((canvas) => {
        // Calculate width and height of the content
        const contentWidth = canvas.width / 4; // Divide by 4 to convert pixels to mm
        const contentHeight = canvas.height / 4; // Divide by 4 to convert pixels to mm

        // Set PDF dimensions based on content size
        pdf.internal.pageSize.setWidth(contentWidth);
        pdf.internal.pageSize.setHeight(contentHeight);

        // Calculate image width and height based on A4 dimensions (adjust for margins if needed)
        const imageWidth = pdf.internal.pageSize.getWidth() - 20; // Adjust for margins (20mm each side)
        const imageHeight = (imageWidth / contentWidth) * contentHeight;

        // Convert canvas to image data URL
        const imgData = canvas.toDataURL("image/png");

        // Add image to PDF
        pdf.addImage(imgData, "PNG", 10, 10, imageWidth, imageHeight);

        // Save PDF
        pdf.save("report.pdf");
        // setShowPDF(false);
      })
      .catch((error) => {
        console.error("Error capturing content as image:", error);
      });
  };

  // Render the appropriate report component based on the selected report type
  const renderReportComponent = () => {
    switch (reportType) {
      case "business":
        return <BusinessReport duration={duration} />;
      case "attendance":
        return <AttendanceReport duration={duration} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Generate Report</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="reportType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="shadow appearance-none border rounded w-[20%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Report Type</option>
              <option value="business">Business Report</option>
              <option value="attendance">Attendance Report</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Duration
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="sevenDays"
                name="duration"
                value="week"
                checked={duration === "week"}
                onChange={(e) => setDuration(e.target.value)}
                className="mr-2 leading-tight"
              />
              <label htmlFor="sevenDays" className="text-gray-700">
                7 Days
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="oneMonth"
                name="duration"
                value="month"
                checked={duration === "month"}
                onChange={(e) => setDuration(e.target.value)}
                className="mr-2 leading-tight"
              />
              <label htmlFor="oneMonth" className="text-gray-700">
                One Month
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="today"
                name="duration"
                value="today"
                checked={duration === "today"}
                onChange={(e) => setDuration(e.target.value)}
                className="mr-2 leading-tight"
              />
              <label htmlFor="today" className="text-gray-700">
                Today
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate Report
            </button>
          </div>
        </form>
        {/* Report section */}
        {showPDF ? (
          <div
            id="report-section"
            className="flex w-fit items-center justify-center p-20"
          >
            {/* Render the selected report component */}
            {renderReportComponent()}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Report;
