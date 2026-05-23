package com.app.dao;

import com.app.model.Customer;

import java.util.List;

public interface CustomerDao {
    List<Customer> findAll(String customerUsername);

    Customer getCustomerByUsername(String customerUsername);
    void save(Customer customer, String username);
}
