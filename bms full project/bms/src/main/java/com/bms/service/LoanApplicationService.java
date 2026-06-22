package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.AccountStatus;
import com.bms.enums.LoanApplicationStatus;
import com.bms.exception.*;
import com.bms.mapper.LoanApplicationMapper;
import com.bms.model.*;
import com.bms.repository.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.Principal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class LoanApplicationService {

    private final LoanApplicationRepository loanApplicationRepository;
    private final UserService userService;
    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final LoanTypeRepository loanTypeRepository;
    private final LoanApplicationMapper loanApplicationMapper;
    private  final LoanRepository loanRepository;
    private ExecutiveRepository executiveRepository;
    public void applyLoan(LoanApplicationReqDto dto, Principal principal) {

       String user= principal.getName();

        Customer customer = customerRepository.findByUserUsername(user).orElseThrow(() ->
                                new ResourceNotFoundException("Customer not found"));

        Account account = accountRepository.findById(dto.accountId())
                        .orElseThrow(() -> new ResourceNotFoundException("Account not found"));

        if(account.getAccountStatus() == AccountStatus.BLOCKED) {
            throw new NotActiveException(
                    "Blocked accounts cannot apply for loans"
            );
        }

        LoanTypeMaster loanType = loanTypeRepository.findById(dto.loanTypeId())
                        .orElseThrow(() -> new ResourceNotFoundException(
                                        "Loan Type not found"));

        //Returns 1 if principal amount > max loan amount
        //Returns 0 if both are equal
        //Returns -1 if principal amount < max loan amoun
        if(dto.principalAmount().compareTo(loanType.getMaxLoanAmount()) > 0) {
            throw new InvalidAmountException("Loan amount exceeds maximum limit");
        }

        if(dto.termInMonth() > loanType.getMaxTermMonths()) {
            throw new InvalidAmountException("Term exceeds maximum limit");
        }

        //1  -> Principal Amount > Annual Salary × 5
        //0  -> Principal Amount = Annual Salary × 5
        //-1 -> Principal Amount < Annual Salary × 5
        //567,892 × 5=2,839,460(PA=1,400,000) PA>AS SO PROCEED
        if(dto.principalAmount().compareTo(dto.annualSalary() .multiply(BigDecimal.valueOf(5))) > 0
        ) {

            throw new InvalidAmountException("Requested loan amount is too high compared to annual salary"
            );
        }
        // Calculate the total amount to be repaid
        // Total Repayable Amount = Principal Amount +
        // (Principal Amount × Interest Rate / 100)
        BigDecimal totalRepayableAmount = dto.principalAmount().add(dto.principalAmount()
                                .multiply(loanType.getInterestRate())
                                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP));

        //EMI Amount =
        //Total Repayable Amount / Loan Term (Months)
        BigDecimal emiAmount = totalRepayableAmount
                        .divide(BigDecimal.valueOf(dto.termInMonth()),
                                2, RoundingMode.HALF_UP);

        LoanApplication application = loanApplicationMapper.mapDtoToEntity(dto, customer, account, loanType, emiAmount, totalRepayableAmount);

        application.setAnnualSalary(dto.annualSalary());

        // Initially same as requested amount
        application.setEligibleAmount(dto.principalAmount());
        loanApplicationRepository.save(application);
    }


    public LoanApplicationResPageDto getMyApplications(int page, int size, Principal principal) {

        String username = principal.getName();
        Customer customer = customerRepository.findByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Pageable pageable = PageRequest.of(page, size);

        Page<LoanApplication> pages = loanApplicationRepository.findByCustomer(customer, pageable);

        List<LoanApplication> list = pages.getContent();

        List<LoanApplicationResDto> data =
                list.stream()
                        .map(loanApplicationMapper::mapEntityToDto)
                        .toList();

        return new LoanApplicationResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public LoanApplicationExeResPageDto getPendingApplications(
            int page,
            int size) {

        // Step 1: Pagination
        Pageable pageable = PageRequest.of(page, size);

        // Step 2: Repository
        Page<LoanApplication> pages = loanApplicationRepository.findByStatus(LoanApplicationStatus.PENDING, pageable);

        // Step 3: Get Content
        List<LoanApplication> list = pages.getContent();

        // Step 4: Convert Entity to DTO
        List<LoanApplicationExeResDto> data = list.stream()
                        .map(loanApplicationMapper::mapEntityToExeDto)
                        .toList();

        // Step 5: Return Page DTO
        return new LoanApplicationExeResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public void reviewApplication(int applicationId, LoanApplicationReviewDto dto,Principal principal) {

        LoanApplication application = loanApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                        "Loan Application not found"));

        String username = principal.getName();

        Executive executive = executiveRepository.findByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Executive not found"));

        if(application.getStatus() != LoanApplicationStatus.PENDING) {
            throw new IllegalStateException("Only pending applications can be reviewed");
        }

        application.setRemarks(dto.remarks());
        application.setReviewedAt(Instant.now());

        BigDecimal maxEligible =
                application.getAnnualSalary()
                        .multiply(BigDecimal.valueOf(5));

        if(dto.eligibleAmount().compareTo(maxEligible) > 0) {
            throw new InvalidAmountException(
                    "Eligible amount exceeds salary-based limit"
            );
        }
        if(dto.eligibleAmount().compareTo(
                application.getPrincipalAmount()) > 0) {

            throw new InvalidAmountException(
                    "Eligible amount cannot exceed requested amount"
            );
        }
        application.setEligibleAmount(dto.eligibleAmount());
        application.setReviewedBy(executive);
        application.setStatus(dto.status());

        loanApplicationRepository.save(application);
    }

    public LoanApplicationAdminResPageDto getReviewedApplications(int page, int size) {

        // Step 1: Pagination
        Pageable pageable = PageRequest.of(page, size);

        // Step 2: Repository
        Page<LoanApplication> pages = loanApplicationRepository
                        .findByStatus(LoanApplicationStatus.REVIEWED, pageable);

        // Step 3: Get Content
        List<LoanApplication> list = pages.getContent();

        // Step 4: Convert Entity to DTO
        List<LoanApplicationAdminResDto> data = list.stream()
                        .map(loanApplicationMapper::mapEntityToAdminDto)
                        .toList();

        // Step 5: Return Page DTO
        return new LoanApplicationAdminResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    @Transactional
    public void approveApplication(int applicationId) {

        LoanApplication application = loanApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new ResourceNotFoundException("Loan Application not found"));

        if(application.getStatus() != LoanApplicationStatus.REVIEWED) {

            throw new NotReviewedException("Only reviewed applications can be approved");
        }
        application.setStatus(LoanApplicationStatus.APPROVED);
        loanApplicationRepository.save(application);
        Loan loan = loanApplicationMapper.mapLoanEntity(application);
        loanRepository.save(loan);
    }

    public void rejectApplication(int applicationId, LoanApplicationRejectDto dto) {

        LoanApplication application = loanApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new ResourceNotFoundException("Loan Application not found"));

        if(application.getStatus() != LoanApplicationStatus.REVIEWED) {

            throw new NotReviewedException("Only reviewed applications can be rejected");
        }

        application.setStatus(LoanApplicationStatus.REJECTED);

        application.setRemarks(dto.remarks());

        loanApplicationRepository.save(application);

    }

    public LoanApplicationExeResDto getApplicationById(int applicationId) {

        LoanApplication application = loanApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        return loanApplicationMapper.mapEntityToExeDto(application);
    }
    public LoanApplicationAdminResDto getApplicationForAdmin(int applicationId) {

        LoanApplication application = loanApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        return loanApplicationMapper.mapEntityToAdminDto(application);
    }

    public void resubmitLoanApplication(int applicationId, LoanApplicationResubmitDto dto, Principal principal
    ) {
        String username = principal.getName();

        Customer customer = customerRepository.findByUserUsername(username)
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        LoanApplication application = loanApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new ResourceNotFoundException("Loan Application not found"));

        if(application.getCustomer().getId() != customer.getId()
        ){
            throw new AccessDeniedException("You cannot modify another customer's loan application"
            );
        }
        if(application.getStatus() != LoanApplicationStatus.CUSTOMER_ACTION_REQUIRED
        ){
            throw new InvalidAmountException("Only applications requiring customer action can be modified"
            );
        }

        application.setPrincipalAmount(dto.principalAmount());
        application.setTermInMonth(dto.termInMonth());
        application.setStatus(LoanApplicationStatus.PENDING);
        application.setRemarks(null);
        application.setReviewedAt(null);
        BigDecimal eligibleAmount = application.getAnnualSalary()
                        .multiply(BigDecimal.valueOf(2));
        application.setEligibleAmount(eligibleAmount);

        loanApplicationRepository.save(application);
    }

    public LoanApplicationCustomerDetailsDto getCustomerApplicationById(int applicationId, Principal principal
    ) {

        String username = principal.getName();
        Customer customer = customerRepository.findByUserUsername(username)
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        LoanApplication application = loanApplicationRepository.findById(applicationId)
                        .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        if(application.getCustomer().getId() != customer.getId()) {
            throw new AccessDeniedException("You can view only your applications");
        }
        return loanApplicationMapper
                .mapEntityToCustomerDetailsDto(application);
    }
}
