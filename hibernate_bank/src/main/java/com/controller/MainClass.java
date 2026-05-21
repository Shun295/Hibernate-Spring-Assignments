package com.controller;

import com.config.HibernateConfig;
import com.exception.CustomerNotFoundException;
import com.exception.ResourceNotFoundException;
import com.model.Branch;
import com.model.Customer;
import com.model.Executive;
import com.model.User;
import com.service.AuthService;
import com.service.BranchService;
import com.service.CustomerService;
import com.service.ExecutiveService;
import org.hibernate.Session;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;


public class MainClass {
    public static void main(String[] args) {
        Session session=HibernateConfig.getSessionFactory().openSession();
        Scanner sc=new Scanner(System.in);

        CustomerService customerService=new CustomerService(session);
        BranchService branchService=new BranchService(session);
        ExecutiveService executiveService=new ExecutiveService(session);
        AuthService authService=new AuthService(session);

        System.out.println("Enter the username:");
        String username=sc.next();
        System.out.println("Enter the password:");
        String password=sc.next();

        User user=authService.login(username,password);
        switch(user.getRole().toString())
        {
            case "CUSTOMER":
                System.out.println("Customer Menu");
                while(true) {
                    System.out.println("1. Insert Data");
                    System.out.println("2. View Profile");
                    System.out.println("3. Update Profile");
                    System.out.println("4. Delete Profile");
                    System.out.println("5. View All Branch");
                    System.out.println("0. Exit ");
                    int op = sc.nextInt();
                    if (op == 0)
                        break;
                    switch (op) {
                        case 1:
                            Customer customer = new Customer();

                            System.out.println("Enter First Name:");
                            customer.setFirstName(sc.next());

                            System.out.println("Enter Last Name:");
                            customer.setLastName(sc.next());

                            System.out.println("Enter Email:");
                            customer.setEmail(sc.next());

                            System.out.println("Enter Phone Number:");
                            customer.setPhoneNumber(sc.next());

                            System.out.println("Enter Gender:");
                            customer.setGender(sc.next());

                            System.out.println("Enter Date of Birth (yyyy-mm-dd):");
                            customer.setDateOfBirth(LocalDate.parse(sc.next()));

                            sc.nextLine(); // buffer clear

                            System.out.println("Enter Address:");
                            customer.setAddress(sc.nextLine());

                            System.out.println("Enter Aadhar Number:");
                            customer.setAadharNumber(sc.next());

                            System.out.println("Enter PAN Number:");
                            customer.setPanNumber(sc.next());

                            customer.setCreatedAt(Instant.now());

                            customerService.addCustomer(customer, username);

                            System.out.println("Customer profile created successfully!");
                            break;
                        case 2:
                            try {
                                customer = customerService.getByUsername(username);
                                System.out.println(customer);
                            }
                            catch(CustomerNotFoundException e) {
                                System.out.println(e.getMessage());
                            }
                            break;
                        case 3:
                            try {
                                System.out.println("Enter new Email:");
                                String email = sc.next();

                                System.out.println("Enter new Phone Number:");
                                String phone = sc.next();

                                sc.nextLine();

                                System.out.println("Enter new Address:");
                                String address = sc.nextLine();

                                customerService.updateCustomer(username, email, phone, address);

                                System.out.println("Profile updated successfully");
                            }
                            catch(ResourceNotFoundException e) {
                                System.out.println(e.getMessage());
                            }
                            break;
                        case 4:
                            try {
                                customerService.deleteCustomer(username);
                                System.out.println("Profile deleted successfully!");
                            }
                            catch(ResourceNotFoundException e) {
                                System.out.println(e.getMessage());
                            }
                            break;
                        case 5:
                            List<Branch> branches = branchService.getAllBranches();

                            if(branches.isEmpty())
                                System.out.println("No branches found");
                            else
                                branches.forEach(System.out::println);
                            break;
                    }
                }
                        break;

            case "EXECUTIVE":
                System.out.println("Exective Menu");
                while(true) {
                    System.out.println("1. View Profile");
                    System.out.println("2. Update Profile");
                    System.out.println("3. Delete Profile");
                    System.out.println("4. View My Assigned Branch");
                    System.out.println("5. View All Branch");
                    System.out.println("0. Exit ");
                    int op = sc.nextInt();
                    if (op == 0)
                        break;
                    switch (op) {
                        case 1:
                            try {
                                Executive executive = executiveService.getByUsername(username);
                                System.out.println(executive);
                            }
                            catch(ResourceNotFoundException e) {
                                System.out.println(e.getMessage());
                            }
                            break;
                        case 2:
                            try {
                                System.out.println("Enter new Email:");
                                String email = sc.next();

                                System.out.println("Enter new Phone Number:");
                                String phoneNumber = sc.next();

                                sc.nextLine();

                                System.out.println("Enter new Address:");
                                String address = sc.nextLine();

                                executiveService.updateExecutive(username, email, phoneNumber, address);

                                System.out.println("Executive profile updated successfully!");
                            }
                            catch(ResourceNotFoundException e) {
                                System.out.println(e.getMessage());
                            }
                            break;
                        case 3:
                            try {
                                executiveService.deleteExecutive(username);
                                System.out.println("Executive profile deleted successfully!");
                            }
                            catch(ResourceNotFoundException e) {
                                System.out.println(e.getMessage());
                            }
                            break;
                        case 4:
                            try {
                                Branch branch = executiveService.getMyBranch(username);
                                System.out.println(branch);
                            }
                            catch(ResourceNotFoundException e) {
                                System.out.println(e.getMessage());
                            }
                            break;

                        case 5:
                            List<Branch> branches = branchService.getAllBranches();

                            if(branches.isEmpty())
                                System.out.println("No branches found");
                            else
                                branches.forEach(System.out::println);

                            break;
                    }
                }
                break;

            default:
                System.out.println("Invalid data");
                break;
        }


        sc.close();
        session.close();
    }
}
