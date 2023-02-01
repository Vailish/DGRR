package com.ssafy.b102.Entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tb_game")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Game {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(nullable = false)
	private Boolean gameType;

	@Column(nullable = false)
	private LocalDate gameDate;
	
	@OneToMany(mappedBy = "game")
	private List<UserGame> userGames = new ArrayList<>();
}
