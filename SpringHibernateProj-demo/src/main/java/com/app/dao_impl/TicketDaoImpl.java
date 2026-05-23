package com.app.dao_impl;

import com.app.Exception.InvalidOwnershipException;
import com.app.Exception.ResourceNotFoundException;
import com.app.dao.TicketDao;
import com.app.enums.Status;
import com.app.model.Customer;
import com.app.model.Ticket;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Transactional
public class TicketDaoImpl implements TicketDao {

    @PersistenceContext
    private EntityManager em;

    private CustomerDaoImpl customerDao;
    @Autowired
    public void setCustomerDao(CustomerDaoImpl customerDao) {
        this.customerDao = customerDao;
    }

    @Override
    public List<Ticket> findAll(String customerUsername) {
        TypedQuery<Ticket> query= em.createQuery("select t from Ticket t where t.customer.user.username=:username", Ticket.class);
        query.setParameter("username",customerUsername);
        return query.getResultList();
    }

    @Override
    public void save(Ticket ticket, String customerUsername) {
        Customer customer= customerDao.getByUsername(customerUsername);
        ticket.setCustomer(customer);
        ticket.setStatus(Status.OPEN);
        em.persist(ticket);
    }

    @Override
    public Ticket getById(int id, String customerUsername) {
        Ticket ticket = em.find(Ticket.class, id);
        if(ticket == null)
            throw new ResourceNotFoundException("Invalid id given..");

        // ownership check
        if(!(ticket.getCustomer().getUser().getUsername().equals(customerUsername))){
            throw new InvalidOwnershipException("You do not own this ticket");
        }

        return ticket;
    }

    @Override
    public void update(Ticket ticket) {
        em.merge(ticket);

    }
}
