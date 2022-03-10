package com.mostoriginaldudes.codingsabubackend.util.uploader;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class S3Uploader {

  private final AmazonS3Client amazonS3Client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  @Value("${file.upload.thumbnailUrl}")
  private String thumbnailUrl;

  @Value("${file.upload.profileUrl}")
  private String profileUrl;

  public String uploadFile(MultipartFile multipartFile, String type) throws IOException {
    if("profile".equals(type)) {
      return upload(multipartFile, profileUrl);
    } else {
      return upload(multipartFile, thumbnailUrl);
    }
  }

  private String upload(MultipartFile multipartFile, String dirName) throws IOException {
    File uploadFile = convert(multipartFile)
      .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환 실패"));

    return upload(uploadFile, dirName);
  }

  private String upload(File uploadFile, String dirName) {
    String fileName = dirName + "/" + uploadFile.getName();
    String uploadImageUrl = putS3(uploadFile, fileName);
    removeNewFile(uploadFile);
    return uploadImageUrl;
  }

  private String putS3(File uploadFile, String fileName) {
    amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
    return amazonS3Client.getUrl(bucket, fileName).toString();
  }

  private void removeNewFile(File targetFile) {
    if (targetFile.delete()) {
      System.out.println("파일이 삭제되었습니다.");
    } else {
      System.out.println("파일이 삭제되지 못했습니다.");
    }
  }

  private Optional<File> convert(MultipartFile file) throws IOException {
    File convertFile = new File(Objects.requireNonNull(file.getOriginalFilename()));

    if (convertFile.createNewFile()) {
      try (FileOutputStream fos = new FileOutputStream(convertFile)) {
        fos.write(file.getBytes());
      }
      return Optional.of(convertFile);
    }
    return Optional.empty();
  }
}