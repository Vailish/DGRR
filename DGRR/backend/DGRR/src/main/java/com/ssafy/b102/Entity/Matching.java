package com.ssafy.b102.Entity;


import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
	private long userId;
	
	@Column(nullable = false)
	private Integer point;
	
	@Column(nullable = false)
	private LocalDateTime joinTime;
}
