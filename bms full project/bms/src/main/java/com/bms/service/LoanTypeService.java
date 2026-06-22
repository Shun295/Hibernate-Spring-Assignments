package com.bms.service;

import com.bms.dto.LoanTypeReqDto;
import com.bms.exception.DuplicateRequestException;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.LoanTypeMapper;
import com.bms.model.LoanTypeMaster;
import com.bms.repository.LoanTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LoanTypeService {
    private LoanTypeRepository loanTypeRepository;

    private LoanTypeMapper loanTypeMapper;

    public LoanTypeMaster createLoanType(LoanTypeReqDto dto) {

        boolean exists = loanTypeRepository.existsByLoanType(dto.loanType());

        if(exists) {
            throw new DuplicateRequestException("Loan Type already exists");
        }
        LoanTypeMaster loanType = LoanTypeMapper.mapDtoToEntity(dto);
        return loanTypeRepository.save(loanType);
    }

    public List<LoanTypeMaster> getAll() {
        return loanTypeRepository.findAll();
    }

    public LoanTypeMaster getById(int id) {
        LoanTypeMaster loanType = loanTypeRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Loan Type not found"));

        return loanTypeRepository.findById(id).orElseThrow(()->
                new ResourceNotFoundException("Loan Type not found"));
    }

    public void updateLoanType(int id, LoanTypeReqDto dto) {

        LoanTypeMaster loanType = loanTypeRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Loan Type not found"));

        loanType.setLoanType(dto.loanType());
        loanType.setInterestRate(dto.interestRate());
        loanType.setMaxTermMonths(dto.maxTermMonths());
        loanType.setMaxLoanAmount(dto.maxLoanAmount());
        loanTypeRepository.save(loanType);
    }


    public void delete(int id) {
        getById(id);
        loanTypeRepository.deleteById(id);
    }
}