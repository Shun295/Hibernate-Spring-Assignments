package com.service;

import com.model.Branch;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class BranchService {
    private final Session session;
    public BranchService(Session session) {
        this.session= session;
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
