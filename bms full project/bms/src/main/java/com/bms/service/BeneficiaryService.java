package com.bms.service;

import com.bms.dto.BeneficiaryReqDto;
import com.bms.dto.BeneficiaryResDto;
import com.bms.enums.AccountStatus;
import com.bms.enums.BeneficiaryStatus;
import com.bms.exception.ResourceNotFoundException;
import com.bms.mapper.BeneficiaryMapper;
import com.bms.model.Account;
import com.bms.model.Beneficiary;
import com.bms.model.Customer;
import com.bms.repository.AccountRepository;
import com.bms.repository.BeneficiaryRepository;
import com.bms.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class BeneficiaryService {

    private CustomerRepository customerRepository;
    private BeneficiaryRepository beneficiaryRepository;
    private BeneficiaryMapper beneficiaryMapper;
    private AccountRepository accountRepository;

    public BeneficiaryResDto addBeneficiary(Principal principal, BeneficiaryReqDto dto) {

        String user= principal.getName();
        //check if customer exists or not
        Customer customer=customerRepository.getByUserUsername(user)
                .orElseThrow(()->new ResourceNotFoundException("customer not found"));

        Account beneficiaryAccount = accountRepository.findByAccountNumber(dto.accountNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiary account not found"));

        if (beneficiaryAccount.getAccountStatus() != AccountStatus.ACTIVE) {
            throw new RuntimeException("Beneficiary account is not active");
        }

        boolean exists = beneficiaryRepository.existsByCustomerAndAccountNumber(customer, dto.accountNumber());

        if(exists)
        {
            throw new RuntimeException("Beneficiary already exists");
        }

        Beneficiary beneficiary=beneficiaryMapper.toEntity(dto);
        beneficiary.setCustomer(customer);
        beneficiary.setBeneficiaryStatus(BeneficiaryStatus.ACTIVE);
        Beneficiary savedBeneficiary=beneficiaryRepository.save(beneficiary);

        return beneficiaryMapper.toBeneficiaryResDto(savedBeneficiary);
    }

    public List<BeneficiaryResDto> getAllBeneficiaries(Principal principal) {
        String username = principal.getName();

        Customer customer = customerRepository.getByUserUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        List<Beneficiary> beneficiaries = beneficiaryRepository.findByCustomer(customer);

        return beneficiaries.stream()
                .map(beneficiaryMapper::toBeneficiaryResDto)
                .toList();
    }

    public String activateBeneficiary(Principal principal, int beneficiaryId
    ) {
        Beneficiary beneficiary = beneficiaryRepository.findById(beneficiaryId)
                        .orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found"));

        beneficiary.setBeneficiaryStatus(BeneficiaryStatus.ACTIVE);
        beneficiaryRepository.save(beneficiary);
        return "Beneficiary Activated Successfully";
    }

    public String deactivateBeneficiary(Principal principal, int beneficiaryId) {

        String username = principal.getName();
        Customer customer = customerRepository.getByUserUsername(username)
                        .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        Beneficiary beneficiary = beneficiaryRepository.findByIdAndCustomer(beneficiaryId, customer)
                        .orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found"));
        beneficiary.setBeneficiaryStatus(BeneficiaryStatus.BLOCKED);
        beneficiaryRepository.save(beneficiary);
        return "Beneficiary deactivated successfully";
    }
}
