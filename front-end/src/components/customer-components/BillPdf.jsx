import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
});

const BillPDF = ({
  order,
  customer,
  cartItems,
  itemTotal,
  deliveryFee,
  discountAmount,
  grandTotal,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Invoice</Text>
        <Text>Date: {order.date}</Text>
        <Text>Order ID: {order.id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Customer Information</Text>
        <Text>Name: {customer.firstName}</Text>
        <Text>Email: {customer.email}</Text>
        <Text>Mobile No: {customer.phoneNumber}</Text>
        <Text>Order Type: {order.orderType}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Items</Text>
        <View>
          <Text>Item Quantity Price</Text>
          {cartItems.map((cartItem) => (
            <Text key={cartItem.itemId}>
              {cartItem.name} {cartItem.quantity} {cartItem.price}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Totals</Text>
        <Text>Items Total:{itemTotal}</Text>
        <Text>Delivery Fee: {deliveryFee}</Text>
        <Text> Membership Discount: {discountAmount}</Text>
        <Text style={{ color: "green" }}>Grand Total: {grandTotal}</Text>
      </View>
    </Page>
  </Document>
);

export default BillPDF;
