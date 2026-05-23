package com.app.dao_impl;

import com.app.dao.CustomerDao;
import com.app.model.Customer;
import com.app.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class CustomerDaoImpl implements CustomerDao {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Customer> findAll(String customerUsername) {
        TypedQuery<Customer> query=em.createQuery("select c from Customer c where c.user.username=:customerUsername", Customer.class);
        query.setParameter("username",customerUsername);
        return query.getResultList();
    }

    @Override
    public Customer getCustomerByUsername(String customerUsername) {
        TypedQuery<Customer> query=em.createQuery("Select c from Customer c where c.user.username=:username", Customer.class);
        query.setParameter("username",customerUsername);
        return query.getSingleResult();
    }

    @Override
    public void save(Customer customer, String username) {
        TypedQuery<User> query = em.createQuery("select u from User u where u.username = :username", User.class);
        query.setParameter("username", username);
        User user = query.getSingleResult();
        customer.setUser(user);
        em.persist(customer);
    }
}
