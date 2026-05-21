package com.app;

import com.app.config.AppConfig;
import com.app.dao.CustomerDao;
import com.app.dao_impl.CustomerDaoImpl;
import com.app.exception.CustomerNotFoundException;
import com.app.model.Customer;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.sql.DataSource;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context=new AnnotationConfigApplicationContext(AppConfig.class);
        Scanner sc=new Scanner(System.in);
        System.out.println(context.getBean(DataSource.class));
        CustomerDao customerDao = context.getBean(CustomerDaoImpl.class);
        while(true) {
            System.out.println("1. Add Customer");
            System.out.println("2. Delete Customer by Id");
            System.out.println("3. Update Customer");
            System.out.println("4. All Customer ");
            System.out.println("5. Get Customer by id");
            System.out.println("0. Exit");
            int op = sc.nextInt();
            if (op == 0)
                break;
            switch (op) {
                case 1:
                    System.out.println("Enter first name:");
                    String firstName = sc.next();

                    System.out.println("Enter last name:");
                    String lastName = sc.next();

                    System.out.println("Enter email:");
                    String email = sc.next();

                    System.out.println("Enter phone number:");
                    String phone = sc.next();

                    System.out.println("Enter gender:");
                    String gender = sc.next();

                    System.out.println("Enter date of birth (yyyy-mm-dd):");
                    LocalDate dob = LocalDate.parse(sc.next());

                    System.out.println("Enter address:");
                    sc.nextLine();
                    String address = sc.nextLine();

                    System.out.println("Enter aadhar number:");
                    String aadhar = sc.next();

                    System.out.println("Enter pan number:");
                    String pan = sc.next();

                    Customer customer = new Customer(
                            firstName,
                            lastName,
                            email,
                            phone,
                            gender,
                            dob,
                            address,
                            aadhar,
                            pan,
                            LocalDateTime.now()
                    );

                    customerDao.insertCustomer(customer);
                    System.out.println("Customer Inserted Successfully");
                    break;

                case 2:
                    System.out.println("Enter customer id to delete");
                    int id = sc.nextInt();
                    try {
                        customerDao.deleteCustomerById(id);
                    } catch (CustomerNotFoundException e) {
                        System.out.println(e.getMessage());
                    }
                    break;

                case 3:
                    System.out.println("Enter customer id to update");
                    id = sc.nextInt();
                    try {
                        customer = customerDao.getCustomerById(id);
                        System.out.println("Existing Customer Record:");
                        System.out.println(customer);

                        customerDao.updateCustomerById(id);

                    } catch (EmptyResultDataAccessException e) {
                        System.out.println("Invalid id");
                    }
                    break;

                case 4:
                    customerDao.getAllCustomer().forEach(System.out::println);
                    break;

                case 5:
                    System.out.println("Enter customer id to fetch");
                    id = sc.nextInt();
                    try {
                        customer = customerDao.getCustomerById(id);
                        System.out.println(customer);
                    } catch (EmptyResultDataAccessException e) {
                        System.out.println("Invalid id");
                    }
                    break;
            }
        }
        sc.close();
        context.close();
    }
}
