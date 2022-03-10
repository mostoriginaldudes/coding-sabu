package com.mostoriginaldudes.codingsabubackend.service.lesson;

import com.mostoriginaldudes.codingsabubackend.dto.LessonDto;
import com.mostoriginaldudes.codingsabubackend.dto.UserDto;
import com.mostoriginaldudes.codingsabubackend.dto.request.LessonRequestDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonListResponseDto;
import com.mostoriginaldudes.codingsabubackend.dto.response.LessonResponseDto;
import com.mostoriginaldudes.codingsabubackend.respository.LessonRepository;
import com.mostoriginaldudes.codingsabubackend.service.user.UserService;
import com.mostoriginaldudes.codingsabubackend.util.uploader.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class LessonServiceImpl implements LessonService {

  private final LessonRepository lessonRepository;
  private final UserService userService;
  private final S3Uploader s3Uploader;

  @Override
  public LessonListResponseDto getAllLessons() {
     return new LessonListResponseDto(
       addStudentCountAndTeacherName(
         lessonRepository.getAllLessons()
       )
     );
  }

  @Override
  @Transactional
  public LessonResponseDto createLesson(LessonRequestDto requestDto) {
    String thumbnailUrl = uploadLessonThumbnail(requestDto.getImageThumbnail());

    LessonDto lesson = LessonDto.builder()
        .teacherId(requestDto.getTeacherId())
        .title(requestDto.getTitle())
        .description(requestDto.getDescription())
        .price(requestDto.getPrice())
        .createdAt(LocalDateTime.now())
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
    int studentCount = getStudentCount(id);

    return LessonResponseDto.builder()
      .id(id)
      .teacherName(teacherName)
      .title(lesson.getTitle())
      .description(lesson.getDescription())
      .price(lesson.getPrice())
      .createdAt(lesson.getCreatedAt())
      .studentCount(studentCount)
      .thumbnailUrl(lesson.getThumbnailUrl())
      .build();
  }

  @Override
  public String uploadLessonThumbnail(MultipartFile lessonThumbnail) {
    try {
      return s3Uploader.uploadFile(lessonThumbnail, "thumbnail");
    } catch (IOException e) {
      e.printStackTrace();
      return e.getMessage();
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
        lessonRepository.getMyLessons(userId)
      )
    );
  }

  public List<LessonResponseDto> addStudentCountAndTeacherName(List<LessonDto> lessons) {
    List<LessonResponseDto> lessonList = new ArrayList<>();

    for (LessonDto lesson : lessons) {
      lessonList.add(
        LessonResponseDto.builder()
          .id(lesson.getId())
          .teacherId(lesson.getTeacherId())
          .teacherName(convertTeacherIdToNickname(lesson.getTeacherId()))
          .title(lesson.getTitle())
          .description(lesson.getDescription())
          .price(lesson.getPrice())
          .createdAt(lesson.getCreatedAt())
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

  @Override
  public LessonListResponseDto getTeachingLesson(int teacherId) {
    List<LessonDto> lessons = lessonRepository.getTeachingLessons(teacherId);
    return new LessonListResponseDto(addStudentCountAndTeacherName(lessons));
  }
}
