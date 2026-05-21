package com.service;

import com.exception.CustomerNotFoundException;
import com.exception.ResourceNotFoundException;
import com.model.Customer;
import com.model.User;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class CustomerService {
    private final Session session;

    public CustomerService(Session session) {
        this.session=session;
    }

   /* public void insert(Customer customer) {
        Transaction tx=session.beginTransaction();
        session.persist(customer);
        tx.commit();
    }

    public void deleteCustomer(int id) {
        Transaction tx=session.beginTransaction();
        Customer customer=session.find(Customer.class,id);
        if(customer==null)
        {
            tx.commit();
            throw new ResourceNotFoundException("Invalid id given");
        }
        session.remove(customer);
        tx.commit();
    }

    public Customer getById(int id) {
        Transaction tx=session.beginTransaction();
        Customer customer=session.find(Customer.class,id);
        tx.commit();
        if(customer==null)
            throw new ResourceNotFoundException("Invalid id given");
        return customer;
    }

    public List<Customer> getAllCustomers() {
        Transaction tx=session.beginTransaction();
        //using hql
        List<Customer> customer=session.createQuery("from Customer",Customer.class)
                .list();
        tx.commit();
        return customer;

    }*/

    public Customer getByUsername(String username) {
        Transaction tx=session.beginTransaction();

        Customer customer=session.createQuery("from Customer where user.username = :username", Customer.class)
                                 .setParameter("username", username)
                                 .uniqueResult();
        tx.commit();
        if(customer!=null)
            return customer;
        else
            throw new CustomerNotFoundException("Customer Not Found");
    }

    public void addCustomer(Customer customer, String username) {
        Transaction tx=session.beginTransaction();
        User user = session.createQuery(
                        "from User where username = :username",
                        User.class)
                .setParameter("username", username)
                .uniqueResult();

        if(user == null)
            throw new ResourceNotFoundException("User not found");

        customer.setUser(user);

        session.persist(customer);
        tx.commit();

    }

    public void updateCustomer(String username, String email, String phone, String address) {
        Transaction tx = session.beginTransaction();

        Customer customer = session.createQuery(
                        "from Customer where user.username = :username",
                        Customer.class)
                .setParameter("username", username)
                .uniqueResult();

        if(customer == null)
            throw new ResourceNotFoundException("Customer not found");

        customer.setEmail(email);
        customer.setPhoneNumber(phone);
        customer.setAddress(address);

        session.merge(customer);

        tx.commit();
    }

    public void deleteCustomer(String username) {
        Transaction tx = session.beginTransaction();

        Customer customer = session.createQuery(
                        "from Customer where user.username = :username",
                        Customer.class)
                .setParameter("username", username)
                .uniqueResult();

        if(customer == null)
            throw new ResourceNotFoundException("Customer not found");

        session.remove(customer);

        tx.commit();
    }
}
