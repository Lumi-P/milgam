package com.example.crowdm.entity.user;


import lombok.*;
import org.hibernate.annotations.DynamicUpdate;


import javax.persistence.*;
import javax.transaction.Transactional;
import java.sql.Timestamp;

/**
 * 1. MethodName: UserEntity
 * 2. ClassName : UserEntity
 * 3. Comment   : 유저 엔티티
 * 4. 작성자    : boyeong, k-ssan, byeongmin
 * 5. 작성일    : 2024. 07. 17
 **/

@Getter
@Entity
@Builder
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users", schema = "public")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_index")
    private Integer user_index;

    @Column(name = "id", nullable = false, length = 30)
    private String id;

    @Column(name = "pw", nullable = false, length = 30)
    private String pw;

    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "phone", nullable = false, length = 15)
    private String phone;

    @Column(name = "role_index", nullable = false)
    private int role_index;

    @Column(name = "org", length = 30)
    private String org;

    @Column(name = "org_phone", length = 15)
    private String org_phone;

    @Column(name = "event_index")
    private Integer event_index;

    @Column(name = "apply_date", nullable = false)
    private Timestamp apply_date;

    @Column(name = "account_lock", nullable = false)
    private Boolean account_lock;

    @Column(name = "last_login", nullable = false)
    private Timestamp last_login;

    @Column(name = "start_date", nullable = false)
    private Timestamp start_date;

    @Column(name = "end_date", nullable = false)
    private Timestamp end_date;

    @Column(name = "permission_yn")
    private Boolean permission_yn;

    @Column(name = "permission_date")
    private Timestamp permission_date;

    @Column(name = "admin_index")
    private Integer admin_index;

    @Column(name = "fail_cnt", nullable = false)
    private int fail_cnt;

    @Column(name = "pw_duedate")
    private Timestamp pw_duedate;

    @Column(name = "temppw", length = 30)
    private String temppw;

    @Transactional
    public void updatePermissionYn(Timestamp permission_date, Integer admin_index) {
        this.permission_yn = true;
        this.permission_date = permission_date;
        this.admin_index=admin_index;
        //this.admin_index=1; 나중에 세션값으로 바꿔야함

    }

    @Transactional
    public void updateUnlock(String temppw) {
        this.temppw = temppw;
        this.account_lock = false;
        this.fail_cnt = 0;
    }

    @Transactional
    public void updateDenyYn(Integer admin_index){
        this.permission_yn = false;
        this.admin_index=admin_index;
    }


    public boolean getPermissionyn() {
        return this.permission_yn;
    }

    @Transactional
    public void updateEvent(Integer event_index){
        this.event_index = event_index;
    }

}

