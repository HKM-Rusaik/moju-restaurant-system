import Customer from './models/customer'; // Assuming the path to the Customer model is correct

const authService = {
  authenticate: async (email, password) => {
    try {
      // Find the customer by email
      const customer = await Customer.findOne({ where: { email } });

      // If customer not found or password doesn't match, return null
      if (!customer || customer.passwordHash !== password) {
        return null;
      }

      // If email and password match, return the customer data (excluding password hash)
      return {
        customerId: customer.customerId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        streetName: customer.streetName,
        cityName: customer.cityName,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
      };
    } catch (error) {
      console.error('Error authenticating customer:', error);
      throw new Error('Internal server error');
    }
  }
};

export default authService;
