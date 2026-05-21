package com.controller;

import com.config.HibernateConfig;
import com.enums.Priority;
import com.enums.Status;
import com.exception.InvalidOwnershipException;
import com.exception.ResourceNotFoundException;
import com.model.Ticket;
import com.model.User;
import com.service.AuthService;
import com.service.TicketService;
import org.hibernate.Session;

import java.util.List;
import java.util.Scanner;

public class MainClass {
    public static void main(String[] args) {
        Session session=HibernateConfig.getSessionFactory().openSession();
        Scanner sc=new Scanner(System.in);

        TicketService ticketService=new TicketService(session);
        AuthService authService=new AuthService(session);

        System.out.println("Enter the username:");
        String username=sc.next();
        System.out.println("Enter the password:");
        String password=sc.next();

           User user = authService.login(username, password);
           switch (user.getRole().toString()) {
               case "CUSTOMER":
                   System.out.println("Customer Menu");

                   while(true) {
                       System.out.println("1. Add Ticket");
                       System.out.println("2. Delete Ticket by id");
                       System.out.println("3. Fetch all Tickets");
                       System.out.println("4. Update Ticket");
                       System.out.println("0. Exit ");
                       int op = sc.nextInt();
                       if (op == 0)
                           break;
                       switch(op) {
                           case 1:
                               // Take input
                               Ticket ticket = new Ticket();
                               sc.nextLine();
                               System.out.println("Enter Subject: ");
                               ticket.setSubject(sc.nextLine());
                               System.out.println("Enter Details: ");
                               ticket.setDetails(sc.nextLine());
                               System.out.println("Enter Priority: ");
                               ticket.setPriority(Priority.valueOf(sc.next()));
                               // reach out to ticketService, pass these fields and customer username.
                               ticketService.addTicket(ticket, username);
                               System.out.println("Ticket added.. ");
                               break;
                           case 2:
                               System.out.println("Enter id to delete the ticket");
                               int ticketId = sc.nextInt();
                               try{
                                   ticketService.deleteById(ticketId, username);
                                   System.out.println("Ticket deleted!!");
                               }
                               catch(ResourceNotFoundException | InvalidOwnershipException e){
                                   System.out.println(e.getMessage());
                               }
                               break;
                       }

                   }
                   break;
               case "EXECUTIVE":
                   System.out.println("Executive Menu");
                   break;
               case "HR":
                   System.out.println("Enter the ticket id:");

                   System.out.println("Enter the executive id:");
                   break;
               default:
                   System.out.println("Invalid data");
                   break;
           }

        sc.close();
        session.close();

    }
}
