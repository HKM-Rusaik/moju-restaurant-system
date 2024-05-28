import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontSize: 12,
    backgroundColor: "#f0f0f0",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
    color: "#666",
  },
  itemHeader: {
    fontWeight: "bold",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#19FF84",
    padding: 5,
    color: "#000000",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    borderBottomStyle: "solid",
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: "#f9f9f9",
    padding: 5,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: 10,
  },
});

// Helper function to format the current date
const getCurrentFormattedDate = () => {
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const BillPDF = ({
  order,
  customer,
  cartItems,
  itemTotal,
  deliveryFee,
  discountAmount,
  grandTotal,
}) => {
  const formattedDate = getCurrentFormattedDate();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Invoice</Text>
          <Text style={styles.text}>Date: {formattedDate}</Text>
          <Text style={styles.text}>Order ID: {order.orderId}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Customer Information</Text>
          <Text style={styles.text}>Name: {customer.firstName}</Text>
          <Text style={styles.text}>Email: {customer.email}</Text>
          <Text style={styles.text}>Mobile No: {customer.phoneNumber}</Text>
          <Text style={styles.text}>Order Type: {order.orderType}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Items</Text>
          <View style={styles.itemHeader}>
            <Text>Item</Text>
            <Text>Quantity</Text>
            <Text>Price</Text>
          </View>
          {cartItems.map((cartItem) => (
            <View key={cartItem.itemId} style={styles.itemRow}>
              <Text style={styles.text}>{cartItem.name}</Text>
              <Text style={styles.text}>{cartItem.quantity}</Text>
              <Text style={styles.text}>{cartItem.price}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Totals</Text>
          <View style={styles.totalRow}>
            <Text>Items Total:</Text>
            <Text>{itemTotal}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Delivery Fee:</Text>
            <Text>{deliveryFee}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Membership Discount:</Text>
            <Text>{discountAmount}</Text>
          </View>
          <View style={[styles.totalRow, { color: "green" }]}>
            <Text>Grand Total:</Text>
            <Text>{grandTotal}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BillPDF;

// import React from "react";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     padding: 20,
//     fontSize: 12,
//     backgroundColor: "#f0f0f0",
//   },
//   section: {
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   text: {
//     fontSize: 12,
//     marginBottom: 2,
//     color: "#666",
//   },
//   itemHeader: {
//     fontWeight: "bold",
//     marginBottom: 5,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#19FF84",
//     padding: 5,
//     color: "#000000",
//   },
//   itemRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderBottomWidth: 1,
//     borderBottomColor: "#cccccc",
//     borderBottomStyle: "solid",
//     paddingBottom: 5,
//     marginBottom: 5,
//     backgroundColor: "#f9f9f9",
//     padding: 5,
//   },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     fontWeight: "bold",
//     marginTop: 10,
//   },
// });

// // Dummy data
// const dummyOrder = {
//   orderId: "123456",
//   orderType: "Online",
// };

// const dummyCustomer = {
//   firstName: "John Doe",
//   email: "john@example.com",
//   phoneNumber: "+1234567890",
// };

// const dummyCartItems = [
//   { itemId: 1, name: "Item 1", quantity: 2, price: 10 },
//   { itemId: 2, name: "Item 2", quantity: 1, price: 20 },
// ];

// const dummyItemTotal = 40;
// const dummyDeliveryFee = 5;
// const dummyDiscountAmount = 0;
// const dummyGrandTotal = dummyItemTotal + dummyDeliveryFee - dummyDiscountAmount;

// const BillPDF = () => {
//   // Get current date
//   const getCurrentFormattedDate = () => {
//     const date = new Date();
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return date.toLocaleDateString("en-US", options);
//   };

//   const formattedDate = getCurrentFormattedDate();

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text style={styles.header}>Invoice</Text>
//           <Text style={styles.text}>Date: {formattedDate}</Text>
//           <Text style={styles.text}>Order ID: {dummyOrder.orderId}</Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.header}>Customer Information</Text>
//           <Text style={styles.text}>Name: {dummyCustomer.firstName}</Text>
//           <Text style={styles.text}>Email: {dummyCustomer.email}</Text>
//           <Text style={styles.text}>
//             Mobile No: {dummyCustomer.phoneNumber}
//           </Text>
//           <Text style={styles.text}>Order Type: {dummyOrder.orderType}</Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.header}>Items</Text>
//           <View style={styles.itemHeader}>
//             <Text>Item</Text>
//             <Text>Quantity</Text>
//             <Text>Price</Text>
//           </View>
//           {dummyCartItems.map((cartItem) => (
//             <View key={cartItem.itemId} style={styles.itemRow}>
//               <Text style={styles.text}>{cartItem.name}</Text>
//               <Text style={styles.text}>{cartItem.quantity}</Text>
//               <Text style={styles.text}>{cartItem.price}</Text>
//             </View>
//           ))}
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.header}>Totals</Text>
//           <View style={styles.totalRow}>
//             <Text>Items Total:</Text>
//             <Text>{dummyItemTotal}</Text>
//           </View>
//           <View style={styles.totalRow}>
//             <Text>Delivery Fee:</Text>
//             <Text>{dummyDeliveryFee}</Text>
//           </View>
//           <View style={styles.totalRow}>
//             <Text>Membership Discount:</Text>
//             <Text>{dummyDiscountAmount}</Text>
//           </View>
//           <View style={[styles.totalRow, { color: "green" }]}>
//             <Text>Grand Total:</Text>
//             <Text>{dummyGrandTotal}</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default BillPDF;
