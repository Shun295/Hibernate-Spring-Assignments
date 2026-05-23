package com.app;

import com.app.Exception.InvalidOwnershipException;
import com.app.Exception.ResourceNotFoundException;
import com.app.config.AppConfig;
import com.app.dao.AuthDao;
import com.app.dao.CustomerDao;
import com.app.dao.LoanDao;
import com.app.dao_impl.AuthDaoImpl;
import com.app.dao_impl.CustomerDaoImpl;
import com.app.enums.LoanType;
import com.app.model.Customer;
import com.app.model.Loan;
import com.app.model.User;
import jakarta.persistence.NoResultException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {

        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        AuthDao authDao = context.getBean(AuthDaoImpl.class);
        CustomerDao customerDao = context.getBean(CustomerDao.class);
        LoanDao loanDao = context.getBean(LoanDao.class);

        Scanner sc = new Scanner(System.in);

        System.out.println("Enter the username:");
        String username = sc.next();

        System.out.println("Enter the password:");
        String password = sc.next();

        try {
            User user = authDao.login(username, password);

            switch (user.getRole()) {

                case CUSTOMER:
                    System.out.println("Welcome " + username);

                    while (true) {
                        System.out.println("------ CUSTOMER MENU ------");
                        System.out.println("1. Add Customer");
                        System.out.println("2. Apply Loan");
                        System.out.println("3. View My Loans");
                        System.out.println("4. Delete My Loan");
                        System.out.println("5. Update Loan Application");
                        System.out.println("0. Exit");

                        int op = sc.nextInt();

                        if (op == 0)
                            break;

                        switch (op) {
                            case 1:
                                sc.nextLine();

                                System.out.println("Enter First Name:");
                                String firstName = sc.nextLine();

                                System.out.println("Enter Last Name:");
                                String lastName = sc.nextLine();

                                System.out.println("Enter Email:");
                                String email = sc.next();

                                System.out.println("Enter Phone Number:");
                                String phoneNumber = sc.next();

                                sc.nextLine();

                                System.out.println("Enter Gender:");
                                String gender = sc.nextLine();

                                System.out.println("Enter Date of Birth (yyyy-mm-dd):");
                                LocalDate dob = LocalDate.parse(sc.next());

                                sc.nextLine();

                                System.out.println("Enter Address:");
                                String address = sc.nextLine();

                                System.out.println("Enter Aadhar Number:");
                                String aadhar = sc.next();

                                System.out.println("Enter PAN Number:");
                                String pan = sc.next();

                                Customer customer = new Customer(firstName, lastName, email, phoneNumber, gender, dob, address, aadhar, pan, Instant.now());
                                customerDao.save(customer, username);
                                System.out.println("Customer profile created successfully!");
                                break;

                            case 2:
                                try {
                                    Loan loan = new Loan();

                                    System.out.println("Enter Loan Type (HOME/PERSONAL/CAR):");
                                    String loanType = sc.next();

                                    System.out.println("Enter Loan Amount:");
                                    double amount = sc.nextDouble();

                                    System.out.println("Enter Tenure (loan repayment year in num:");
                                    int tenure = sc.nextInt();

                                    System.out.println("Enter Interest Rate:");
                                    double interestRate = sc.nextDouble();

                                    loan.setLoanType(LoanType.valueOf(loanType));
                                    loan.setAmount(BigDecimal.valueOf(amount));
                                    loan.setTenure(tenure);
                                    loan.setInterestRate(interestRate);

                                    loanDao.applyLoan(loan, username);

                                    System.out.println("Loan applied successfully!");
                                }
                                catch(Exception e) {
                                    System.out.println(e.getMessage());
                                }

                                break;

                            case 3:
                                System.out.println("---- MY LOANS ----");
                                loanDao.findAllLoan(username)
                                        .forEach(System.out::println);
                                break;


                            case 4:
                                System.out.println("Delete My Loan");
                                try {
                                    System.out.println("Enter Loan Id to delete:");
                                    int loanId = sc.nextInt();

                                    loanDao.deleteLoan(loanId, username);

                                    System.out.println("Loan deleted successfully!");
                                }
                                catch(ResourceNotFoundException |
                                      InvalidOwnershipException e)
                                {
                                    System.out.println(e.getMessage());
                                }
                                break;


                            case 5:
                                try {
                                    System.out.println("Enter Loan Id:");
                                    int loanId = sc.nextInt();

                                    Loan loan = loanDao.getById(loanId, username);

                                    System.out.println("Enter New Loan Type (HOME/PERSONAL/CAR):");
                                    String loanType = sc.next();

                                    System.out.println("Enter New Amount:");
                                    double amount = sc.nextDouble();

                                    System.out.println("Enter New Tenure:");
                                    int tenure = sc.nextInt();

                                    System.out.println("Enter New Interest Rate:");
                                    double interestRate = sc.nextDouble();

                                    loan.setLoanType(LoanType.valueOf(loanType));
                                    loan.setAmount(BigDecimal.valueOf(amount));
                                    loan.setTenure(tenure);
                                    loan.setInterestRate(interestRate);

                                    loanDao.update(loan);

                                    System.out.println("Loan updated successfully!");
                                }
                                catch(ResourceNotFoundException |
                                      InvalidOwnershipException e) {
                                    System.out.println(e.getMessage());
                                }
                                break;

                            default:
                                System.out.println("Invalid Option");
                        }
                    }
                    break;

                case EXECUTIVE:
                    System.out.println("Welcome " + username);

                    while (true) {
                        System.out.println("------ EXECUTIVE MENU ------");
                        System.out.println("1. View All Customers");
                        System.out.println("0. Exit");

                        int op = sc.nextInt();

                        if (op == 0)
                            break;

                        switch (op) {
                            case 1:
                                System.out.println("---- ALL CUSTOMERS ----");
                                customerDao.findAll(username)
                                        .forEach(System.out::println);
                                break;

                            default:
                                System.out.println("Invalid Option");
                        }
                    }
                    break;

                case ADMIN:
                    System.out.println("Welcome Admin " + username);

                    while (true) {
                        System.out.println("------ ADMIN MENU ------");
                        System.out.println("1. View All Customers");
                        System.out.println("0. Exit");

                        int op = sc.nextInt();

                        if (op == 0)
                            break;

                        switch (op) {
                            case 1:
                                customerDao.findAll(username)
                                        .forEach(System.out::println);
                                break;

                            default:
                                System.out.println("Invalid Option");
                        }
                    }
                    break;

                default:
                    System.out.println("Invalid Role");
            }

        } catch (NoResultException e) {
            System.out.println("Invalid Credentials");
        }

        context.close();
    }
}

