package com.bms.service;

import com.bms.dto.BranchAdminReqDto;
import com.bms.exception.ResourceNotFoundException;
import com.bms.model.Branch;
import com.bms.repository.BranchRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.List;
import java.util.Optional;
@ExtendWith(MockitoExtension.class)
public class BranchServiceTest {

    @Mock
    private BranchRepository branchRepository;

    @InjectMocks
    private BranchService branchService;

    private Branch branch;

    @BeforeEach
    public void sampleDate()
    {
        branch=new Branch();
        branch.setId(1);
        branch.setIfscCode("HDFC0001234");
        branch.setBranchName("Chennai Main Branch");
        branch.setAddress("Chennai");
        branch.setEmail("chennai@bank.com");
        branch.setPhoneNumber("9876543210");
    }

    @Test
    void addBranch_mustSave()
    {
        when(branchRepository.save(any(Branch.class))).thenReturn(branch);

        BranchAdminReqDto dto=new BranchAdminReqDto
                ("HDFC0001234","Chennai Main Branch","Chennai","chennai@bank.com","9876543210");
        Branch branchCategory=branchService.addBranch(dto);
        assertThat(branchCategory.getBranchName()).isEqualTo(branch.getBranchName());
        assertThat(branchCategory.getEmail()).isEqualTo(branch.getEmail());
    }

    @Test
    void getById_branchExists(){
        when(branchRepository.findById(100)).thenReturn(Optional.of(branch));

        assertThat(branchService.getBranchById(100).getId()).isEqualTo(1);

        assertThat(branchService.getBranchById(100).getAddress()).isEqualTo("Chennai");

    }

    @Test
    void getById_branchDoesNotExist(){
        when(branchRepository.findById(100)).thenReturn(Optional.empty());

        assertThatThrownBy(()-> branchService.getBranchById(100))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Invalid Id");

    }

    @Test
    void deleteCategory_mustDeleteAndReturnNothing(){
        when(branchRepository.findById(100)).thenReturn(Optional.of(branch));

        // When thenReturn does not work in void method tests
        doNothing().when(branchRepository).deleteById(100);
        branchService.deleteBranch(100);


    }


}
