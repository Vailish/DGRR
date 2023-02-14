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
import com.ssafy.b102.persistence.dao.FileRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@RequiredArgsConstructor
@Log4j2
public class FilesHandler {
    @Value("${file.dir}")
    private String fileDir;

//    @Value("${file.extension-regex}")    
//    private String regex; 
    private String regex = "\\.(?i)(jpg|png|bmp|gif)";

    private final FileRepository fileRepository;

    @Transactional
    public FileEntity saveFile(MultipartFile file) throws IOException {
        // 파일이 없으면 예외
        if (file.isEmpty()) throw new FileNotFoundException("파일이 없습니다");
        // 업로드 시 파일 이름
        String oriName = file.getOriginalFilename();
        // 저장시 사용할 파일 이름(UUID)
        String uuid = UUID.randomUUID().toString();
        // 확장자 추출
        String extension = oriName.substring(oriName.lastIndexOf("."));
//        log.info("extension: {}", extension);
//        log.info("regex: {}", regex);
//        log.info("result: {}", Pattern.matches(regex, extension));
        if (!Pattern.matches(regex, extension)) {
            throw new RuntimeException("지원하지 않는 파일 확장자 입니다.");
        }
        // 저장시 사용할 파일 이름에 확장자 붙이기
        String savedName = uuid + extension;
        // 중복을 피하고 관리를 편하게 하기위해서 /날짜/UUID.확장자 포맷으로 저장하기 위해서 현재 년월일 가져옴
        // DB에서 날짜처리를 안하는 이유는 23:59:59에 업로드시 1초라도 백엔드와 DB의 시간이 어긋나서 대참사가 나는것을 방지하기 위함임
        // 파일 경로에 날짜가 들어가기 때문에
        LocalDateTime now = LocalDateTime.now();
        String uploadDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        // 최상위경로/날짜/UUID.확장자
        String savedPath = fileDir + uploadDate + File.separator + savedName;

        // DB에 저장하기위해서 엔티티로 변환
        FileEntity fileEntity = FileEntity.builder()
                .originalName(oriName)
                .savedName(savedName)
                .savedPath(savedPath)
                .createdAt(now)
                .build();

        // 실제 파일 저장 파트

        // 폴더 없으면 만들기
        File saveFolder = new File(fileDir + uploadDate);
        if (!saveFolder.exists()) {
            saveFolder.mkdirs();
        }

        file.transferTo(new File(savedPath));

        // DB에 등록
        return fileRepository.save(fileEntity);
    }
}

