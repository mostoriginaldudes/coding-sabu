package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.config.FileUploadConfig;
import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonListResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.LessonRepository;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class LessonServiceImpl implements LessonService {

  private final LessonRepository lessonRepository;
  private final UserService userService;
  private final FileUploadConfig fileUploadConfig;

  @Override
  public LessonListResponseDto getAllLessons(int page) {
     return new LessonListResponseDto(
       addStudentCountAndTeacherName(
         lessonRepository.getAllLessons(page)
       )
     );
  }

  @Override
  @Transactional
  public LessonResponseDto createLesson(LessonRequestDto requestDto, int teacherId) {
    String thumbnailUrl = uploadLessonThumbnail(requestDto.getImageThumbnail());

    LessonDto lesson = LessonDto.builder()
        .teacherId(teacherId)
        .title(requestDto.getTitle())
        .description(requestDto.getDescription())
        .price(requestDto.getPrice())
        .createdAt(LocalDateTime.now())
        .terminatedAt(requestDto.getTerminatedAt())
        .thumbnailUrl(thumbnailUrl)
        .build();

    lessonRepository.createLesson(lesson);
    return getLesson(lesson.getId());
  }

  @Override
  public LessonResponseDto getLesson(int id) {
    LessonDto lesson = lessonRepository.getLessonById(id);

    if(lesson == null) {
      return null;
    }

    String teacherName = convertTeacherIdToNickname(lesson.getTeacherId());

    return LessonResponseDto.builder()
      .id(id)
      .teacherName(teacherName)
      .title(lesson.getTitle())
      .description(lesson.getDescription())
      .price(lesson.getPrice())
      .createdAt(lesson.getCreatedAt())
      .terminatedAt(lesson.getTerminatedAt())
      .thumbnailUrl(lesson.getThumbnailUrl())
      .build();
  }

  @Override
  public String uploadLessonThumbnail(MultipartFile lessonThumbnail) {
    String imageFileName = lessonThumbnail.getOriginalFilename();
    String imagePath = UUID.randomUUID() + imageFileName;
    String imageRealFilePath = fileUploadConfig.getThumbnailLocation() + imagePath;
    String imageUrl = fileUploadConfig.getThumbnailUrl() + imagePath;

    try {
      FileOutputStream fileOutputStream = new FileOutputStream(imageRealFilePath);
      InputStream inputStream = lessonThumbnail.getInputStream();

      int fileReadCount = 0;
      byte[] imageFileBuffer = new byte[1024];

      while((fileReadCount = inputStream.read(imageFileBuffer)) != -1) {
        fileOutputStream.write(imageFileBuffer, 0, fileReadCount);
      }

      fileOutputStream.close();
      inputStream.close();

      return imageUrl;

    } catch(Exception e) {
      throw new RuntimeException("파일 업로드 에러 발생");
    }
  }

  @Override
  @Transactional
  public LessonResponseDto registerLesson(int lessonId, int studentId) {
    try {
      lessonRepository.registerStudentToLesson(lessonId, studentId);
      return getLesson(lessonId);
    } catch (RuntimeException runtimeException) {
      runtimeException.printStackTrace();
      throw runtimeException;
    }
  }

  @Override
  public LessonListResponseDto getMyLessons(int userId) {
    return new LessonListResponseDto(
      addStudentCountAndTeacherName(
        lessonRepository.getMyLessonsByUserId(userId)
      )
    );
  }

  public List<LessonResponseDto> addStudentCountAndTeacherName(List<LessonDto> lessons) {
    List<LessonResponseDto> lessonList = new ArrayList<>();

    for (LessonDto lesson : lessons) {
      lessonList.add(
        LessonResponseDto.builder()
          .id(lesson.getId())
          .teacherName(convertTeacherIdToNickname(lesson.getTeacherId()))
          .title(lesson.getTitle())
          .description(lesson.getDescription())
          .price(lesson.getPrice())
          .createdAt(lesson.getCreatedAt())
          .terminatedAt(lesson.getTerminatedAt())
          .thumbnailUrl(lesson.getThumbnailUrl())
          .studentCount(getStudentCount(lesson.getId()))
          .build()
      );
    }
    return lessonList;
  }

  public String convertTeacherIdToNickname(int teacherId) {
    UserDto teacher = userService.getUserInfo(teacherId);
    return teacher.getNickname();
  }

  public int getStudentCount(int lessonId) {
    return lessonRepository.getStudentCount(lessonId);
  }

  @Override
  public List<UserDto> getStudentsInMyClass(int lessonId, int teacherId) {
    return lessonRepository.getStudentsInMyLessonByTeacherId(lessonId, teacherId);
  }
}
