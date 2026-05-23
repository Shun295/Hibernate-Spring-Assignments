package com.app.dao_impl;

import com.app.Exception.InvalidOwnershipException;
import com.app.Exception.ResourceNotFoundException;
import com.app.dao.CustomerDao;
import com.app.dao.LoanDao;
import com.app.enums.LoanStatus;
import com.app.enums.LoanType;
import com.app.model.Customer;
import com.app.model.Loan;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Transactional
public class LoanDaoImpl implements LoanDao {
    @PersistenceContext
    private EntityManager em;

    private CustomerDao customerDao;
    @Autowired
    public void setCustomerDao(CustomerDao customerDao) {
        this.customerDao = customerDao;
    }



    @Override
    public List<Loan> findAllLoan(String customerUsername) {
        TypedQuery<Loan> query=em.createQuery("select l from Loan l where l.customer.user.username=:username", Loan.class);
        query.setParameter("username",customerUsername);
        return query.getResultList();
    }

    @Override
    public void applyLoan(Loan loan, String customerUsername) {
        Customer customer=customerDao.getCustomerByUsername(customerUsername);
        loan.setCustomer(customer);
        loan.setStatus(LoanStatus.PENDING);
        loan.setExecutive(null);
        em.persist(loan);
    }

    @Override
    public Loan getById(int loanId, String customerUsername) {
        Loan loan = em.find(Loan.class, loanId);//finding the loanId
        if(loan == null)
            throw new ResourceNotFoundException("Loan not found");

        Customer customer=customerDao.getCustomerByUsername(customerUsername);
        if(loan.getCustomer().getId() != customer.getId())
            throw new InvalidOwnershipException("This loan does not belong to you");

        if(loan.getStatus() != LoanStatus.PENDING)
            throw new RuntimeException("Only pending loans can be updated");

        return loan;

    }

    @Override
    public void update(Loan loan) {

        em.merge(loan);
    }

    @Override
    public void deleteLoan(int loanId, String username) {
        Loan loan = em.find(Loan.class, loanId);

        if(loan == null)
            throw new ResourceNotFoundException("Loan not found");

        Customer customer = customerDao.getCustomerByUsername(username);

        if(loan.getCustomer().getId() != customer.getId())
            throw new InvalidOwnershipException("This loan does not belong to you");

        if(loan.getStatus() != LoanStatus.PENDING)
            throw new RuntimeException("Only pending loans can be deleted");

        em.remove(loan);
    }
}
