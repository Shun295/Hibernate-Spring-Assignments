package com.model;

import com.enums.Role;
import com.enums.UserStatus;


public class User {

    private int id;
    private String username;
    private String password;
    private Role role;
    private UserStatus userStatus;

    public User() {
    }

    public User(String username, String password, Role role, UserStatus userStatus) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.userStatus = userStatus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserStatus getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(UserStatus userStatus) {
        this.userStatus = userStatus;
    }
}