package com.config;

import com.model.Branch;
import com.model.Customer;
import com.model.Executive;
import com.model.User;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {
    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        Configuration configuration=new Configuration();

        if(sessionFactory==null)
        {
            configuration.setProperty("hibernate.connection.url","jdbc:mysql://localhost:3306/bank_db?createDatabaseIfNotExist=true");
            configuration.setProperty("hibernate.connection.username","root");
            configuration.setProperty("hibernate.connection.password","Shun19004mathi@");
            configuration.setProperty("hibernate.connection.driver","com.mysql.cj.jdbc.Driver");

            configuration.setProperty("hibernate.dialect","org.hibernate.dialect.MySQLDialect");
            configuration.setProperty("hibernate.hbm2ddl.auto", "update");

            configuration.addAnnotatedClass(Customer.class);
            configuration.addAnnotatedClass(User.class);
            configuration.addAnnotatedClass(Executive.class);
            configuration.addAnnotatedClass(Branch.class);
            return configuration.buildSessionFactory();

        }
        return sessionFactory;
    }
    public void closeSession(){
        sessionFactory.close();
    }
}
