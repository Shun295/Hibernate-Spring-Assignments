package com.config;
import com.model.Customer;
import com.model.Executive;
import com.model.Ticket;
import com.model.User;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {
    // This class will manage ur DB connection
    private static SessionFactory sessionFactory;//Fcatory class that creates session

    public static SessionFactory getSessionFactory() {
        /* check if factory is null
        if sessionFactory is null, then give it properties to make DB connection
        * */
        if(sessionFactory == null){
            // Map is used to save DB settings
            Configuration configuration = new Configuration();

            // DB credentials , URLs and dialect
            configuration.setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/supportflow?createDatabaseIfNotExist=true");
            configuration.setProperty("hibernate.connection.username", "root");
            configuration.setProperty("hibernate.connection.password", "Shun19004mathi@");
            configuration.setProperty("hibernate.connection.driver_class", "com.mysql.cj.jdbc.Driver");
            // set the dialect
            configuration.setProperty("hibernate.dialect","org.hibernate.dialect.MySQLDialect");

            // If u want to hibernate to generate the DB tables on the fly based on Model classes
            configuration.setProperty("hibernate.hbm2ddl.auto", "update");


            // Add model classes that we will create

            configuration.addAnnotatedClass(Ticket.class);
            configuration.addAnnotatedClass(Customer.class);
            configuration.addAnnotatedClass(Executive.class);
            configuration.addAnnotatedClass(User.class);

            return configuration.buildSessionFactory();
        }
        return sessionFactory;
    }

    public static void closeFactory(){

        sessionFactory.close();
    }
}
