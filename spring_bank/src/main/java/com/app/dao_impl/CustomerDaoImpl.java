package com.app.dao_impl;

import com.app.dao.CustomerDao;
import com.app.exception.CustomerNotFoundException;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Customer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomerDaoImpl implements CustomerDao {
    private final JdbcTemplate jdbcTemplate;

    public CustomerDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Customer> mapper() {
        return (rs, num) -> {
            return new Customer(
                    rs.getInt("id"),
                    rs.getString("first_name"),
                    rs.getString("last_name"),
                    rs.getString("email"),
                    rs.getString("phone_number"),
                    rs.getString("gender"),
                    rs.getDate("date_of_birth").toLocalDate(),
                    rs.getString("address"),
                    rs.getString("aadhar_number"),
                    rs.getString("pan_number"),
                    rs.getTimestamp("registration_date").toLocalDateTime()
            );
        };
    }
    @Override
    public void insertCustomer(Customer customer) {
        String sql = "insert into customer(first_name, last_name, email, phone_number, gender, date_of_birth, address, aadhar_number, pan_number, registration_date) values(?,?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql,
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                customer.getGender(),
                customer.getDateOfBirth(),
                customer.getAddress(),
                customer.getAadharNumber(),
                customer.getPanNumber(),
                customer.getRegistrationDate());
        System.out.println("Customer added");
    }

    @Override
    public List<Customer> getAllCustomer() {
        String sql="select * from Customer";
        return jdbcTemplate.query(sql,mapper());
    }

    @Override
    public Customer getCustomerById(int id) {
        String sql="select * from Customer where id=?";
        return jdbcTemplate.queryForObject(sql,mapper(), id);
    }



    @Override
    public void updateCustomerById(int id) {
        String sql = "update customer set first_name=?, last_name=?, email=?, phone_number=?, gender=?, date_of_birth=?, address=?, aadhar_number=?, pan_number=? where id=?";
        Customer customer = null;
        jdbcTemplate.update(sql,
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                customer.getGender(),
                customer.getDateOfBirth(),
                customer.getAddress(),
                customer.getAadharNumber(),
                customer.getPanNumber(),
                customer.getId());
        System.out.println("Customer Updated Successfully");

    }

    @Override
    public void deleteCustomerById(int id) throws CustomerNotFoundException {

        String sql="delete from Customer where id=?";
        int numRow= jdbcTemplate.update(sql,id);
        if(numRow==0)
            throw new CustomerNotFoundException("Invalid id");

        System.out.println("Customer deleted");
    }
}
