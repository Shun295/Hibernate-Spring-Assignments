package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.BranchStatus;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.BranchMapper;
import com.bms.model.*;
import com.bms.repository.BranchRepository;
import com.bms.repository.CustomerAccountRepository;
import com.bms.repository.CustomerRepository;
import com.bms.repository.ExecutiveRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BranchService {

    private BranchRepository branchRepository;
    private BranchMapper branchMapper;
    private UserService userService;
    private ExecutiveRepository executiveRepository;
    private CustomerRepository customerRepository;
    private final CustomerAccountRepository customerAccountRepository;

    public Branch addBranch(BranchAdminReqDto branchAdminReqDto) {

        Branch branch = BranchMapper.mapDtoToEntity(branchAdminReqDto);
        branch.setStatus(BranchStatus.ACTIVE);
        return branchRepository.save(branch);
    }

    public List<BranchResponseDto> getAllBranches()
    {
        return branchRepository.findAll()
                .stream()
                .map(branchMapper::mapEntityToDto)
                .toList();
    }
    public BranchResponsePageDto getAllBranches(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Branch> pages = branchRepository.findAll(pageable);

        //getContent
        List<Branch> list = pages.getContent();
        //mapper to dto
        List<BranchResponseDto> data = list.stream()
                .map(branchMapper::mapEntityToDto)
                .toList();
        //return
        return new BranchResponsePageDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    public Branch getBranchById(int id) {
        return branchRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Id"));
    }

    public BranchResponseDto getBranchByIfsc(String ifscCode) {

        Branch branch = branchRepository.findByIfscCode(ifscCode)
                .orElseThrow(() -> new RuntimeException("Invalid IFSC"));

        return branchMapper.mapEntityToDto(branch);
    }


    public BranchResponseDto getMyBranch(Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        Executive executive = executiveRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("executive not found"));
        return branchMapper.mapEntityToDto(executive.getBranch());
    }

    public void updateBranch(int branchId, BranchUpdateDto dto) {

        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        branch.setBranchName(dto.branchName());
        branch.setAddress(dto.address());
        branch.setEmail(dto.email());
        branch.setPhoneNumber(dto.phoneNumber());
        branchRepository.save(branch);
    }


    public void activateBranch(int branchId) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));
        if (branch.getStatus() == BranchStatus.ACTIVE) {
            throw new ResourceNotFoundException("Branch is already active");
        }
        branch.setStatus(BranchStatus.ACTIVE);
        branchRepository.save(branch);
    }

    public void deactivateBranch(int branchId) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("branch not found"));
        if (branch.getStatus() == BranchStatus.INACTIVE) {
            throw new ResourceNotFoundException("branch is already inactive");
        }
        branch.setStatus(BranchStatus.INACTIVE);
        branchRepository.save(branch);

    }

    public BranchDashboardResDto getDashboard() {
        long totalBranches = branchRepository.count();

        long activeBranches = branchRepository.countByStatus(BranchStatus.ACTIVE);

        long inactiveBranches = branchRepository.countByStatus(BranchStatus.INACTIVE);

        long totalExecutives = executiveRepository.count();

        long totalCustomers = customerRepository.count();

        return new BranchDashboardResDto(
                totalBranches,
                activeBranches,
                inactiveBranches,
                totalExecutives,
                totalCustomers
        );
    }

    public List<BranchDropdownResDto> getAllBranchesForDropdown() {
        return branchRepository.findAll()
                .stream()
                .map(branchMapper::mapEntityToDropdownDto)
                .toList();
    }


    public BranchResponseDto getCustomerBranch(Principal principal) {
        String username = principal.getName();
        Customer customer = customerRepository.findByUserUsername(username).orElseThrow(() -> new ResourceNotFoundException("customer not found exception"));
        List<CustomerAccount> customerAccounts = customerAccountRepository.findByCustomerAndPrimaryHolderTrue(customer);
        if (customerAccounts.isEmpty()) {
            throw new ResourceNotFoundException("Customer account not found"
            );
        }

        return branchMapper.mapEntityToDto(
                customerAccounts
                        .get(0)
                        .getAccount()
                        .getBranch()

        );
    }

    public void deleteBranch(int branchId) {
        getBranchById(branchId);
        branchRepository.deleteById(branchId);
    }
}

