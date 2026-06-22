package com.bms.service;

import com.bms.dto.AdminAnalyticsDto;
import com.bms.dto.CustomerGrowthDto;
import com.bms.enums.RequestStatus;
import com.bms.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AdminReportService {

    private CustomerRepository customerRepository;
    private AccountRepository accountRepository;
    private LoanRepository loanRepository;
    private BranchRepository branchRepository;
    private ExecutiveRepository executiveRepository;
    private AccountClosureRequestRepository accountClosureRequestRepository;
    public AdminAnalyticsDto getAnalytics() {

        long customers = customerRepository.count();
        long accounts = accountRepository.count();
        long loans = loanRepository.count();
        long branches = branchRepository.count();
        long executives = executiveRepository.count();
        long pendingClosures = accountClosureRequestRepository.countByReqStatus(RequestStatus.PENDING);

        return new AdminAnalyticsDto(
                List.of("Customers", "Accounts", "Loans", "Branches", "Executives", "Pending Closures"),
                List.of(customers, accounts, loans, branches, executives, pendingClosures
                )
        );
    }

    public CustomerGrowthDto getCustomerGrowth() {
        List<Object[]> result = customerRepository.getCustomerGrowth();

        List<String> months = new ArrayList<>();

        List<Long> counts = new ArrayList<>();

        String[] monthNames = {
                "",
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
        };

        for(Object[] row : result){
            Integer month = (Integer) row[0];
            Long count = (Long) row[1];
            months.add(monthNames[month]);
            counts.add(count);
        }
        return new CustomerGrowthDto(months, counts);

    }

}