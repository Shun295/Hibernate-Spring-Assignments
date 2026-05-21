package com.service;

import com.enums.Status;
import com.exception.InvalidOwnershipException;
import com.exception.ResourceNotFoundException;
import com.model.Customer;
import com.model.Ticket;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class TicketService {

    private Session session;
    private final CustomerService customerService;

    public TicketService(Session session) {
        this.session = session;
        customerService=new CustomerService(session);
    }

    public void addTicket(Ticket ticket, String customerUserName) {
        Customer customer=customerService.getByUsername(customerUserName);
        System.out.println(customer);          // check this
        System.out.println(customer.getId());
        ticket.setCustomer(customer);
        ticket.setStatus(Status.OPEN);
        Transaction tx=session.beginTransaction();
        session.persist(ticket);
        tx.commit();

    }

    public void deleteById(int ticketId, String username) {
        // fetch ticket object based on ticketId , if not present throw exception
        Transaction tx = session.beginTransaction();
        Ticket ticket = session.find(Ticket.class, ticketId);
        tx.commit();

        if(ticket == null)
            throw new ResourceNotFoundException("Ticket Id invalid!!");

        // ownership check : check if logged-in customer is the owner of this ticket
        Customer customer = customerService.getByUsername(username);
        if(ticket.getCustomer().getId() != customer.getId())
            throw new InvalidOwnershipException("Customer does not own this ticket, Deletion aborted");

        // delete ticket
        tx = session.beginTransaction();
        session.remove(ticket);
        tx.commit();
    }
}
