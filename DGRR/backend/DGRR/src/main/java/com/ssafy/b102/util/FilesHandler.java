package com.ssafy.b102.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.util.regex.Pattern;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.b102.Entity.FileEntity;
import com.ssafy.b102.Entity.User;
import com.ssafy.b102.persistence.dao.FileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@RequiredArgsConstructor
public class FilesHandler {
    @Value("${file.dir}")
    private String fileDir;

    private String regex = "\\.(?i)(jpg|png|bmp|gif)";

    private final FileRepository fileRepository;

    @Transactional
    public FileEntity saveFile(MultipartFile file, User user) throws IOException {
    	
        if (file.isEmpty()) throw new FileNotFoundException("파일이 없습니다");
        String oriName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String extension = oriName.substring(oriName.lastIndexOf("."));
        
        if (!Pattern.matches(regex, extension)) {
            throw new RuntimeException("지원하지 않는 파일 확장자 입니다.");
        }
        String savedName = uuid + extension;
        LocalDateTime now = LocalDateTime.now();
        String uploadDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String savedPath = fileDir + uploadDate + File.separator + savedName;
        System.out.println("###########" + savedPath);
        FileEntity fileEntity = FileEntity.builder()
                .originalName(oriName)
                .savedName(savedName)
                .savedPath(savedPath)
                .createdAt(now)
                .user(user)
                .build();


        File saveFolder = new File(fileDir + uploadDate);
        if (!saveFolder.exists()) {
            saveFolder.mkdirs();
        }
        
        file.transferTo(new File(savedPath));

        return fileRepository.save(fileEntity);
    }
}

