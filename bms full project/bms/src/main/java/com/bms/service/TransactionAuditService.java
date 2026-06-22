package com.bms.service;

import com.bms.mapper.TransactionMapper;
import com.bms.model.Account;
import com.bms.model.Beneficiary;
import com.bms.model.Transaction;
import com.bms.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TransactionAuditService {
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveFailedWithdrawalTransaction(Account account, BigDecimal amount, String reason) {

        Transaction transaction = transactionMapper.toFailedWithdrawalTransaction(account, amount, reason);
        transaction.setReferenceNumber(generateReferenceNumber());
        transactionRepository.save(transaction);
    }

    private String generateReferenceNumber() {

        return "TXN-"
                + LocalDate.now()
                //formatting the data as 20200618(2026-06-18)
                .format(DateTimeFormatter.BASIC_ISO_DATE)
                + "-"
                //genearate a unique random value
                + UUID.randomUUID()
                //convert uuid to string
                .toString()
                //take only first 8 characters
                .substring(0, 8)
                .toUpperCase();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveFailedTransferTransaction(Account senderAccount,
            Beneficiary beneficiary,
            BigDecimal amount,
            String reason) {

        Transaction transaction = transactionMapper.toFailedTransferTransaction(senderAccount, beneficiary, amount, reason);

        transaction.setReferenceNumber(generateReferenceNumber());

        transactionRepository.save(transaction);
    }
}
