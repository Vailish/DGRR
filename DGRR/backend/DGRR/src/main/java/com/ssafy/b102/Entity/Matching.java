package com.ssafy.b102.Entity;


import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@DynamicInsert
@Entity
@Getter
@Setter
@Table(name = "tb_matching")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Matching {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(nullable = false)
	private LocalDateTime joinTime;
	
	@Column(nullable = true)
	private Integer matchingNumber;
	
	@Column(nullable = true)
	private Integer isMatching;
	
	@Column(nullable = true)
	private Integer point;
	
	@Column(nullable = true)
	private String gameData;
	
	@Column(nullable = true)
	private Boolean result;
	
	@Column(nullable = true)
	private Long recentGameId;
	
//	@JsonIgnore
	@JoinColumn(name="user_id")
	@OneToOne
	private User user;
	
}