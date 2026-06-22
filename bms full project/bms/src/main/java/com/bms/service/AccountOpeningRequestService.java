package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.AccountStatus;
import com.bms.enums.OwnershipStatus;
import com.bms.enums.RequestStatus;
import com.bms.exception.DuplicateRequestException;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.AccountMapper;
import com.bms.mapper.AccountOpeningMapper;
import com.bms.mapper.CustomerAccountMapper;
import com.bms.model.*;
import com.bms.repository.*;
import com.bms.utility.FileUtility;
import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
public class AccountOpeningRequestService {

    private AccountOpeningRequestRepository accountOpeningRequestRepository;
    private UserService userService;
    private CustomerRepository customerRepository;
    private AccountTypeRepository accountTypeRepository;
    private AccountOpeningMapper accountOpeningMapper;
    private BranchRepository branchRepository;
    private CustomerAccountRepository customerAccountRepository;
    private AccountRepository accountRepository;
    private ExecutiveRepository executiveRepository;
    private UserRepository userRepository;
    private AccountMapper accountMapper;
    private CustomerAccountMapper customerAccountMapper;

    private static final String UPLOAD_LOC = "D:/hexaware/banking/FOLDERSS";

    public void applyAccountOpening(Principal principal, int accountTypeId, MultipartFile pan, MultipartFile aadhar, MultipartFile photo) throws IOException {
        String user = principal.getName();

        Customer customer = customerRepository.findByUserUsername(user)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found" ));

        AccountType accountType =accountTypeRepository.findById(accountTypeId)
                        .orElseThrow(() -> new ResourceNotFoundException( "Account Type not found" ));

// Check existing active account
        boolean accountExists = customerAccountRepository.existsByCustomerAndAccountType(customer,accountType );

        if (accountExists) {
            throw new DuplicateRequestException("Customer already has this account type");
        }

// Check existing pending request
        boolean requestExists = accountOpeningRequestRepository.existsByCustomerAndAccountTypeAndStatus(customer, accountType, RequestStatus.PENDING);

        if (requestExists) {
            throw new DuplicateRequestException("Pending request already exists for this account type");
        }
        FileUtility.validateFile(pan);
        FileUtility.validateFile(aadhar);
        FileUtility.validateFile(photo);

        Path uploadPath = Paths.get(UPLOAD_LOC);

        //mean checking if the path exists else will be creating in the directory
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String panName = pan.getOriginalFilename();
        //resolves -join the folder path and a file name safely
        Path panDestination = uploadPath.resolve(panName);
// 1arg-give me the date that is inside the uploaded pan file,2nd args-where the file should be stored,
// 3args-replace the already existed one with new
        Files.copy(pan.getInputStream(), panDestination, StandardCopyOption.REPLACE_EXISTING);

        String aadharName = aadhar.getOriginalFilename();

        Path aadharDestination = uploadPath.resolve(aadharName);

        Files.copy(aadhar.getInputStream(), aadharDestination, StandardCopyOption.REPLACE_EXISTING);

        String photoName = photo.getOriginalFilename();

        Path photoDestination = uploadPath.resolve(photoName);

        Files.copy(photo.getInputStream(), photoDestination, StandardCopyOption.REPLACE_EXISTING);

        AccountOpeningRequest request =  accountOpeningMapper.toEntity(customer,accountType,panName, aadharName, photoName);
        accountOpeningRequestRepository.save(request);
    }

    public List<CustomerAccountOpeningResDto> getMyRequests(Principal principal) {

        //checking the customer via the token
        String user= principal.getName();

        Customer customer = customerRepository.findByUserUsername(user)
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        List<AccountOpeningRequest> list = accountOpeningRequestRepository
                        .findByCustomer(customer);

        return list.stream()
                .map(accountOpeningMapper::mapCustomerDto)
                .toList();
    }

    public AccountOpeningResPageDto getPendingRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AccountOpeningRequest> pages =
                accountOpeningRequestRepository.findByStatus(RequestStatus.PENDING, pageable);

        List<AccountOpeningRequest> list = pages.getContent();
        // Convert Entity to DTO
        List<AccountOpeningExeResDto> data = list.stream()
                .map(accountOpeningMapper::mapEntityToDto)
                .toList();

        return new AccountOpeningResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public void reviewRequest(int requestId, AccountOpeningReviewDto dto, Principal principal) {
        AccountOpeningRequest request = accountOpeningRequestRepository.findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        if(request.getStatus() != RequestStatus.PENDING) {
            throw new IllegalStateException("Only pending requests can be reviewed");
        }

        Branch branch = branchRepository.findById(dto.branchId())
                        .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        //getting the logged in executive to know who logged in (verification)
        String username = principal.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(()->new ResourceNotFoundException("user not found"));

        request.setBranch(branch);
        request.setRemarks(dto.remarks());
        request.setReviewedBy(user);
        request.setReviewedAt(Instant.now());
        request.setStatus(RequestStatus.REVIEWED);
        accountOpeningRequestRepository.save(request);
    }

    public AccountOpeningAdminResPageDto getReviewedRequests(int page, int size) {

        // Step 1: Pagination
        Pageable pageable = PageRequest.of(page,size);
        // Step 2: Repository
        Page<AccountOpeningRequest> pages = accountOpeningRequestRepository.findByStatus(RequestStatus.REVIEWED, pageable);

        // Step 3: Get Content
        List<AccountOpeningRequest> list=pages.getContent();
        // Step 4: Convert Entity to DTO
        List<AccountOpeningAdminResDto> data=list.stream()
                .map(accountOpeningMapper::mapEntityToAdminDto).
                toList();

        // Step 5: Return Page DTO
        return new AccountOpeningAdminResPageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );

    }

    public void approveRequest(int requestId, Principal principal) {

        AccountOpeningRequest request =accountOpeningRequestRepository.findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        if(request.getStatus() != RequestStatus.REVIEWED) {
            throw new IllegalStateException("Only reviewed requests can be approved");
        }
        User admin = (User) userService.loadUserByUsername(principal.getName());
        Account account =  accountMapper.toAccount(request);
        account.setAccountNumber(generateAccountNumber());
        accountRepository.save(account);

        CustomerAccount customerAccount = customerAccountMapper.toCustomerAccount(request.getCustomer(), account);

        customerAccountRepository.save(customerAccount);
        request.setStatus(RequestStatus.APPROVED);
        request.setReviewedBy(admin);
        request.setReviewedAt(Instant.now());
        accountOpeningRequestRepository.save(request);
    }

    private String generateAccountNumber() {
        return String.valueOf(System.currentTimeMillis());
    }

    public void rejectRequest(int requestId, RejectRequestDto dto, Principal principal) {
        AccountOpeningRequest request = accountOpeningRequestRepository.findById(requestId)
                        .orElseThrow(() ->new ResourceNotFoundException("Request not found"));

        if(request.getStatus() != RequestStatus.REVIEWED) {
            throw new IllegalStateException("Only reviewed requests can be rejected");
        }

        User admin =(User) userService .loadUserByUsername(principal.getName());
        request.setStatus(RequestStatus.REJECTED);
        request.setRemarks( dto.remarks());
        request.setReviewedBy(admin);
        request.setReviewedAt(Instant.now());
        accountOpeningRequestRepository.save(request);
    }

    public AccountOpeningExeResDto getRequestById(int requestId) {

        AccountOpeningRequest request = accountOpeningRequestRepository.findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        return accountOpeningMapper.mapEntityToDto(request);
    }

    public AccountOpeningAdminResDto getRequestForAdmin(int requestId) {
        AccountOpeningRequest request =accountOpeningRequestRepository .findById(requestId)
                        .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        return accountOpeningMapper.mapEntityToAdminDto(request);
    }
}
