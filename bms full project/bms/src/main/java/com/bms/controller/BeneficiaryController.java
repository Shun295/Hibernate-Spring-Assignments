package com.bms.controller;

import com.bms.dto.BeneficiaryReqDto;
import com.bms.dto.BeneficiaryResDto;
import com.bms.service.BeneficiaryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/beneficiary")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;

    @PostMapping("/add")
    public BeneficiaryResDto addBeneficiary(Principal principal,@Valid @RequestBody BeneficiaryReqDto dto) {
        return beneficiaryService.addBeneficiary(principal, dto);
    }

    @GetMapping("/all")
    public List<BeneficiaryResDto> getAllBeneficiaries(Principal principal) {

        return beneficiaryService.getAllBeneficiaries(principal);
    }
    @PutMapping("/activate/{beneficiaryId}")
    public String activateBeneficiary(
            Principal principal,
            @PathVariable int beneficiaryId
    ) {

        return beneficiaryService
                .activateBeneficiary(
                        principal,
                        beneficiaryId
                );

    }

    @PutMapping("/deactivate/{beneficiaryId}")
    public String deactivateBeneficiary(Principal principal, @PathVariable int beneficiaryId) {

        return beneficiaryService.deactivateBeneficiary(principal, beneficiaryId);
    }
}
