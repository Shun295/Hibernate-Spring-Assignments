package com.bms.controller;

import com.bms.dto.*;
import com.bms.enums.EntryType;
import com.bms.enums.TransactionStatus;
import com.bms.enums.TransactionType;
import com.bms.service.TransactionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private TransactionService transactionService;

    @PostMapping("/deposit")
    public DepositResDto deposit(Principal principal, @Valid @RequestBody DepositReqDto dto) {
        return transactionService.deposit(principal,dto);
    }

    @PostMapping("/withdrawal")
    public WithdrawalResDto withdraw(Principal principal,@Valid @RequestBody WithdrawalReqDto dto)
    {
        return transactionService.withdraw(principal,dto);
    }

    @PostMapping("/transfer")
    public TransferResDto transfer(Principal principal,@Valid @RequestBody TransferReqDto dto) {

        return transactionService.transfer(principal, dto);
    }

    @GetMapping("/history/{accountId}")
    public TransactionResPageDto getTransactionHistory(
            Principal principal, @PathVariable int accountId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return transactionService.getTransactionHistory(principal, accountId, page, size);
    }

    @GetMapping("/details/id/{id}")
    public TransactionResDto getTransactionById(
            Principal principal,
            @PathVariable int id) {

        return transactionService
                .getTransactionById(
                        principal,
                        id);
    }
    @GetMapping("/details/{id}")
    public TransactionResDto getTransactionDetails(Principal principal,@PathVariable int id) {

        return transactionService.getTransactionDetails(principal, id);
    }

    @GetMapping("/mini-statement/{accountId}")
    public List<MiniStatementResDto> getMiniStatement(Principal principal, @PathVariable int accountId) {

        return transactionService.getMiniStatement(principal, accountId);
    }

    @GetMapping("/statement/{accountId}")
    public List<StatementResDto> getStatement(Principal principal,
            @PathVariable int accountId,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return transactionService.getStatement(principal, accountId, startDate, endDate);
    }

    @GetMapping("/summary/{accountId}")
    public TransactionSummaryResDto getTransactionSummary(Principal principal, @PathVariable int accountId) {

        return transactionService.getTransactionSummary(principal, accountId);
    }

    @GetMapping("/monitoring/{accountId}")
    public TransactionMonitoringDto getTransactionMonitoring(
            @PathVariable int accountId
    ) {

        return transactionService
                .getTransactionMonitoring(
                        accountId
                );

    }

    @GetMapping("/all")
    public TransactionMonitoringPageDto getAllTransactions(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size

    ) {

        return transactionService
                .getAllTransactions(
                        page,
                        size
                );

    }

    @GetMapping("/filter")
    public TransactionMonitoringPageDto searchTransactions(

            @RequestParam(required = false)
            LocalDate startDate,

            @RequestParam(required = false)
            LocalDate endDate,

            @RequestParam(required = false)
            TransactionType type,

            @RequestParam(required = false)
            TransactionStatus status,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size
    ) {

        return transactionService.searchTransactions(

                startDate,

                endDate,

                type,

                status,

                page,

                size
        );
    }

    @GetMapping("/customer/filter/{accountId}")
    public TransactionResPageDto filterCustomerTransactions(
            Principal principal,
            @PathVariable int accountId,
            @RequestParam(required = false) String referenceNumber,
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) TransactionStatus status,
            @RequestParam int page,
            @RequestParam int size
    ) {

        return transactionService.filterCustomerTransactions(principal,accountId, referenceNumber,type, status, page, size
        );
    }

}
