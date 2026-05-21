package com.service;

import com.exception.ResourceNotFoundException;
import com.model.Branch;
import com.model.Executive;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class ExecutiveService {
    private final Session session;
    public ExecutiveService(Session session) {
        this.session=session;
    }
    public Executive getByUsername(String username) {
        Transaction tx = session.beginTransaction();

        Executive executive = session.createQuery(
                        "from Executive where user.username = :username",
                        Executive.class)
                .setParameter("username", username)
                .uniqueResult();

        tx.commit();

        if(executive == null)
            throw new ResourceNotFoundException("Executive not found");

        return executive;
    }
    public void updateExecutive(String username, String email, String phoneNumber, String address) {
        Transaction tx = session.beginTransaction();

        Executive executive = session.createQuery(
                        "from Executive where user.username = :username",
                        Executive.class)
                .setParameter("username", username)
                .uniqueResult();

        if(executive == null)
            throw new ResourceNotFoundException("Executive not found");

        executive.setEmail(email);
        executive.setPhoneNumber(phoneNumber);
        executive.setAddress(address);

        session.merge(executive);

        tx.commit();
    }

    public void deleteExecutive(String username) {
        Transaction tx = session.beginTransaction();

        Executive executive = session.createQuery(
                        "from Executive where user.username = :username",
                        Executive.class)
                .setParameter("username", username)
                .uniqueResult();

        if(executive == null)
            throw new ResourceNotFoundException("Executive not found");

        session.remove(executive);

        tx.commit();
    }
    public Branch getMyBranch(String username) {
        Transaction tx = session.beginTransaction();

        Executive executive = session.createQuery(
                        "from Executive where user.username = :username",
                        Executive.class)
                .setParameter("username", username)
                .uniqueResult();

        if(executive == null)
            throw new ResourceNotFoundException("Executive not found");

        tx.commit();

        return executive.getBranch();
    }
    public List<Branch> getAllBranches() {
        Transaction tx = session.beginTransaction();

        List<Branch> branches = session.createQuery(
                "from Branch",
                Branch.class
        ).list();

        tx.commit();

        return branches;
    }
}
