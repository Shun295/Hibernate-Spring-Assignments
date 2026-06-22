package com.bms.repository;

import com.bms.dto.ExecutiveResponseDto;
import com.bms.enums.Designation;
import com.bms.model.Branch;
import com.bms.model.Executive;
import com.bms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface ExecutiveRepository extends JpaRepository<Executive,Integer> {



    Optional<Executive> findByUserUsername(String username);

    List<Executive> findByBranch(Branch branch);

    List<Executive> findByDesignation(Designation designation);

    Optional<Executive> findByUser(User user);


    @Query("""
       SELECT e
       FROM Executive e
       WHERE e.employeeId LIKE %:keyword%
          OR e.firstName LIKE %:keyword%
          OR e.lastName LIKE %:keyword%
       """)
    List<Executive> searchExecutive(
            @Param("keyword") String keyword
    );

    Optional<Executive> findByEmail(String email);

    @Query("""
SELECT e
FROM Executive e
WHERE
(:keyword IS NULL
 OR LOWER(e.employeeId)
 LIKE LOWER(CONCAT('%',:keyword,'%'))
 OR LOWER(e.firstName)
 LIKE LOWER(CONCAT('%',:keyword,'%'))
 OR LOWER(e.lastName)
 LIKE LOWER(CONCAT('%',:keyword,'%')))
AND
(:designation IS NULL
 OR e.designation = :designation)
AND
(:branchId IS NULL
 OR e.branch.id = :branchId)
""")
    List<Executive> searchExecutive(
            @Param("keyword") String keyword,
            @Param("designation") Designation designation,
            @Param("branchId") Integer branchId
    );
}
