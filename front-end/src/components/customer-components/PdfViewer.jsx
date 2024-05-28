import BillPDF from "./BillPdf";
import { PDFViewer } from "@react-pdf/renderer";
const PDFViewerComponent = () => (
  <PDFViewer width="100%" height="800px">
    <BillPDF />
  </PDFViewer>
);

export default PDFViewerComponent;
