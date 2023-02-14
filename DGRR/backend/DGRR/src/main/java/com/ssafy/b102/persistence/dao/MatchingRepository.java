package com.ssafy.b102.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.b102.Entity.Matching;

public interface MatchingRepository extends JpaRepository<Matching, String>{
	public Matching findByUserId(Long userId);
	public List<Matching> findAllByOrderByPoint();
	public List<Matching> findAllByIsMatchingOrderByPoint(Integer isMatching);
	public List<Matching> findAllByMatchingNumber(Integer matchingNumber);
	public Matching findByMatchingNumber(Integer matchingNumber);
	
}
