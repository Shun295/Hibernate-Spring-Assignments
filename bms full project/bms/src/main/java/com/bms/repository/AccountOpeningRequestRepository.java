package com.bms.repository;

import com.bms.enums.RequestStatus;
import com.bms.model.AccountOpeningRequest;
import com.bms.model.AccountType;
import com.bms.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountOpeningRequestRepository extends JpaRepository<AccountOpeningRequest,Integer> {
    boolean existsByCustomerAndStatus(Customer customer, RequestStatus requestStatus);

    Page<AccountOpeningRequest> findByStatus(RequestStatus requestStatus, Pageable pageable);

    List<AccountOpeningRequest> findByCustomer(Customer customer);

    Long countByStatus(RequestStatus requestStatus);

    boolean existsByCustomerAndAccountTypeAndStatus(
            Customer customer,
            AccountType accountType,
            RequestStatus status
    );
}
