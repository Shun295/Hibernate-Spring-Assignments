package com.bms.service;

import com.bms.dto.LoanTypeReqDto;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.LoanTypeMapper;
import com.bms.model.LoanTypeMaster;
import com.bms.repository.LoanTypeRepository;
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
import java.math.BigDecimal;

@ExtendWith(MockitoExtension.class)
public class LoanTypeServiceTest {

    @Mock
    private LoanTypeRepository loanTypeRepository;

    @InjectMocks
    private LoanTypeService loanTypeService;

    private LoanTypeMaster loanTypeMaster;
    private LoanTypeMaster loanTypeMaster1;


    @BeforeEach
    public void sampleDate()
    {
        loanTypeMaster=new LoanTypeMaster();
        loanTypeMaster.setId(1);
        loanTypeMaster.setLoanType("home");

        loanTypeMaster1=new LoanTypeMaster();
        loanTypeMaster1.setId(2);
        loanTypeMaster1.setLoanType("gold");
        loanTypeMaster1.setInterestRate(new BigDecimal("8.5"));
        loanTypeMaster1.setMaxTermMonths(50);
        loanTypeMaster1.setMaxLoanAmount(new BigDecimal("500000"));

    }

    @Test
    void getById_loanTypeExists()
    {
        when(loanTypeRepository.findById(100)).thenReturn(Optional.of(loanTypeMaster));
        assertThat(loanTypeService.getById(100).getId()).isEqualTo(1) ;
        assertThat(loanTypeService.getById(100).getLoanType()).isEqualTo("home");
    }

    @Test
    void getById_loanTypeNotExists()
    {
        when(loanTypeRepository.findById(100)).thenReturn(Optional.empty());

        assertThatThrownBy(()->loanTypeService.getById(100))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Loan Type not found");
    }

    @Test
    void getAllLoans_ReturnSomething()
    {
        when(loanTypeRepository.findAll()).thenReturn(List.of(loanTypeMaster));
        List<LoanTypeMaster> actualCall=loanTypeService.getAll();

        assertThat(actualCall).hasSize(1);
        assertThat(actualCall.getFirst().getLoanType()).isEqualToIgnoringCase("home");
    }

    @Test
    void getAllLoans_NotReturnAnything()
    {
        when(loanTypeRepository.findAll()).thenReturn(List.of());

        List<LoanTypeMaster> actualCall=loanTypeService.getAll();
        assertThat(actualCall).hasSize(0);
        assertThat(actualCall).isEmpty();
    }

    @Test
    void addLoan_mustReturn()
    {
        when(loanTypeRepository.save(any(LoanTypeMaster.class))).thenReturn(loanTypeMaster1);
        LoanTypeReqDto dto=new LoanTypeReqDto("gold",new BigDecimal("8.5"),240,new BigDecimal("500000"));

        LoanTypeMaster actualLoan=loanTypeService.createLoanType(dto);
        assertThat(actualLoan.getLoanType()).isEqualTo(loanTypeMaster1.getLoanType());
        assertThat(actualLoan.getMaxTermMonths()).isEqualTo(loanTypeMaster1.getMaxTermMonths());

        verify(loanTypeRepository,times(1)).save(any(LoanTypeMaster.class));

    }

    @Test
    void deleteLoanType_mustDeleteAndReturnNothing()
    {
        when(loanTypeRepository.findById(100)).thenReturn(Optional.of(loanTypeMaster));

        doNothing().when(loanTypeRepository).deleteById(100);
        loanTypeService.delete(100);

    }


}
