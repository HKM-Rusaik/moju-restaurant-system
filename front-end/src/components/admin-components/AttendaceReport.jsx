// src/components/AttendanceReportPDF.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const AttendanceReport = ({ duration }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Attendance Report</Text>
        <Text style={styles.text}>Duration: {duration}</Text>
        {/* Add more attendance report details here */}
      </View>
    </Page>
  </Document>
);

export default AttendanceReport;
