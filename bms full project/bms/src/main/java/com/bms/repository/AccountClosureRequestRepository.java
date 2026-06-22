package com.bms.repository;

import com.bms.enums.RequestStatus;
import com.bms.model.AccountClosureRequest;
import com.bms.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface AccountClosureRequestRepository extends JpaRepository<AccountClosureRequest,Integer> {
    List<AccountClosureRequest> findByCustomer(Customer customer);
    Page<AccountClosureRequest> findByReqStatus(RequestStatus reqStatus, Pageable pageable);
    List<AccountClosureRequest> findByReqStatus(RequestStatus requestStatus);

    @Query("""
        select count(a)
        from AccountClosureRequest a
        where a.reqStatus = 'PENDING'
        """)
    Long getPendingClosures();

    long countByReqStatus(RequestStatus requestStatus);

    @Query("""
       SELECT a
       FROM AccountClosureRequest a
       WHERE a.account.accountNumber LIKE %:keyword%
       """)
    List<AccountClosureRequest> searchClosureRequest(@Param("keyword") String keyword);

    boolean existsByAccountIdAndReqStatus(int id, RequestStatus requestStatus);

    @Query("""
       SELECT r
       FROM AccountClosureRequest r
       WHERE r.account.accountType.type = :accountType
       """)
    List<AccountClosureRequest> filterByAccountType(
            @Param("accountType") String accountType
    );

    long countByCustomerIdAndReqStatus(int id, RequestStatus requestStatus);
}
