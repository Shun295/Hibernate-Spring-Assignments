package com.bms.repository;

import com.bms.enums.TransactionStatus;
import com.bms.enums.TransactionType;
import com.bms.model.Account;
import com.bms.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
    //List<Transaction> findByAccountOrderByTransactionDateDesc(Account account);

    @Query("""
        select t
        from Transaction t
        where t.account.id = :accountId
        order by t.transactionDate DESC
        """)
    Page<Transaction> getTransactionHistory(@Param("accountId") int accountId, Pageable pageable);

    @Query("""
       SELECT t
       FROM Transaction t
       WHERE t.account.id = :id
       ORDER BY t.transactionDate DESC
       """)
    Page<Transaction> getMiniStatement(
            @Param("id") int id,
            Pageable pageable
    );

    @Query("""
       SELECT t
       FROM Transaction t
       WHERE t.account.id = :accountId
       AND t.transactionDate BETWEEN :startDate AND :endDate
       ORDER BY t.transactionDate DESC
       """)
    List<Transaction> getStatement(
            @Param("accountId") int accountId,
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate
    );

    @Query("""
       SELECT COALESCE(SUM(t.amount),0)
       FROM Transaction t
       WHERE t.account.id = :accountId
       AND t.transactionType = com.bms.enums.TransactionType.DEPOSIT
       AND t.transactionStatus = com.bms.enums.TransactionStatus.SUCCESS
       """)
    BigDecimal getTotalDeposits(@Param("accountId") int accountId);

    @Query("""
       SELECT COALESCE(SUM(t.amount),0)
       FROM Transaction t
       WHERE t.account.id = :accountId
       AND t.transactionType = com.bms.enums.TransactionType.WITHDRAWAL
       AND t.transactionStatus = com.bms.enums.TransactionStatus.SUCCESS
       """)
    BigDecimal getTotalWithdrawals(@Param("accountId") int accountId);

    @Query("""
       SELECT COALESCE(SUM(t.amount),0)
       FROM Transaction t
       WHERE t.account.id = :accountId
       AND t.transactionType = com.bms.enums.TransactionType.TRANSFER
       AND t.entryType = com.bms.enums.EntryType.DEBIT
       AND t.transactionStatus = com.bms.enums.TransactionStatus.SUCCESS
       """)
    BigDecimal getTotalTransfers(@Param("accountId") int accountId);

    @Query("""
       SELECT COUNT(t)
       FROM Transaction t
       WHERE t.account.id = :accountId
       AND t.transactionStatus = com.bms.enums.TransactionStatus.FAILED
       """)
    long getFailedTransactionCount(@Param("accountId") int accountId);

    @Query("""
        select count(t)
        from Transaction t
        where month(t.transactionDate)=month(current_date)
        and year(t.transactionDate)=year(current_date)
        """)
    Long getMonthlyTransactions();

    List<Transaction> findByAccountId(int accountId);



        @Query("""
            SELECT COUNT(t)
            FROM Transaction t
            WHERE FUNCTION('DATE', t.transactionDate) = CURRENT_DATE
           """)
        Long countTodayTransactions();

        //selecting month no from date
    //adding all transacton on that month
    //coalesce -if sum is null ,return 0 instead
    //group transaction month wise
    //order by i sort by month
    @Query("""
       SELECT
       MONTH(t.transactionDate),
       COALESCE(SUM(t.amount),0)
       FROM Transaction t
       WHERE t.account.id IN :accountIds
       AND t.entryType =
       com.bms.enums.EntryType.DEBIT
       GROUP BY MONTH(t.transactionDate)
       ORDER BY MONTH(t.transactionDate)
       """)
    List<Object[]> getMonthlySpending(
            @Param("accountIds")
            List<Integer> accountIds
    );

    long countByAccountId(int id);

    @Query("""
    SELECT t
    FROM Transaction t
    WHERE (:startDate IS NULL OR t.transactionDate >= :startDate)
    AND (:endDate IS NULL OR t.transactionDate <= :endDate)
    AND (:type IS NULL OR t.transactionType = :type)
    AND (:status IS NULL OR t.transactionStatus = :status)
    """)
    Page<Transaction> searchTransactions(

            @Param("startDate")
            Instant startDate,

            @Param("endDate")
            Instant endDate,

            @Param("type")
            TransactionType type,

            @Param("status")
            TransactionStatus status,

            Pageable pageable
    );

    List<Transaction> findAllByReferenceNumber(String referenceNumber);


    @Query("""
    SELECT t
    FROM Transaction t
    WHERE t.account.id = :accountId
    AND (:referenceNumber IS NULL OR :referenceNumber = ''
         OR LOWER(t.referenceNumber)
         LIKE LOWER(CONCAT('%', :referenceNumber, '%')))
    AND (:type IS NULL OR t.transactionType = :type)
    AND (:status IS NULL OR t.transactionStatus = :status)
""")
    Page<Transaction> filterCustomerTransactions(
            int accountId,
            String referenceNumber,
            TransactionType type,
            TransactionStatus status,
            Pageable pageable
    );

}

