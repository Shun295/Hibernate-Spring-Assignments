package com.app.dao_impl;

import com.app.dao.CustomerDao;
import com.app.model.Customer;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Component;

@Component
public class CustomerDaoImpl implements CustomerDao {
  @PersistenceContext
   private EntityManager em;

    @Override
    public Customer getByUsername(String customerUsername) {
        TypedQuery<Customer> query=em.createQuery("select c from Customer c where c.user.username=:username", Customer.class);
        query.setParameter("username",customerUsername);
        return query.getSingleResult();
    }
}
