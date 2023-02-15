package com.ssafy.b102.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.b102.Entity.FileEntity;

public interface FileRepository extends JpaRepository<FileEntity, Long>{
	
	public FileEntity findByUserId(Long userID);
}
