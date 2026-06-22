package com.bms.controller;

import com.bms.dto.*;
import com.bms.enums.Designation;
import com.bms.service.ExecutiveService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/executive")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExecutiveController {

    private ExecutiveService executiveService;

    //Get all executive BY ADMIN
    @GetMapping("/admin/executive/getAll")
    public ExecutiveAdminListPageResponseDto getAllExecutive(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size)
    {
        return executiveService.getAllExecutive(page,size);
    }

    //GET all executive by branch BY ADMIN
    @GetMapping("branch/{branchId}")
    public List<ExecutiveAdminListResponseDto> getExecutivesByBranch(@PathVariable int branchId)
    {
        return executiveService.getExecutivesByBranch(branchId);
    }

    //GET all executives by designation BY ADMIN
    @GetMapping("/designation")
    public List<ExecutiveAdminListResponseDto> getExecutivesByDesignation(@RequestParam Designation designation)
    {
        return executiveService.getExecutivesByDesignation(designation);
    }



    // FOR DELETING THE EXECUTIVE BY ADMIN
    @DeleteMapping("/delete/{executiveId}")
    public void deleteExecutiveByAdmin(@PathVariable int executiveId)
    {
        executiveService.deleteExecutiveByAdmin(executiveId);
    }

    //Get executive by id by executive and admin
    @GetMapping("/get/{executiveId}")
    public ExecutiveResponseDto getExecutiveById(@PathVariable int executiveId)
    {
       return executiveService.getExecutiveById(executiveId);
    }

    //get executive by username by executive
    @GetMapping("/get/username")
    public ExecutiveResponseDto getExecutiveByUsername(@RequestParam String username)
    {
        return executiveService.getExecutiveByUsername(username);
    }


    @PutMapping("/exe/update/{executiveId}")
    public void updateExecutive(
            @PathVariable int executiveId,
            @Valid @RequestBody ExecutiveReqUpdateDto dto
    ) {
        executiveService.updateExecutive(executiveId, dto);
    }
//admin
    @PutMapping("/admin/executive/update/{executiveId}")
    public void updateExecutiveByAdmin(
            @PathVariable int executiveId,
            @Valid @RequestBody ExecutiveReqUpdateByAdminDto dto
    ) {
        executiveService.updateExecutiveByAdmin(executiveId, dto);
    }
//--admin
    @GetMapping("/admin/executive/search")
    public List<ExecutiveAdminListResponseDto> searchExecutive(
            @RequestParam String keyword
    ) {
        return executiveService.searchExecutive(keyword);
    }

    @GetMapping("/dashboard")
    public ExecutiveDashboardDto getDashboard(
            Principal principal
    ) {
        return executiveService.getDashboard(
                principal.getName()
        );
    }
    @GetMapping("/my-profile")
    public ExecutiveProfileDto getMyProfile(Principal principal
    ) {

        return executiveService.getMyProfile(principal);

    }

    @GetMapping("/search")
    public List<ExecutiveAdminListResponseDto> searchExecutive(
            @RequestParam(required = false)
            String keyword,

            @RequestParam(required = false)
            Designation designation,

            @RequestParam(required = false)
            Integer branchId
    ) {

        return executiveService.searchExecutive(
                keyword,
                designation,
                branchId
        );
    }
}
