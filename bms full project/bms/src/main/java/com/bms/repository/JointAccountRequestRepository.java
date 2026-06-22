package com.bms.repository;

import com.bms.enums.RequestStatus;
import com.bms.model.Customer;
import com.bms.model.JointAccountRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JointAccountRequestRepository extends JpaRepository<JointAccountRequest,Integer> {
    Page<JointAccountRequest> findByStatus(RequestStatus requestStatus, Pageable pageable);

    Long countByStatus(RequestStatus requestStatus);


    List<JointAccountRequest> findByRequestedBy(Customer requestedBy);
}
