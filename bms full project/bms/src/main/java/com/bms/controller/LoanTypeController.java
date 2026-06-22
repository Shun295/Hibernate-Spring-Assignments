package com.bms.controller;

import com.bms.dto.LoanTypeReqDto;
import com.bms.model.LoanTypeMaster;
import com.bms.service.LoanTypeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan-type")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoanTypeController {

    private LoanTypeService loanTypeService;

    @PostMapping("/create")
    public void createLoanType(@RequestBody LoanTypeReqDto dto) {
        loanTypeService.createLoanType(dto);
    }

    @GetMapping("/all")
    public List<LoanTypeMaster> getAll() {
        return loanTypeService.getAll();
    }

    @GetMapping("/{id}")
    public LoanTypeMaster getById(@PathVariable int id) {
        return loanTypeService.getById(id);
    }

    @PutMapping("/{id}/update")
    public void updateLoanType(@PathVariable int id, @RequestBody LoanTypeReqDto dto) {

        loanTypeService.updateLoanType(id,dto);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id)
    {
        loanTypeService.delete(id);
    }
}
