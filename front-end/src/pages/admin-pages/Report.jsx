import React, { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Layout from "layouts/AdminLayouts";
import BusinessReportPDF from "components/admin-components/BusinessReport";
import AttendanceReportPDF from "components/admin-components/AttendaceReport";

const Report = () => {
  const [reportType, setReportType] = useState("");
  const [duration, setDuration] = useState("");
  const [showPDF, setShowPDF] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(`Report Type: ${reportType}, Duration: ${duration}`);
    // You can add your logic here to generate the report based on the selected values
    setShowPDF(true);
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
                value="7days"
                checked={duration === "7days"}
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
        {showPDF && (
          <PDFViewer width="100%" height="600">
            {reportType === "business" ? (
              <BusinessReportPDF duration={duration} />
            ) : (
              <AttendanceReportPDF duration={duration} />
            )}
          </PDFViewer>
        )}
      </div>
    </Layout>
  );
};

export default Report;
