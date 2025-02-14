package com.example.crowdm.dto.user;

/**
 * 1. MethodName: profile
 * 2. ClassName : Profile
 * 3. Comment   : 내 페이지 프로필 dto
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 15
 **/

public class Profile {

    private Integer user_index;
    private String id;
    private String email;
    private String name;
    private String phone;
    private String org;
    private String event;


    // Getter methods
    public Integer getUser_index() {
        return user_index;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getOrg() {
        return org;
    }

    public String getEvent() {
        return event;
    }



    // Setter methods
    public void setUser_index(Integer user_index) {
        this.user_index = user_index;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setOrg(String org) {
        this.org=org;
    }

    public void setEvent(String event) {
        this.event = event;
    }


    }

