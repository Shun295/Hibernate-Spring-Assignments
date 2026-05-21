package com.service;

import com.model.Customer;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class CustomerService {
    private final Session session;

    public CustomerService(Session session) {
        this.session=session;
    }

    public Customer getByUsername(String customerUserName) {
        Transaction tx=session.beginTransaction();
        Customer customer=session.createQuery("select c from Customer c where c.user.username=:username", Customer.class)
                        .setParameter("username",customerUserName)
                                .uniqueResult();
        tx.commit();
        return customer;
    }
}
