package com.bms.service;

import com.bms.dto.*;
import com.bms.enums.Designation;
import com.bms.enums.LoanApplicationStatus;
import com.bms.enums.RequestStatus;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.ExecutiveMapper;
import com.bms.model.Branch;
import com.bms.model.Executive;
import com.bms.model.User;
import com.bms.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class ExecutiveService {

    private ExecutiveRepository executiveRepository;
    private ExecutiveMapper executiveMapper;
    private BranchRepository branchRepository;
    private final CustomerRepository customerRepository;
    private final AccountOpeningRequestRepository accountOpeningRequestRepository;
    private final JointAccountRequestRepository jointAccountRequestRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final AccountClosureRequestRepository accountClosureRequestRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    public Executive getByExeId(int executiveId)
    {
        return executiveRepository.findById(executiveId).orElseThrow(()->new ResourceNotFoundException("Executive is not found with this id"));
    }

    //Get all executive BY ADMIN
    public ExecutiveAdminListPageResponseDto getAllExecutive(int page, int size) {
        Pageable pageable= PageRequest.of(page,size);
        Page<Executive>pages=executiveRepository.findAll(pageable);
        List<Executive> list=pages.getContent();
        List<ExecutiveAdminListResponseDto> data=list.stream()
                .map(executiveMapper::mapEntityToDto)
                .toList();
        return new ExecutiveAdminListPageResponseDto(
                pages.getTotalElements(),
                pages.getTotalPages(),
                data
        );
    }

    //Get all executive by branch id BY ADMIN
    public List<ExecutiveAdminListResponseDto> getExecutivesByBranch(int branchId) {
        Branch branch=branchRepository.findById(branchId)
                .orElseThrow(()->new ResourceNotFoundException("branch Id is invalid"));
        List<Executive> executives=executiveRepository.findByBranch(branch);
        return executives
                .stream()
                .map(executiveMapper::mapEntityToDto)
                .toList();
    }

    //Get all executives by their designation BY ADMIN
    public List<ExecutiveAdminListResponseDto> getExecutivesByDesignation(Designation designation) {

        //here designation is enum so no need to check spring automatically throws error

        List<Executive> executives = executiveRepository.findByDesignation(designation);

        //to check for empty string
        if (executives.isEmpty()) {
            throw new ResourceNotFoundException("No executives found for designation: " + designation);
        }

        return executives.stream()
                .map(executiveMapper::mapEntityToDto)
                .toList();
    }



    // FOR DELETING THE EXECUTIVE BY ADMIN
    public void deleteExecutiveByAdmin(int executiveId) {
        Executive executive= executiveRepository.findById(executiveId).
                orElseThrow(()->new ResourceNotFoundException("executive id not found"));
        executiveRepository.deleteById(executiveId);
    }

    //FOR GETTING THE EXECUTIVE BY THEIR ID BY EXECUTIVE
    public ExecutiveResponseDto getExecutiveById(int executiveId) {
        Executive executive=executiveRepository.findById(executiveId)
                .orElseThrow(()->new ResourceNotFoundException("Executive not found"));
        return executiveMapper.entityToDto(executive);
    }

    public ExecutiveResponseDto getExecutiveByUsername(String username) {

        Executive executive = executiveRepository.findByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Executive is not present with this username"));
        return executiveMapper.entityToDto(executive);
    }
    public List<ExecutiveAdminListResponseDto> searchExecutive(String keyword
    ) {
        List<Executive> executives = executiveRepository.searchExecutive(keyword);
        return executives.stream()
                .map(executiveMapper::mapEntityToDto)
                .toList();
    }

    public void updateExecutive(int executiveId, ExecutiveReqUpdateDto dto
    ) {

        Executive executive = executiveRepository.findById(executiveId)
                .orElseThrow(() -> new ResourceNotFoundException("Executive id not found"));
        executiveMapper.updateExecutiveByExecutive(executive, dto
        );
        executiveRepository.save(executive);
    }


    public void updateExecutiveByAdmin(int executiveId, ExecutiveReqUpdateByAdminDto dto
    ) {

        Executive executive = executiveRepository.findById(executiveId)
                .orElseThrow(() -> new ResourceNotFoundException("Executive id not found"));

        Branch branch = branchRepository.findById(dto.branchId())
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        executiveMapper.updateExecutiveByAdmin(executive, dto, branch);
        executiveRepository.save(executive);
    }

    public ExecutiveDashboardDto getDashboard(String username) {
        User executive = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Executive not found"));

        return new ExecutiveDashboardDto(
                customerRepository.count(),
                accountOpeningRequestRepository.countByStatus(RequestStatus.PENDING),
                loanApplicationRepository.countByStatus(LoanApplicationStatus.PENDING),
                transactionRepository.countTodayTransactions(),
                accountClosureRequestRepository.countByReqStatus(RequestStatus.PENDING),
                jointAccountRequestRepository.countByStatus(RequestStatus.PENDING)
        );
    }
    public ExecutiveProfileDto getMyProfile(Principal principal
    ) {

        String username = principal.getName();
        User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Executive executive = executiveRepository.findByUser(user)
                        .orElseThrow(() -> new ResourceNotFoundException("Executive not found"));
        return executiveMapper.mapToExecutiveProfileDto(executive);

    }

    public List<ExecutiveAdminListResponseDto> searchExecutive(String keyword, Designation designation, Integer branchId) {

        List<Executive> executives = executiveRepository.searchExecutive(keyword, designation, branchId);

        return executives.stream()
                .map(executiveMapper::mapEntityToDto)
                .toList();
    }
}
