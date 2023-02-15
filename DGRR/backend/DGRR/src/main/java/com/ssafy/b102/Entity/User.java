package com.ssafy.b102.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tb_user")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(length = 16, nullable = false, unique = true) // 10글자 제한, not null, 중복금지
	private String username;
	
	@Column(length = 128, nullable = false)
	private String password;
	
	@Column(nullable = true) // not null
	private Integer age;
	
	@Column(length = 32, nullable = false)
	private String name;
	
	@Column(length = 64, nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false) // not null
	private LocalDateTime createDate;
	
	@Column(nullable = false)
	private String gender;
	
	@Column(length = 32, nullable = false, unique = true)
	private String nickname;
	
	@Column(nullable = true)
	private Integer points;
	
	@Column(nullable = false)
	private LocalDate birthday;
	
	@Column(nullable = true)
	private Integer pin;
	
	@Column(nullable = true)
	private LocalDateTime pinCreateTime;
	
	@Column(nullable = true)
	private Integer stateMessage;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<UserGame> userGames = new ArrayList<>(); 
	
	@OneToOne
	private Matching matching;
	
	@OneToOne
	private FileEntity user_img;
	
}
