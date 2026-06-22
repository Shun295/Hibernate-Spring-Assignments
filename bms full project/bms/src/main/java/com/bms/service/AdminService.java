package com.bms.service;

import com.bms.dto.CombinedStatDto;
import com.bms.exception.ResourceNotFoundException;
import com.bms.model.Admin;
import com.bms.model.User;
import com.bms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final LoanRepository loanRepository;
    private final BranchRepository branchRepository;
    private final AccountClosureRequestRepository accountClosureRequestRepository;
    private final TransactionRepository transactionRepository;

    public CombinedStatDto getDashboardStats() {

        List<String> label = List.of(
                "Customers",
                "Accounts",
                "Loans",
                "Closures",
                "Transactions",
                "Branches"
        );

        List<Long> count = List.of(
                customerRepository.getTotalCustomers(),
                accountRepository.getTotalAccounts(),
                loanRepository.getTotalLoans(),
                accountClosureRequestRepository.getPendingClosures(),
                transactionRepository.getMonthlyTransactions(),
                branchRepository.getTotalBranches()
        );

        return new CombinedStatDto(label, count);

    }

}
