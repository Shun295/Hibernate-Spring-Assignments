package com.app.dao;

import com.app.exception.CustomerNotFoundException;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Customer;

import java.util.List;

public interface CustomerDao {
    void insertCustomer(Customer customer);
    List<Customer> getAllCustomer();
    Customer getCustomerById(int id);
    void updateCustomerById(int id);
    void deleteCustomerById(int id) throws CustomerNotFoundException;
}
