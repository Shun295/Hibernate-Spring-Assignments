package com.bms.controller;

import com.bms.dto.*;
import com.bms.model.Branch;
import com.bms.service.BranchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/branch")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BranchController {

    private BranchService branchService;

    //add branch-job of admin
    @PostMapping("/admin/addBranch")
    public Branch addBranch(@RequestBody BranchAdminReqDto branchAdminReqDto)
    {
       return branchService.addBranch(branchAdminReqDto);
    }

    @GetMapping("/all")
    public List<BranchResponseDto> getAllBranches()
    {
        return branchService.getAllBranches();
    }
    //get all branch-admin adn executive
    @GetMapping("/all/v2")
    public BranchResponsePageDto getAllBranches(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

        return branchService.getAllBranches(page,size);
    }

    //get branch by id-job of admin executive and customer
    @GetMapping("/{id}")
    public Branch getBranchById(@PathVariable int id) {
        return branchService.getBranchById(id);
    }

    //get branch by ifsc-everyone
    @GetMapping("/ifsc/{ifscCode}")
    public BranchResponseDto getBranchByIfsc(@PathVariable String ifscCode) {
        return branchService.getBranchByIfsc(ifscCode);
    }

    @GetMapping("/admin/dashboard")
    public BranchDashboardResDto getDashboard() {
        return branchService.getDashboard();
    }

    //GET THE BRANCH ASSIGNED TO THE LOGGED IN EXECUTIVE-EXECUTIVE
    @GetMapping("/my-branch")
    public BranchResponseDto getMyBranch(Principal principal)
    {
        return branchService.getMyBranch(principal);
    }

    //UPDATE BRANCH DETAILS-ADMIN
    @PutMapping("/admin/update/{branchId}")
    public void updateBranch(@PathVariable int branchId, @RequestBody BranchUpdateDto dto)
    {
        branchService.updateBranch(branchId,dto);
    }

    @DeleteMapping("/delete/{branchId}")
    public void deleteBranch(@PathVariable int branchId)
    {
        branchService.deleteBranch(branchId);
    }


    //ACTIVATE A BRANCH
    @PutMapping("/activate/{branchId}")
    public void activateBranch(@PathVariable int branchId) {
        branchService.activateBranch(branchId);
    }

    //DEACTIVE A BRANCH
    @PutMapping("deactivate/{branchId}")
    public void deactivateBranch(@PathVariable int branchId)
    {
        branchService.deactivateBranch(branchId);
    }

    @GetMapping("/all-list")
    public List<BranchDropdownResDto> getAllBranchesForDropdown() {
        return branchService.getAllBranchesForDropdown();
    }
    @GetMapping("/customer/my-branch")
    public BranchResponseDto getCustomerBranch(
            Principal principal
    )
    {
        return branchService
                .getCustomerBranch(principal);
    }


}

